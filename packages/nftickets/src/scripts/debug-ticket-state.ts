import { db } from '@utils/database';
import { Contract, Wallet } from 'ethers';
import { PROVIDER } from '@modules/nft/utils/provider';
import { WALLET_PRIVATE_KEY } from '@env';
import { NFTicket721Artifact } from '@modules/nft/utils/constants';

async function debugTicketState() {
  console.log('🔍 Debugging Ticket State...\n');

  try {
    // 1. Check database tickets
    console.log('📁 Database Tickets:');
    const tickets = await db.ticket.findMany({
      include: {
        sector: {
          include: {
            event: true,
          },
        },
      },
      orderBy: {
        created_at: 'desc',
      },
      take: 10, // Last 10 tickets
    });

    if (tickets.length === 0) {
      console.log('No tickets found in database');
      return;
    }

    console.log(`Found ${tickets.length} tickets in database:\n`);

    for (const ticket of tickets) {
      console.log(`Ticket ${ticket.id}:`);
      console.log(`  - Token ID: ${ticket.contract_token_id}`);
      console.log(`  - Is Used: ${ticket.is_used}`);
      console.log(`  - Used By: ${ticket.used_by || 'N/A'}`);
      console.log(`  - Used At: ${ticket.used_at || 'N/A'}`);
      console.log(`  - Event: ${ticket.sector.event.name} (${ticket.sector.event.address})`);
      console.log(`  - Sector: ${ticket.sector.name} (Contract ID: ${ticket.sector.contract_sector_id})`);
      console.log('');

      // 2. Check blockchain state for each ticket
      if (ticket.contract_token_id && ticket.sector.event.address) {
        await checkBlockchainState(
          ticket.contract_token_id,
          ticket.sector.event.address,
          ticket.sector.event.contract_type || 'NFTicket721'
        );
      }
    }
  } catch (error) {
    console.error('Error debugging ticket state:', error);
  } finally {
    await db.$disconnect();
  }
}

async function checkBlockchainState(tokenId: string, contractAddress: string, contractType: string) {
  console.log(`🔗 Checking blockchain state for Token ${tokenId} on ${contractAddress}:`);

  try {
    const wallet = new Wallet(WALLET_PRIVATE_KEY as string, PROVIDER);

    // Get the contract artifact based on type
    let artifact;
    switch (contractType) {
      case 'NFTicket721':
        artifact = NFTicket721Artifact;
        break;
      default:
        console.log(`  ❌ Unsupported contract type: ${contractType}`);
        return;
    }

    const contract = new Contract(contractAddress, artifact.abi, wallet);

    // Check if token exists
    try {
      const owner = await contract.ownerOf(tokenId);
      console.log(`  ✅ Token exists, owned by: ${owner}`);

      // Check if token is used
      const isUsed = await contract.isTokenUsed(tokenId);
      console.log(`  🎫 Token used on blockchain: ${isUsed}`);

      // Check current token ID
      const currentId = await contract.getCurrentId();
      console.log(`  🔢 Contract current ID: ${currentId}`);
    } catch (error: any) {
      if (error.message.includes('invalid token ID') || error.message.includes('Token does not exist')) {
        console.log(`  ❌ Token ${tokenId} does not exist on blockchain`);

        // Check current token ID to see what tokens do exist
        try {
          const currentId = await contract.getCurrentId();
          console.log(`  🔢 Contract current ID: ${currentId}`);
          console.log(`  📊 This means tokens 0-${Number(currentId) - 1} should exist`);
        } catch (e: any) {
          console.log(`  ❌ Could not get current ID: ${e.message}`);
        }
      } else {
        console.log(`  ❌ Blockchain error: ${error.message}`);
      }
    }
  } catch (error: any) {
    console.log(`  ❌ Contract error: ${error.message}`);
  }

  console.log('');
}

async function resetUsedTickets() {
  console.log('🔄 Resetting tickets marked as used...\n');

  try {
    // Find tickets that are marked as used but don't exist on blockchain
    const usedTickets = await db.ticket.findMany({
      where: {
        is_used: true,
      },
      include: {
        sector: {
          include: {
            event: true,
          },
        },
      },
    });

    console.log(`Found ${usedTickets.length} tickets marked as used\n`);

    for (const ticket of usedTickets) {
      console.log(`Checking ticket ${ticket.id} (Token ${ticket.contract_token_id})...`);

      // Check if this token actually exists on blockchain
      const exists = await checkTokenExists(
        ticket.contract_token_id,
        ticket.sector.event.address,
        ticket.sector.event.contract_type || 'NFTicket721'
      );

      if (!exists) {
        console.log(`  🔄 Resetting ticket ${ticket.id} - token doesn't exist on blockchain`);

        await db.ticket.update({
          where: { id: ticket.id },
          data: {
            is_used: false,
            used_at: null,
            used_by: null,
          },
        });

        console.log(`  ✅ Reset complete`);
      } else {
        console.log(`  ✅ Token exists on blockchain, keeping as used`);
      }
      console.log('');
    }
  } catch (error) {
    console.error('Error resetting tickets:', error);
  }
}

async function checkTokenExists(tokenId: string, contractAddress: string, contractType: string): Promise<boolean> {
  try {
    const wallet = new Wallet(WALLET_PRIVATE_KEY as string, PROVIDER);

    let artifact;
    switch (contractType) {
      case 'NFTicket721':
        artifact = NFTicket721Artifact;
        break;
      default:
        return false;
    }

    const contract = new Contract(contractAddress, artifact.abi, wallet);

    // Try to get the owner - if it fails, token doesn't exist
    await contract.ownerOf(tokenId);
    return true;
  } catch (error: any) {
    if (error.message.includes('invalid token ID') || error.message.includes('Token does not exist')) {
      return false;
    }
    // For other errors, assume token exists to be safe
    return true;
  }
}

// Main execution
async function main() {
  const args = process.argv.slice(2);

  if (args.includes('--reset')) {
    await resetUsedTickets();
  } else {
    await debugTicketState();

    console.log("\n💡 If you found tickets that are marked as used but don't exist on blockchain,");
    console.log('   run this script with --reset flag to fix them:');
    console.log('   npm run debug-ticket-state -- --reset');
  }
}

main().catch(console.error);

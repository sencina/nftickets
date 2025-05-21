import { ethers } from 'ethers';

/**
 * Generate a signature for an API key request using a private key
 * This is for backend/testing use only - never expose this in production!
 */
async function generateSignature() {
  // Get command line arguments
  const args = process.argv.slice(2);

  if (args.length < 1) {
    console.error('Usage: ts-node src/scripts/generate-signature.ts <PRIVATE_KEY> [MESSAGE]');
    console.error('Example: ts-node src/scripts/generate-signature.ts 0x1234... "Generate API key for NFTickets"');
    process.exit(1);
  }

  const privateKey = args[0];
  const message = args[1] || 'Generate API key for NFTickets';

  try {
    // Create wallet from private key
    const wallet = new ethers.Wallet(privateKey);
    const walletAddress = wallet.address;

    // Sign the message
    const signature = await wallet.signMessage(message);

    console.log('\nSignature generated successfully!\n');
    console.log('Wallet Address:', walletAddress);
    console.log('Message:', message);
    console.log('Signature:', signature);

    // Output JSON format for easy copy-paste to API request
    console.log('\nAPI Request JSON:');
    console.log(
      JSON.stringify(
        {
          walletAddress,
          signature,
          message,
        },
        null,
        2
      )
    );

    // Verify the signature (sanity check)
    const recoveredAddress = ethers.verifyMessage(message, signature);
    console.log('\nSignature Verification:', recoveredAddress === walletAddress ? 'Valid ✓' : 'Invalid ✗');
  } catch (error) {
    console.error('Error generating signature:', error);
    process.exit(1);
  }
}

// Run the function if this file is executed directly
if (require.main === module) {
  generateSignature();
}

export { generateSignature };

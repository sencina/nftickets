import { Contract } from 'ethers';
import { MintData, MintResult, MintingStrategy } from './minting-strategy.interface';

export class NFTicket721Strategy implements MintingStrategy {
  async mint(contract: Contract, mintData: MintData): Promise<MintResult> {
    const tx = await contract.mint(mintData.walletAddress, mintData.sectorId, mintData.metadataURI);

    const receipt = await tx.wait();
    return { transactionHash: receipt.hash };
  }
}

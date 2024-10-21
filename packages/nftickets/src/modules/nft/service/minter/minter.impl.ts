import { Contract, Signer } from 'ethers';
import { Minter as IMinter } from './minter';
import { NotFoundException } from '@utils/errors';
import { BUCKET_URL } from '@modules/image/utils/constants';
import { NFTicket1155Artifact } from '@modules/nft/utils/constants';

export class Minter implements IMinter {
  private contract: Contract;
  private signer: Signer;

  constructor(address: string, signer: Signer) {
    this.signer = signer;
    this.contract = new Contract(address, NFTicket1155Artifact.abi, this.signer);
  }

  async mint(metadataHash: string) {
    const tx = await this.contract.deploy(BUCKET_URL(metadataHash));
    const receipt = await tx.wait();
    const event = receipt.logs
      .map((log: { topics: ReadonlyArray<string>; data: string }) => {
        return this.contract.interface.parseLog(log);
      })
      .find((parsedLog: { name: string }) => parsedLog && parsedLog.name === 'ContractDeployed');

    if (event) {
      const deployedAddress = event.args?.contractAddress;
      return deployedAddress;
    } else {
      throw new NotFoundException('Address not found');
    }
  }
}

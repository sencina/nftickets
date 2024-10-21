import { Signer, ContractFactory, InterfaceAbi } from 'ethers';
import { Deployer as IDeployer } from './deployer';

export class Deployer implements IDeployer {
  private signer: Signer;
  private abi: InterfaceAbi;
  private bytecode: string;

  constructor(signer: Signer, abi: InterfaceAbi, bytecode: string) {
    this.signer = signer;
    this.abi = abi;
    this.bytecode = bytecode;
  }

  async deploy(...args: any): Promise<string> {
    const factory = new ContractFactory(this.abi, this.bytecode, this.signer);
    const contract = await factory.deploy(...args);
    return await contract.getAddress();
  }
}

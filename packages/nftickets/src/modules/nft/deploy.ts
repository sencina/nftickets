import { InfuraProvider, Wallet, Contract } from 'ethers';
import { DEPLOYER_ADDRESS, INFURA_API_KEY, NETWORK_NAME, WALLET_PRIVATE_KEY } from '../../env';
import { deployerAbi } from './utils/abi';

export const deploy = async (metadataHash: string) => {
  const provider = new InfuraProvider(NETWORK_NAME, INFURA_API_KEY);
  const signer = new Wallet(WALLET_PRIVATE_KEY!, provider);

  const myContract = new Contract(DEPLOYER_ADDRESS!, deployerAbi, signer);

  const tx = await myContract.deploy(`ipfs://${metadataHash}`);

  const receipt = await tx.wait();

  const event = receipt.logs
    .map((log: { topics: ReadonlyArray<string>; data: string }) => {
      try {
        return myContract.interface.parseLog(log);
      } catch (e) {
        return null;
      }
    })
    .find((parsedLog: { name: string }) => parsedLog && parsedLog.name === 'ContractDeployed');

  if (event) {
    const deployedAddress = event.args?.contractAddress;
    console.log('Contract deployed to:', deployedAddress);
    return deployedAddress;
  } else {
    console.log('Contract deployment event not found');
    return null;
  }
};

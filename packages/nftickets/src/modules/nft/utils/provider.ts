import { INFURA_API_KEY, NETWORK_NAME } from '@env';
import { InfuraProvider, JsonRpcProvider } from 'ethers';

export const PROVIDER =
  NETWORK_NAME === 'localhost'
    ? new JsonRpcProvider('http://host.docker.internal:8545/')
    : new InfuraProvider(NETWORK_NAME, INFURA_API_KEY);

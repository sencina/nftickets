import { Deployer } from '@modules/nft/service/deployer/deployer.impl';

export interface DeploymentData {
  eventName: string;
  metadataHash: string;
  sectors: {
    name: string;
    capacity: number;
  }[];
  maxMintPerTransaction?: number;
}

export interface DeploymentResult {
  address: string;
}

export interface DeploymentStrategy {
  deploy(deployer: Deployer, data: DeploymentData): Promise<DeploymentResult>;
}

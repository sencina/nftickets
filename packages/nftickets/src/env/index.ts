import dotenv from 'dotenv';
dotenv.config();

export const PORT = process.env.PORT || 8080;
export const TATUM_API_KEY = process.env.TATUM_API_KEY;
export const INFURA_API_KEY = process.env.INFURA_API_KEY;
export const WALLET_PRIVATE_KEY = process.env.WALLET_PRIVATE_KEY;
export const DEPLOYER_ADDRESS = process.env.DEPLOYER_ADDRESS;
export const PROVIDER_URL = process.env.PROVIDER_URL;
export const NETWORK_NAME = process.env.NETWORK_NAME;

// Azure Key Vault
export const AZURE_KEY_VAULT_URL = process.env.AZURE_KEY_VAULT_URL || '';
export const AZURE_TENANT_ID = process.env.AZURE_TENANT_ID || '';
export const AZURE_CLIENT_ID = process.env.AZURE_CLIENT_ID || '';
export const AZURE_CLIENT_SECRET = process.env.AZURE_CLIENT_SECRET || '';

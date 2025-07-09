import path from 'path';

export const IMAGE_WIDTH = 512;
export const IMAGE_HEIGHT = 512;
export const LAYER_DIR = path.join(__dirname, '..', 'layers');
export const OUTPUT_DIR = path.join(__dirname, '..', 'output');

// Use ipfs:// protocol for MetaMask compatibility
export const BUCKET_URL = (hash: string) => `ipfs://${hash}`;

// Use multiple IPFS gateways for HTTP access with fallback options
export const IPFS_GATEWAY_URLS = [
  'https://ipfs.io/ipfs/',
  'https://gateway.pinata.cloud/ipfs/',
  'https://cloudflare-ipfs.com/ipfs/',
  'https://dweb.link/ipfs/',
  'https://ipfs.infura.io/ipfs/',
];

// Primary IPFS gateway
export const IPFS_GATEWAY_URL = IPFS_GATEWAY_URLS[0];

import path from 'path';

export const IMAGE_WIDTH = 512;
export const IMAGE_HEIGHT = 512;
export const LAYER_DIR = path.join(__dirname, '..', 'layers');
export const OUTPUT_DIR = path.join(__dirname, '..', 'output');

// Use ipfs:// protocol for MetaMask compatibility
export const BUCKET_URL = (hash: string) => `ipfs://${hash}`;

// Use Cloudflare IPFS gateway for HTTP access
export const IPFS_GATEWAY_URL = 'https://cloudflare-ipfs.com/ipfs/';

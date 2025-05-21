import { ethers } from 'ethers';

/**
 * Generate a signature using a private key
 * WARNING: This is for backend/testing use only
 *
 * @param privateKey The private key of the wallet
 * @param message The message to sign
 * @returns Object containing wallet address, signature, and message
 */
export async function generateSignature(privateKey: string, message: string = 'Generate API key for NFTickets') {
  // Create wallet from private key
  const wallet = new ethers.Wallet(privateKey);
  const walletAddress = wallet.address;

  // Sign the message
  const signature = await wallet.signMessage(message);

  return {
    walletAddress,
    signature,
    message,
  };
}

/**
 * Verify a signature matches a wallet address
 *
 * @param walletAddress The wallet address that supposedly signed the message
 * @param signature The signature to verify
 * @param message The message that was signed
 * @returns Boolean indicating if the signature is valid
 */
export function verifySignature(walletAddress: string, signature: string, message: string) {
  try {
    // Recover the address from the signature
    const recoveredAddress = ethers.verifyMessage(message, signature);

    // Compare addresses (case-insensitive)
    return recoveredAddress.toLowerCase() === walletAddress.toLowerCase();
  } catch (error) {
    console.error('Error verifying signature:', error);
    return false;
  }
}

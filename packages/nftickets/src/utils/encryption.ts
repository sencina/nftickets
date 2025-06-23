import crypto from 'crypto';

/**
 * Encryption key for QR codes - should be stored securely
 * In production, this should come from environment variables or a secure key management system
 */
const QR_ENCRYPTION_KEY = process.env.QR_ENCRYPTION_KEY || 'default-key-for-development-only-32-chars';

// Ensure the key is exactly 32 bytes for AES-256
const ENCRYPTION_KEY = crypto.createHash('sha256').update(QR_ENCRYPTION_KEY).digest();

/**
 * Encrypt QR code data using AES-256-CBC
 * @param data The data to encrypt (string or object)
 * @returns Base64 encoded encrypted data with IV
 */
export function encryptQRData(data: string | object): string {
  try {
    const text = typeof data === 'object' ? JSON.stringify(data) : data;

    // Generate a random IV (Initialization Vector)
    const iv = crypto.randomBytes(16);

    // Create cipher with explicit key and IV
    const cipher = crypto.createCipheriv('aes-256-cbc', ENCRYPTION_KEY, iv);

    // Encrypt the data
    let encrypted = cipher.update(text, 'utf8', 'hex');
    encrypted += cipher.final('hex');

    // Combine IV and encrypted data
    const result = {
      iv: iv.toString('hex'),
      encrypted: encrypted,
    };

    // Return base64 encoded result
    return Buffer.from(JSON.stringify(result)).toString('base64');
  } catch (error) {
    console.error('Error encrypting QR data:', error);
    throw new Error('Failed to encrypt QR data');
  }
}

/**
 * Decrypt QR code data using AES-256-CBC
 * @param encryptedData Base64 encoded encrypted data
 * @returns Decrypted data as object
 */
export function decryptQRData(encryptedData: string): any {
  try {
    // Decode base64
    const data = JSON.parse(Buffer.from(encryptedData, 'base64').toString('utf8'));

    const { iv, encrypted } = data;

    // Create decipher with explicit key and IV
    const decipher = crypto.createDecipheriv('aes-256-cbc', ENCRYPTION_KEY, Buffer.from(iv, 'hex'));

    // Decrypt the data
    let decrypted = decipher.update(encrypted, 'hex', 'utf8');
    decrypted += decipher.final('utf8');

    // Try to parse as JSON, if it fails return as string
    try {
      return JSON.parse(decrypted);
    } catch {
      return decrypted;
    }
  } catch (error) {
    console.error('Error decrypting QR data:', error);
    throw new Error('Failed to decrypt QR data - invalid or corrupted data');
  }
}

/**
 * Validate that encrypted QR data can be decrypted
 * @param encryptedData Base64 encoded encrypted data
 * @returns boolean indicating if data is valid
 */
export function validateEncryptedQRData(encryptedData: string): boolean {
  try {
    decryptQRData(encryptedData);
    return true;
  } catch {
    return false;
  }
}

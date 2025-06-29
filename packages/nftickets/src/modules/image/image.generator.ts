import canvas, { createCanvas, loadImage } from 'canvas';
import { IMAGE_HEIGHT, IMAGE_WIDTH, LAYER_DIR } from './utils/constants';
import path from 'path';
import qrcode from 'qrcode-generator';
import { encryptQRData } from '../../utils/encryption';

// Minimal data structure for QR code - using shortest possible property names
interface MinimalQRData {
  t: string; // tokenId
  c: string; // contractAddress
  e: string; // eventId
}

const generateQRCode = async (data: MinimalQRData): Promise<string> => {
  try {
    // Convert to most compact JSON string possible
    const qrData = JSON.stringify(data);

    // Encrypt the minimal data
    const encryptedData = encryptQRData(qrData);
    console.log('Minimal QR Data encrypted for ticket generation');

    // Create QR Code instance with highest error correction
    const qr = qrcode(0, 'H');
    qr.addData(encryptedData);
    qr.make();

    // Large cell size for better readability
    const cellSize = 20; // Increased for better scanning
    const margin = 8; // Good margin for contrast
    const qrCodeDataURL = qr.createDataURL(cellSize, margin);
    const qrImage = await loadImage(qrCodeDataURL);

    // Create a temporary canvas for the QR code with rounded corners and styling
    const qrCanvas = createCanvas(qrImage.width + 40, qrImage.height + 40); // Add padding for shadow
    const qrCtx = qrCanvas.getContext('2d');

    // Add a subtle shadow
    qrCtx.shadowColor = 'rgba(0, 0, 0, 0.2)';
    qrCtx.shadowBlur = 15;
    qrCtx.shadowOffsetX = 0;
    qrCtx.shadowOffsetY = 4;

    // Draw white background with rounded corners
    const radius = 20;
    qrCtx.beginPath();
    qrCtx.moveTo(20, radius);
    qrCtx.lineTo(20, qrCanvas.height - 20 - radius);
    qrCtx.arcTo(20, qrCanvas.height - 20, 20 + radius, qrCanvas.height - 20, radius);
    qrCtx.lineTo(qrCanvas.width - 20 - radius, qrCanvas.height - 20);
    qrCtx.arcTo(qrCanvas.width - 20, qrCanvas.height - 20, qrCanvas.width - 20, qrCanvas.height - 20 - radius, radius);
    qrCtx.lineTo(qrCanvas.width - 20, radius);
    qrCtx.arcTo(qrCanvas.width - 20, 20, qrCanvas.width - 20 - radius, 20, radius);
    qrCtx.lineTo(20 + radius, 20);
    qrCtx.arcTo(20, 20, 20, 20 + radius, radius);
    qrCtx.closePath();

    // Fill with pure white for maximum contrast
    qrCtx.fillStyle = '#FFFFFF';
    qrCtx.fill();

    // Reset shadow for QR code
    qrCtx.shadowColor = 'transparent';
    qrCtx.shadowBlur = 0;
    qrCtx.shadowOffsetX = 0;
    qrCtx.shadowOffsetY = 0;

    // Draw the QR code centered
    qrCtx.drawImage(qrImage, 20, 20);

    return qrCanvas.toDataURL();
  } catch (error) {
    console.error('Error generating QR code:', error);
    throw error;
  }
};

const addLayer = async (traitType: string, val: string, ctx: canvas.CanvasRenderingContext2D) => {
  const p = path.resolve(__dirname, `${LAYER_DIR}/${traitType}/${val}.png`);
  const img = await canvas.loadImage(p);
  return ctx.drawImage(img, 0, 0, IMAGE_WIDTH, IMAGE_HEIGHT);
};

export const generateImage = async (eventName: string, type: string, nftId: string, qrCodeData: MinimalQRData) => {
  const canvas = createCanvas(IMAGE_WIDTH, IMAGE_HEIGHT);
  const ctx = canvas.getContext('2d');

  // Create a beautiful gradient background
  const gradient = ctx.createLinearGradient(0, 0, IMAGE_WIDTH, IMAGE_HEIGHT);
  gradient.addColorStop(0, '#1a237e'); // Deep blue
  gradient.addColorStop(0.5, '#0d47a1'); // Rich blue
  gradient.addColorStop(1, '#01579b'); // Dark blue

  // Fill background with gradient
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, IMAGE_WIDTH, IMAGE_HEIGHT);

  // Add a subtle pattern overlay
  ctx.fillStyle = 'rgba(255, 255, 255, 0.03)';
  for (let i = 0; i < IMAGE_WIDTH; i += 20) {
    for (let j = 0; j < IMAGE_HEIGHT; j += 20) {
      ctx.fillRect(i, j, 10, 10);
    }
  }

  // Generate QR code
  const qrCodeDataURL = await generateQRCode(qrCodeData);
  const qr = await loadImage(qrCodeDataURL);

  // Calculate positions for centered QR code
  const qrWidth = 380; // Slightly smaller for better proportions
  const qrHeight = qrWidth;
  const qrX = (IMAGE_WIDTH - qrWidth) / 2;
  const qrY = 80; // Position from top

  // Draw QR code
  ctx.drawImage(qr, qrX, qrY, qrWidth, qrHeight);

  // Add a subtle glow effect around the QR code
  const glowGradient = ctx.createRadialGradient(
    IMAGE_WIDTH / 2,
    qrY + qrHeight / 2,
    qrWidth / 2,
    IMAGE_WIDTH / 2,
    qrY + qrHeight / 2,
    qrWidth
  );
  glowGradient.addColorStop(0, 'rgba(255, 255, 255, 0.1)');
  glowGradient.addColorStop(1, 'rgba(255, 255, 255, 0)');
  ctx.fillStyle = glowGradient;
  ctx.fillRect(0, 0, IMAGE_WIDTH, IMAGE_HEIGHT);

  // Draw event name with shadow
  ctx.shadowColor = 'rgba(0, 0, 0, 0.4)';
  ctx.shadowBlur = 10;
  ctx.shadowOffsetX = 0;
  ctx.shadowOffsetY = 4;
  ctx.font = 'bold 48px Arial';
  ctx.textAlign = 'center';
  ctx.fillStyle = '#FFFFFF';
  ctx.fillText(eventName.toUpperCase(), IMAGE_WIDTH / 2, 50);

  // Reset shadow for other text
  ctx.shadowBlur = 0;
  ctx.shadowOffsetX = 0;
  ctx.shadowOffsetY = 0;

  // Draw badge with sector type
  const badgeWidth = 200;
  const badgeHeight = 40;
  const badgeX = (IMAGE_WIDTH - badgeWidth) / 2;
  const badgeY = qrY + qrHeight + 20;

  // Draw badge background with gradient
  const badgeGradient = ctx.createLinearGradient(badgeX, badgeY, badgeX + badgeWidth, badgeY);
  badgeGradient.addColorStop(0, '#3B82F6'); // Blue
  badgeGradient.addColorStop(1, '#1D4ED8'); // Darker blue

  // Draw rounded rectangle for badge
  ctx.beginPath();
  ctx.moveTo(badgeX + 10, badgeY);
  ctx.lineTo(badgeX + badgeWidth - 10, badgeY);
  ctx.quadraticCurveTo(badgeX + badgeWidth, badgeY, badgeX + badgeWidth, badgeY + 10);
  ctx.lineTo(badgeX + badgeWidth, badgeY + badgeHeight - 10);
  ctx.quadraticCurveTo(badgeX + badgeWidth, badgeY + badgeHeight, badgeX + badgeWidth - 10, badgeY + badgeHeight);
  ctx.lineTo(badgeX + 10, badgeY + badgeHeight);
  ctx.quadraticCurveTo(badgeX, badgeY + badgeHeight, badgeX, badgeY + badgeHeight - 10);
  ctx.lineTo(badgeX, badgeY + 10);
  ctx.quadraticCurveTo(badgeX, badgeY, badgeX + 10, badgeY);
  ctx.closePath();

  // Add shadow to badge
  ctx.shadowColor = 'rgba(0, 0, 0, 0.2)';
  ctx.shadowBlur = 8;
  ctx.shadowOffsetX = 0;
  ctx.shadowOffsetY = 4;

  // Fill badge
  ctx.fillStyle = badgeGradient;
  ctx.fill();

  // Reset shadow
  ctx.shadowColor = 'transparent';
  ctx.shadowBlur = 0;

  // Draw sector type text
  ctx.font = 'bold 24px Arial';
  ctx.fillStyle = '#FFFFFF';
  ctx.textAlign = 'center';
  ctx.fillText(type.toUpperCase(), IMAGE_WIDTH / 2, badgeY + 28);

  // Draw NFT ID with subtle styling
  ctx.font = '20px Arial';
  ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
  ctx.fillText(`#${nftId}`, IMAGE_WIDTH / 2, badgeY + badgeHeight + 30);

  return canvas.toDataURL();
};

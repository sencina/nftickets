import canvas, { createCanvas, loadImage } from 'canvas';
import { IMAGE_HEIGHT, IMAGE_WIDTH, LAYER_DIR } from './utils/constants';
import path from 'path';
import { toDataURL } from 'qrcode';
import { encryptQRData } from '../../utils/encryption';

const generateQRCode = async (data: string | object): Promise<string> => {
  try {
    // Encrypt the QR data before encoding
    const encryptedData = encryptQRData(data);

    console.log('QR Data encrypted for ticket generation');

    const qrCode = await toDataURL(encryptedData, {
      errorCorrectionLevel: 'M', // Medium error correction - better balance between scanning and data density
      type: 'image/png',
      margin: 4, // Larger margin for better scanning
      color: {
        dark: '#000000', // Pure black for maximum contrast and readability
        light: '#FFFFFF', // Pure white background
      },
      width: 512, // Even higher resolution for better quality
      scale: 8, // Higher scale for sharper rendering
    });
    return qrCode;
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

export const generateImage = async (
  eventName: string,
  type: string,
  nftId: string,
  qrCodeData: object // Complete QR code data object
) => {
  const canvas = createCanvas(IMAGE_WIDTH, IMAGE_HEIGHT);
  const ctx = canvas.getContext('2d');

  // Create rounded rectangle function
  const roundRect = (x: number, y: number, width: number, height: number, radius: number) => {
    ctx.beginPath();
    ctx.moveTo(x + radius, y);
    ctx.lineTo(x + width - radius, y);
    ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
    ctx.lineTo(x + width, y + height - radius);
    ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
    ctx.lineTo(x + radius, y + height);
    ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
    ctx.lineTo(x, y + radius);
    ctx.quadraticCurveTo(x, y, x + radius, y);
    ctx.closePath();
  };

  // Create outer gradient background (blue theme to match web interface)
  const outerGradient = ctx.createLinearGradient(0, 0, IMAGE_WIDTH, IMAGE_HEIGHT);
  outerGradient.addColorStop(0, '#1a88ff'); // Primary blue
  outerGradient.addColorStop(0.5, '#0066cc'); // Medium blue
  outerGradient.addColorStop(1, '#004499'); // Dark blue

  ctx.fillStyle = outerGradient;
  ctx.fillRect(0, 0, IMAGE_WIDTH, IMAGE_HEIGHT);

  // Create inner white card with rounded corners
  const cardPadding = 30;
  const cardX = cardPadding;
  const cardY = cardPadding;
  const cardWidth = IMAGE_WIDTH - cardPadding * 2;
  const cardHeight = IMAGE_HEIGHT - cardPadding * 2;
  const cardRadius = 20;

  // Add shadow for the inner card
  ctx.shadowColor = 'rgba(0, 0, 0, 0.2)';
  ctx.shadowBlur = 15;
  ctx.shadowOffsetX = 0;
  ctx.shadowOffsetY = 8;

  // Draw white inner card
  roundRect(cardX, cardY, cardWidth, cardHeight, cardRadius);
  ctx.fillStyle = '#ffffff';
  ctx.fill();

  // Reset shadow
  ctx.shadowColor = 'transparent';
  ctx.shadowBlur = 0;
  ctx.shadowOffsetX = 0;
  ctx.shadowOffsetY = 0;

  // Generate QR code with purple color
  const qrCodeDataURL = await generateQRCode(qrCodeData);
  const qr = await loadImage(qrCodeDataURL);

  // Position QR code in the center-top of the white card - increased size for better readability
  const qrSize = 320;
  const qrX = (IMAGE_WIDTH - qrSize) / 2;
  const qrY = cardY + 30;

  // Create white background for QR code with padding for better contrast
  const qrPadding = 15;
  ctx.fillStyle = '#ffffff';
  ctx.fillRect(qrX - qrPadding, qrY - qrPadding, qrSize + qrPadding * 2, qrSize + qrPadding * 2);

  // Add subtle border around QR code
  ctx.strokeStyle = '#e0e0e0';
  ctx.lineWidth = 1;
  ctx.strokeRect(qrX - qrPadding, qrY - qrPadding, qrSize + qrPadding * 2, qrSize + qrPadding * 2);

  // Draw QR code
  ctx.drawImage(qr, qrX, qrY, qrSize, qrSize);

  // Event name styling - adjusted for larger QR code
  const eventY = qrY + qrSize + 45;
  ctx.font = 'bold 48px system-ui, -apple-system, sans-serif';
  ctx.fillStyle = '#000000';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(eventName.toUpperCase(), IMAGE_WIDTH / 2, eventY);

  // NFT badge with gradient background - more compact spacing
  const badgeY = eventY + 50;
  const badgeWidth = 180;
  const badgeHeight = 50;
  const badgeX = (IMAGE_WIDTH - badgeWidth) / 2;
  const badgeRadius = 25;

  // Create badge gradient (blue theme)
  const badgeGradient = ctx.createLinearGradient(badgeX, badgeY, badgeX + badgeWidth, badgeY);
  badgeGradient.addColorStop(0, '#1a88ff'); // Primary blue
  badgeGradient.addColorStop(1, '#0066cc'); // Darker blue

  // Draw badge background
  roundRect(badgeX, badgeY, badgeWidth, badgeHeight, badgeRadius);
  ctx.fillStyle = badgeGradient;
  ctx.fill();

  // Badge text
  ctx.font = 'bold 24px system-ui, -apple-system, sans-serif';
  ctx.fillStyle = '#ffffff';
  ctx.textAlign = 'center';
  ctx.fillText(`${type.toUpperCase()} #${nftId}`, IMAGE_WIDTH / 2, badgeY + badgeHeight / 2);

  const buffer = canvas.toBuffer('image/png');
  return buffer;
};

import canvas, { createCanvas, loadImage } from 'canvas';
import { IMAGE_HEIGHT, IMAGE_WIDTH, LAYER_DIR } from './utils/constants';
import path from 'path';
import { toDataURL } from 'qrcode';

const generateQRCode = async (data: string | object): Promise<string> => {
  // Convert object to JSON string if needed
  const qrData = typeof data === 'object' ? JSON.stringify(data) : data;

  try {
    const qrCode = await toDataURL(qrData, {
      errorCorrectionLevel: 'M',
      type: 'image/png',
      margin: 1,
      color: {
        dark: '#000000',
        light: '#FFFFFF',
      },
      width: 256,
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

  const bkgs = ['Background1', 'Background2', 'Background3'];
  const bkg = bkgs[Math.floor(Math.random() * bkgs.length)];
  await addLayer('Backgrounds', bkg, ctx);

  // Generate QR code with complete ticket data
  const qrCodeDataURL = await generateQRCode(qrCodeData);
  const qr = await loadImage(qrCodeDataURL);

  // Position QR code in the center-top area
  const qrSize = 180;
  const qrX = (IMAGE_WIDTH - qrSize) / 2;
  const qrY = 60;
  ctx.drawImage(qr, qrX, qrY, qrSize, qrSize);

  // Add ticket information text
  ctx.fillStyle = '#ffffff';
  ctx.strokeStyle = '#000000';
  ctx.lineWidth = 2;
  ctx.font = 'bold 24px Arial, sans-serif';
  ctx.textAlign = 'center';

  // Event name
  const eventText = eventName.toUpperCase();
  ctx.strokeText(eventText, IMAGE_WIDTH / 2, 280);
  ctx.fillText(eventText, IMAGE_WIDTH / 2, 280);

  // Sector and token info
  ctx.font = 'bold 18px Arial, sans-serif';
  const sectorText = `${type.toUpperCase()} - TOKEN #${nftId}`;
  ctx.strokeText(sectorText, IMAGE_WIDTH / 2, 310);
  ctx.fillText(sectorText, IMAGE_WIDTH / 2, 310);

  // Add QR code instruction
  ctx.font = '14px Arial, sans-serif';
  ctx.fillStyle = '#cccccc';
  ctx.fillText('Scan QR code for verification', IMAGE_WIDTH / 2, 460);

  const buffer = canvas.toBuffer('image/png');
  return buffer;
};

import canvas, { createCanvas, loadImage } from 'canvas';
import { IMAGE_HEIGHT, IMAGE_WIDTH, LAYER_DIR, OUTPUT_DIR } from './utils/constants';
import { writeFileSync } from 'fs';
import path from 'path';
import { toDataURL } from 'qrcode';

export const drawImage = async (nftID: string) => {
  const canvas = createCanvas(IMAGE_WIDTH, IMAGE_HEIGHT);
  const ctx = canvas.getContext('2d');

  const layers = [];

  const bkgs = ['Background1', 'Background2', 'Background3'];
  const bkg = bkgs[Math.floor(Math.random() * bkgs.length)];
  layers.push(addLayer('Backgrounds', bkg, ctx));

  await Promise.all(layers);

  const qrCode = await generateQRCode();
  const qr = await loadImage(qrCode);
  ctx.drawImage(qr, 75, 50, IMAGE_WIDTH - 150, IMAGE_HEIGHT - 150);

  ctx.fillStyle = '#ffffff';
  ctx.font = '20px Nunito, sans-serif';
  ctx.fillText(`Encigoool`, 120, 460);

  const buffer = canvas.toBuffer('image/png');
  const p = path.resolve(__dirname, `${OUTPUT_DIR}/test.png`);
  writeFileSync(p, buffer);
};

const generateQRCode = async () => {
  const qrCode = await toDataURL('https://www.youtube.com/watch?v=dQw4w9WgXcQ');
  return qrCode;
};

const addLayer = async (traitType: string, val: string, ctx: canvas.CanvasRenderingContext2D) => {
  const p = path.resolve(__dirname, `${LAYER_DIR}/${traitType}/${val}.png`);
  const img = await canvas.loadImage(p);
  ctx.drawImage(img, 0, 0, IMAGE_WIDTH, IMAGE_HEIGHT);
};

import canvas, { createCanvas } from 'canvas';
import { IMAGE_HEIGHT, IMAGE_WIDTH, LAYER_DIR, OUTPUT_DIR } from './utils/constants';
import { writeFileSync } from 'fs';
import path from 'path';

export const drawImage = async (nftID: string) => {
  const canvas = createCanvas(IMAGE_WIDTH, IMAGE_HEIGHT);
  const ctx = canvas.getContext('2d');

  const layers = [];

  const bkgs = ['Background1', 'Background2', 'Background3'];
  const bkg = bkgs[Math.floor(Math.random() * bkgs.length)];
  layers.push(addLayer('Backgrounds', bkg, ctx));

  await Promise.all(layers);

  ctx.fillStyle = '#ffffff';
  ctx.font = '20px Nunito, sans-serif';
  ctx.fillText(`Encigoool`, 120, 460);

  const buffer = canvas.toBuffer('image/png');
  const p = path.resolve(__dirname, `${OUTPUT_DIR}/test.png`);
  writeFileSync(p, buffer);
};

const addLayer = async (traitType: string, val: string, ctx: canvas.CanvasRenderingContext2D) => {
  const p = path.resolve(__dirname, `${LAYER_DIR}/${traitType}/${val}.png`);
  const img = await canvas.loadImage(p);
  ctx.drawImage(img, 0, 0, IMAGE_WIDTH, IMAGE_HEIGHT);
};

import express, { Request, Response, Application } from 'express';
import dotenv from 'dotenv';
import { PORT } from './env';
import { drawImage } from './modules/image/image.generator';
import { uplaodMetadata } from './modules/image/UploadDetails';
import { deploy } from './modules/nft/deploy';

dotenv.config();

const app: Application = express();
const port = PORT;

app.get('/', async (req: Request, res: Response) => {
  const imageBuffer = await drawImage('Event', 'Type', '1', 'https://www.youtube.com/watch?v=dQw4w9WgXcQ');
  const metadata = {
    name: 'Event',
    description: 'Type',
  };
  const { metadataHash } = await uplaodMetadata(metadata, imageBuffer);
  const address = await deploy(metadataHash);
  res.send(address.toString());
});

app.listen(port, () => {
  console.log(`Server is Fire at http://localhost:${port}`);
});

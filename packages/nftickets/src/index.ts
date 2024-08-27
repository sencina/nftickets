import express, { Request, Response, Application } from 'express';
import dotenv from 'dotenv';
import { PORT } from './env';
import { drawImage } from './modules/image';

dotenv.config();

const app: Application = express();
const port = PORT;

app.get('/', (req: Request, res: Response) => {
  drawImage('1234').then(() => {});
});

app.listen(port, () => {
  console.log(`Server is Fire at http://localhost:${port}`);
});

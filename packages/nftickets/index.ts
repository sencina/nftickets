import express, { Request, Response , Application } from 'express';
import dotenv from 'dotenv';
import { PORT } from './modules/env';

dotenv.config();

const app: Application = express();
const port = PORT

app.get('/', (req: Request, res: Response) => {
  res.send('Welcome to Express & TypeScript Server');
});

app.listen(port, () => {
  console.log(`Server is Fire at http://localhost:${port}`);
});
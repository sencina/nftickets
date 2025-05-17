import express, { Application } from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import { router } from '@router';
import { ErrorHandling } from '@utils/errors';
import { PORT } from '@env';
import fs from 'fs';
import path from 'path';

require('express-async-errors');

// Ensure necessary directories exist
const templateDir = path.join(__dirname, 'modules/event/templates');
if (!fs.existsSync(templateDir)) {
  console.log(`Creating template directory: ${templateDir}`);
  fs.mkdirSync(templateDir, { recursive: true });
}

// Copy template file if it doesn't exist
const templateSource = path.join(__dirname, '../src/modules/event/templates/authentication.html');
const templateDest = path.join(templateDir, 'authentication.html');

if (fs.existsSync(templateSource) && !fs.existsSync(templateDest)) {
  console.log(`Copying template from ${templateSource} to ${templateDest}`);
  fs.copyFileSync(templateSource, templateDest);
}

const app: Application = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(
  cors({
    origin: '*',
  })
);

app.use('/api', router);

app.use(ErrorHandling);

app.listen(PORT, () => {
  console.log(`Server is Fire at http://localhost:${PORT}`);
});

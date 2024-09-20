import express, { Request, Response } from 'express';
import authRoutes from './modules/auth/routes';
import dotenv from 'dotenv';

// read env
dotenv.config();

const app = express();
const port = process.env.APP_PORT || 3000;

app.use(express.json());
app.use(`/api/v1/auth`, authRoutes);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

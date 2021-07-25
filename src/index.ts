import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import { logger } from './middleware/logger';
import { errorHandler } from './helpers/error-handler';

const app: Application = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(logger);

app.use('/api', require('./routes/api/api'));

app.all('*', (req: Request, res: Response) =>
  errorHandler(res, 'Invalid request')
);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

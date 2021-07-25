import { Response } from 'express';
export const errorHandler = (res: Response, message: string) => {
  res.status(400).json({ message, status: 400 });
};

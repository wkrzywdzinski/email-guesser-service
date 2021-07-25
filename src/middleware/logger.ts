import { NextFunction, Request, Response } from 'express';
import { appendFile } from 'fs';
import moment from 'moment';

export const logger = (req: Request, res: Response, next: NextFunction) => {
  const { fullName } = req.body;
  const date = moment().format();
  const logText = `New request by ${fullName} on ${date}\n`;

  appendFile('log.txt', logText, (err) => {
    if (err) {
      console.log('Error on log update');
    }
  });

  next();
};

import { Request, Response } from 'express';

export const getRoot = (_: Request, res: Response): void => {
  res.status(200).send('Hello World');
};

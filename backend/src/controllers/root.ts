import { Request, Response } from 'express';

export const rootController = (req: Request, res: Response): void => {
  res.status(200).send('Hello World');
};

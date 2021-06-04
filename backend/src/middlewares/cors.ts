import { Express } from 'express';
import cors from 'cors';

const useCors = (app: Express) => {
  app.use(cors());
};

export const useCorsMiddlewares = (app: Express): void => {
  useCors(app);
};

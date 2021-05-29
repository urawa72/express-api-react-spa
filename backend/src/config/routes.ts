import { Express } from 'express';
import { rootController } from '../controllers/root';

export const defineRoutes = (app: Express): void => {
  app.get('/', rootController);
};

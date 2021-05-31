import { Express } from 'express';
import helmet from 'helmet';

const useHelmet = (app: Express) => {
  app.use(helmet());
};

export const useSecurityMiddlewares = (app: Express): void => {
  useHelmet(app);
};

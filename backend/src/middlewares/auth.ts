import { Express } from 'express';
import passport from 'passport';
import { initStrategy } from '../config/passport';

const useAuth = (app: Express) => {
  app.use(passport.initialize());
  initStrategy();
};

export const useAuthMiddlewares = (app: Express): void => {
  useAuth(app);
};

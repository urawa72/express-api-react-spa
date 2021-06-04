import { Express } from 'express';
import { signup, signin, verifyJwt } from '../controllers/api/auth';
import { getRoot } from '../controllers/root';
import { getUsers } from '../controllers/api/users';

export const defineRoutes = (app: Express): void => {
  app.get('/', getRoot);

  app.post('/signup', signup);
  app.post('/signin', signin);

  app.get('/users', verifyJwt, getUsers);
};

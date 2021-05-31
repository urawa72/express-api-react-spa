import { Express } from 'express';
import { getRoot } from '../controllers/root';
import { signin } from '../controllers/api/auth';
import { getUsers, createUser } from '../controllers/api/users';

export const defineRoutes = (app: Express): void => {
  app.get('/', getRoot);

  app.post('/signin', signin);

  app.get('/users', getUsers);
  app.post('/users', createUser);
};

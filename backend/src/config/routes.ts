import { Express } from 'express';
import { getRoot } from '../controllers/root';
import { getUsers, createUser } from '../controllers/api/users';

export const defineRoutes = (app: Express): void => {
  app.get('/', getRoot);

  app.get('/users', getUsers);
  app.post('/users', createUser);
};

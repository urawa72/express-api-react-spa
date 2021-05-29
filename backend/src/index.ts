import express from 'express';
import { defineRoutes } from './config/routes';
import { useRequestMiddlewares } from './middlewares/request';
import { useResponseMiddlewares } from './middlewares/response';

const app = express();

// middlewares
useRequestMiddlewares(app);
useResponseMiddlewares(app);

// routes
defineRoutes(app);

app.listen(3000, () => {
  console.log('Start Express API server at port: 3000');
});

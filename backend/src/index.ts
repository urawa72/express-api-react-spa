import express from 'express';
import { defineRoutes } from './config/routes';
import { useRequestMiddlewares } from './middlewares/request';
import { useResponseMiddlewares } from './middlewares/response';
import { useSecurityMiddlewares } from './middlewares/security';
import { useAuthMiddlewares } from './middlewares/auth';
import { useCorsMiddlewares } from './middlewares/cors';

const app = express();

// middlewares
useRequestMiddlewares(app);
useResponseMiddlewares(app);
useSecurityMiddlewares(app);
useAuthMiddlewares(app);
useCorsMiddlewares(app);

// routes
defineRoutes(app);

app.listen(3000, () => {
  console.log('Start Express API server at port: 3000');
});

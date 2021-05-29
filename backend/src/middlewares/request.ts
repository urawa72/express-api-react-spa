import express, { Express } from 'express';

const useBodyParser = (app: Express) => {
  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());
};

export const useRequestMiddlewares = (app: Express): void => {
  useBodyParser(app);
};

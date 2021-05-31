import { Request, Response } from 'express';
import { genHash } from '../../helpers/bcrypt';
import db from '../../models';

export const getUsers = async (_: Request, res: Response): Promise<void> => {
  try {
    const users = await db.User.findAll();
    res.status(200).json(users);
  } catch (e) {
    res.status(500).json('Error occurred');
  }
};

export const createUser = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const encrypted = await genHash(req.body.password);
    const user = await db.User.findOrCreate({
      where: { email: req.body.email },
      defaults: {
        name: req.body.name,
        email: req.body.email,
        password: encrypted,
      },
    });
    res.status(200).json(user);
  } catch (e) {
    res.status(500).json('Error occurred');
  }
};

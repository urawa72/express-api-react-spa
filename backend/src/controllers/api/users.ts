import { Request, Response } from 'express';
import db from '../../models';

export const getUsers = async (_: Request, res: Response): Promise<void> => {
  try {
    const users = await db.User.findAll();
    res.status(200).json(users);
  } catch (e) {
    res.status(500).json('Error occurred');
  }
};

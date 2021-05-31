import { Request, Response, NextFunction } from 'express';
import passport from 'passport';
import jwt from 'jsonwebtoken';
import { UserAttributes } from '../../models/user';

export const signin = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  passport.authenticate('signin', (err: Error, user: UserAttributes) => {
    if (err) {
      return next(err);
    }
    if (!user) {
      return res.status(401).json('Unauthorized.');
    }
    const body = { id: user.id, email: user.email };
    const token = jwt.sign(body, 'secret', {
      expiresIn: '1h',
      subject: user.email,
    });
    res.json({ token });
  })(req, res, next);
};

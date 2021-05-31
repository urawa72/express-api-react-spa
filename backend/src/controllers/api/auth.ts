import { Request, Response, NextFunction } from 'express';
import passport from 'passport';
import jwt from 'jsonwebtoken';
import User from '../../models/user';

export const signin = (
  req: Request,
  res: Response,
  next: NextFunction,
): void => {
  passport.authenticate('signin', (err: Error, user: User) => {
    if (err) {
      return next(err);
    }
    if (!user) {
      return res.status(401).json('Unauthorized.');
    }
    const body = { id: user.id, email: user.email };
    const token = jwt.sign(body, 'secret', {
      expiresIn: '1h',
      subject: user.id.toString(),
    });
    res.json({ token });
  })(req, res, next);
};

export const verifyJwt = (
  req: Request,
  res: Response,
  next: NextFunction,
): void => {
  passport.authenticate(
    'verify',
    { session: false },
    (err: Error, user: User) => {
      if (err) {
        return next(err);
      }
      if (!user) {
        return res.status(401).json('Unauthorized.');
      }
      req.user = user;
      next();
    },
  )(req, res, next);
};

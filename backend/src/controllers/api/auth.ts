import { Request, Response, NextFunction } from 'express';
import passport from 'passport';
import jwt from 'jsonwebtoken';
import { check, sanitize, validationResult } from 'express-validator';
import { genHash } from '../../helpers/bcrypt';
import db from '../../models';
import User from '../../models/user';

export const signup = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  await check('email', 'Email is not valid').isEmail().run(req);
  await check('password', 'Passowrd must be at least 4 characters long')
    .isLength({ min: 4 })
    .run(req);
  await check('confirmPassword', 'Passowrds do not match')
    .equals(req.body.password)
    .run(req);
  await sanitize('email').normalizeEmail({ gmail_remove_dots: false }).run(req);
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    res.status(400).json({ errors: errors.array() });
  }

  const encrypted = await genHash(req.body.password);
  const user = new User({
    name: req.body.name,
    email: req.body.email,
    password: encrypted,
  });

  try {
    const count = await db.User.count({
      where: { email: req.body.email },
    });
    if (count === 0) {
      await user.save();
      res.status(201).json('Created');
    } else {
      res.status(400).json('Invalid parameters.');
    }
  } catch (e) {
    return next(e);
  }
};

export const signin = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  await check('email', 'Email is not valid').isEmail().run(req);
  await check('password', 'Passowrd cannot be blank')
    .isLength({ min: 2 })
    .run(req);
  await sanitize('email').normalizeEmail({ gmail_remove_dots: false }).run(req);

  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    res.status(400).json({ errors: errors.array() });
  }

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

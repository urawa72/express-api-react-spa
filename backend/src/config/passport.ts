import passport from 'passport';
import passportLocal from 'passport-local';
import passportJwt from 'passport-jwt';
import { comparePlainWithHash } from '../helpers/bcrypt';
import db from '../models';

const LocalStrategy = passportLocal.Strategy;
const JwtStrategy = passportJwt.Strategy;
const ExtractJwt = passportJwt.ExtractJwt;

export const initStrategy = (): void => {
  passport.use(
    'signin',
    new LocalStrategy(
      { usernameField: 'email', passwordField: 'password', session: false },
      async (email, password, done) => {
        try {
          const user = await db.User.findOne({
            where: { email: email },
            raw: true,
          });
          if (!user) {
            return done(null, false, { message: `Email ${email} not found.` });
          }
          const validPassword = await comparePlainWithHash(
            password,
            user.password,
          );
          if (!validPassword) {
            return done(null, false, { message: `Invalid email or password.` });
          }
          return done(null, user, {
            message: 'Logged in successfully.',
          });
        } catch (e) {
          done(e, false);
        }
      },
    ),
  );

  passport.use(
    'verify',
    new JwtStrategy(
      {
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        secretOrKey: 'secret',
      },
      async (jwtPayload, done) => {
        try {
          const user = await db.User.findByPk(jwtPayload.id);
          if (user) {
            done(null, user);
          } else {
            done(null, false);
          }
        } catch (e) {
          done(e, false);
        }
      },
    ),
  );
};

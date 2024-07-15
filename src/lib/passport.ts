import mongoose from 'mongoose';
import passport from 'passport';
import { ExtractJwt, Strategy, StrategyOptions } from 'passport-jwt';
import userService from '../services/user.service';
import { EJwtOptions } from '../types/auth.types';

const options: StrategyOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.APP_KEY!,
  issuer: EJwtOptions.ISSUER,
  audience: EJwtOptions.AUDIENCE,
};

passport.use(
  new Strategy(options, async function (
    jwtPayload: { _id: mongoose.Types.ObjectId },
    done
  ) {
    try {
      const user = await userService.getById(jwtPayload._id);

      if (!user) {
        return done(null, false);
      }

      return done(null, user);
    } catch (error) {
      return done(error, false);
    }
  })
);

export default passport;

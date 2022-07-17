import passport from 'passport';
import { Strategy as JWTStrategy, ExtractJwt } from 'passport-jwt';
import { JWT_SECRET } from './config.js';
import User from '../models/userModel.js';

const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: JWT_SECRET,
};

const jwtStrategy = new JWTStrategy(options, async (payload, done) => {
  try {
    const user = await User.findById(payload.sub).select('-password');
    // if there is no user return false
    if (!user) {
      return done(null, false);
    }
    // return user
    return done(null, user);
  } catch (error) {
    // return an error
    return done(error, false);
  }
});

passport.use(jwtStrategy);
const authJWT = passport.authenticate('jwt', { session: false });

export default authJWT;

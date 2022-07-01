import passport from "passport"
import { Strategy as JWTStrategy, ExtractJwt } from "passport-jwt"
import { JWT_SECRET } from "./config/js"
import User from "../models/userModel.js"

const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: JWT_SECRET,
}

const strategy = new JWTStrategy(options, async (payload, done) => {
  try {
    const user = await User.findById(payload._id)
    // if there is no user return false
    if (!user) {
      return done(null, false)
    }
    // return user
    return done(null, user)
  } catch (error) {
    // return an error
    return done(error, false)
  }
})

passport.use(strategy)
export const authJWT = passport.authenticate("jwt", { session: false })

import User from "../models/User.js";
import bcrypt from "bcryptjs";
import passportLocal from "passport-local";
import passportGoogle from "passport-google-oauth20";

const localStrategy = passportLocal.Strategy;
const googleStrategy = passportGoogle.Strategy;

const passportStrategy = (passport) => {
  passport.use(
    new googleStrategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: "/api/v1/auth/google/callback",
      },
      async (accessToken, refreshToken, profile, done) => {
        // console.log(profile);
        const newUser = {
          googleId: profile.id,
          name: profile.displayName,
          email: profile.emails[0].value,
          image: profile.photos[0].value
        }

        try {
          let user = await User.findOne({googleId: profile.id})

          if(user){
            done(null, user)
          } else{
            user = await User.create(newUser)
            done(null, user)
          }
        } catch (error) {
          console.error(error)
        }
      }
    )
  );

  passport.use(
    new localStrategy({usernameField: "email", passwordField: "password"},(username, password, done) => {
      User.findOne({ email: username }, (err, user) => {
        if (err) throw err;
        if (!user) return done(null, false);
        bcrypt.compare(password, user.password, (err, result) => {
          if (err) throw err;
          if (result === true) {
            return done(null, user);
          } else {
            return done(null, false);
          }
        });
      });
    })
  );

  // save userid in session cookie
  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  // retrieve the whole object stored in session
  passport.deserializeUser((id, done) => {
    User.findOne({ _id: id }, (err, user) => {
      done(err, user);
    });
  });
};

export default passportStrategy;

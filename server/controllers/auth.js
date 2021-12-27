import User from "../models/User.js";
import bcrypt from "bcryptjs";
import passport from "passport";

const CLIENT_URL = "http://localhost:3000/register";

export const login = (req, res, next) => {
    passport.authenticate("local", (err, user) => {
      if (err) throw err;
      if (!user) res.send("No user exists");
      else {
        req.login(user, (err) => {
          if (err) throw err;
          res.send("Success Authenticated");
          console.log(req.user);
        });
      }
    })(req, res, next);
};

export const signup = (req, res) => {
  try {
    console.log(req.body);

    User.findOne(
      {
        email: req.body.email,
      },
      async (err, user) => {
        if (err) throw err;
        if (user) res.send("User Already Exists");
        if (!user) {
          const hashedPassword = await bcrypt.hash(req.body.password, 10);
          const newUser = new User({
            name: req.body.name,
            email: req.body.email,
            contactNumber: req.body.number,
            password: hashedPassword,
          });
          await newUser.save();
          res.send("user created");
        }
      }
    );
  } catch (error) {
    res.status(400).json(error);
  }
};

export const googleCallback = (req, res) => {
  console.log("user is", req.user);
  res.redirect("http://localhost:3000/dashboard");
};

export const logout = (req, res) => {
  req.logout();
  console.log("user is", req.user);
  res.redirect(CLIENT_URL);
};

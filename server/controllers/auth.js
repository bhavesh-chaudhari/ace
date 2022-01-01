import User from "../models/User.js";
import bcrypt from "bcryptjs";
import passport from "passport";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { sendMail } from "../mail/mail.js";

dotenv.config({ path: "./config/.env" });
const CLIENT_URL = "http://localhost:3000/register";
const JWT_SECRET = process.env.JWT_SECRET;

export const login = (req, res, next) => {
  try {
    passport.authenticate("local", (err, user) => {
      if (err) throw err;
      if (!user) res.status(400).json({ message: "no such user exists" });
      else {
        req.login(user, (err) => {
          if (err) throw err;
          res.status(200).json({
            loggedInUser: req.user,
            message: "user authenticated successfully",
          });
          // console.log(req.user);
        });
      }
    })(req, res, next);
  } catch (error) {
    res.status(400).json(error);
  }
};

export const signup = (req, res) => {
  try {
    User.findOne(
      {
        email: req.body.email,
      },
      async (err, user) => {
        if (err) throw err;
        if (user) res.status(409).json({ message: "user already exists" });
        if (!user) {
          const hashedPassword = await bcrypt.hash(req.body.password, 10);
          const newUser = new User({
            name: req.body.name,
            email: req.body.email,
            contactNumber: req.body.number,
            password: hashedPassword,
          });
          await newUser.save();
          req.login(newUser, (err) => {
            if (err) throw err;
            res.status(200).json({
              loggedInUser: newUser,
              message: "user created",
            });
            sendMail(
              newUser.email,
              "Registered successfully",
              "Thanks for connecting hands with ACE !",
              `<p> Thanks for connecting hands with ACE ! :)</p>`
            )
              .then((res) => console.log(res))
              .catch((error) => console.log(error));
          });
        }
      }
    );
  } catch (error) {
    res.status(400).json(error);
  }
};

export const googleCallback = (req, res) => {
  // console.log("user is", req.user);
  res.redirect("http://localhost:3000/dashboard");
};

export const logout = (req, res) => {
  req.logout();
  res.redirect(CLIENT_URL);
};

export const forgotPassword = async (req, res, next) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email: email });

    if (user.googleId) {
      res.status(403).json({
        message: "cannot change password, user is registered with google",
      });
      return;
    }

    if (!user) {
      res.status(404).json({ message: "user is not registered" });
      return;
    }

    // user exists and now create a One Time Link for 10 minutes
    const secret = JWT_SECRET + user.password;
    const payload = {
      email: user.email,
      id: user._id,
    };

    console.log(secret);

    const token = jwt.sign(payload, secret, { expiresIn: "15m" });

    const link = `http://localhost:3000/reset-password/${user._id}/${token}`;
    // console.log(link);

    const mailText = `You`;
    const mailHtml = `<h1>Hi there ${user.name}, <br/> We have received a password reset request from your account.
      <br/> here is your password reset link valid for the next 15 minutes: <a href=${link} >Password Reset Link</a>. 
      <br/>
      Thanks !
    </h1>`;

    sendMail(user.email, "ACE PASSWORD RESET LINK", mailText, mailHtml)
      .then((res) => console.log(res))
      .catch((error) => console.log(error));

    res
      .status(200)
      .json({ message: "Password reset link has been sent to your email" });
  } catch (error) {
    res.status(400).json(error);
  }
};

export const checkUser = async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.body.id });

    if (!user) {
      res
        .status(404)
        .json({ message: `user with id ${req.body.id} is not registered` });
      return;
    }

    const secret = JWT_SECRET + user.password;

    const payload = jwt.verify(req.body.token, secret);

    res.status(200).json({ message: `user is valid` });
  } catch (error) {
    res.status(400).json(error.message);
  }
};

export const resetPassword = async (req, res, next) => {
  try {
    const newPassword = req.body.password;

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    const update = { password: hashedPassword };
    const user = await User.findOneAndUpdate({ _id: req.body.id }, update, {
      new: true,
      runValidators: true,
    });

    if (!user) {
      res
        .status(404)
        .json({ message: `No user found with id ${req.body.id} ` });
    }

    res.status(200).json("password has been reset");
  } catch (error) {
    res.status(400).json({ message: error });
  }
};

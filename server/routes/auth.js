import express from "express";
import passport from "passport";
import { login, signup, googleCallback, logout } from "../controllers/auth.js";

const router = express.Router();

router.post("/login", login);
router.post("/signup", signup);

router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

router.get(
  "/google/callback",
  passport.authenticate("google", {
    failureRedirect: "http://localhost:3000/register",
  }),
  googleCallback
);

router.get("/authenticatedUser", (req, res) => {
  try {
    if (req.user) {
      res.status(200).json({ loggedInUser: req.user });
    }
  } catch (error) {
    res.status(400).json(error);
  }
});

router.get("/logout", logout);

export default router;

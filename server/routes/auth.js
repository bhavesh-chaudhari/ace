import express from "express";
import passport from "passport";
import { login, signup, googleCallback, logout, forgotPassword, resetPassword, checkUser } from "../controllers/auth.js";

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
  if(req.user){
    res.status(200).json({ loggedInUser: req.user });
  }
  else{
    res.status(404).json({message: "no logged in user"})
  }
});

router.get("/logout", logout);

router.post("/forgotPassword", forgotPassword)

router.post("/checkUser", checkUser)

router.patch("/resetPassword", resetPassword)

export default router;

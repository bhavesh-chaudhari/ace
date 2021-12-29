import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import CONNECT_DB from "./db/connect.js";
import eventsRouter from "./routes/events.js";
import authRouter from "./routes/auth.js";
import userRouter from "./routes/users.js"
import session from "express-session";
import cookieParser from "cookie-parser";
import passport from "passport";
import passportStrategy from "./config/passportConfig.js";
import { ensureAuth, ensureGuest } from "./middlewares/auth.js";

// initialize app
const app = express();
app.use(express.json({limit: "5mb"}));

// configure dotenv
dotenv.config({ path: "./config/.env" });

// cors
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

// express session
app.use(
  session({
    secret: "_cold_",
    resave: false,
    saveUninitialized: true,
    // cookie: { secure: true },
  })
);

// cookie parser (use the secret from express session)
app.use(cookieParser("_cold_"));

// passport
app.use(passport.initialize());
app.use(passport.session());
passportStrategy(passport);

app.get("/", (req, res)=>{
  console.log(req.user)
  res.send("slash wow")
})

app.use("/api/v1/events", ensureAuth, eventsRouter);
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/users", userRouter)

// read environment variables from .env
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;

// start listening on port after connected to db
const startServer = async () => {
  try {
    await CONNECT_DB(MONGO_URI);
    app.listen(PORT, () => {
      // console.log("Database connected");
      console.log(`server is listening on port ${PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
};

startServer();
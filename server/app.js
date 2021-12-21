import express from "express"
import dotenv from "dotenv"
import cors from "cors"
import CONNECT_DB from "./db/connect.js";
import eventsRouter from "./routes/events.js"

// initialize app
const app = express();
app.use(express.json());

// configure dotenv
dotenv.config({path:"./config/.env"});

// cors
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

app.use("/api/v1/events", eventsRouter)

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
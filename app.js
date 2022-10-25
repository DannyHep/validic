import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import { router } from "./routes/user.js";
import "dotenv/config";
import { corsConfig } from "./config/corsConfig.js";
import cookieParser from "cookie-parser";

const app = express();
const port = process.env.PORT || 8088;
const { MONGODB_URI } = process.env;

mongoose
  .connect(
    MONGODB_URI ||
      "mongodb+srv://fabadea:Token123@cluster0.tn1tw.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"
  )
  .then(() => {
    console.log("connected to mongoDB");
  })
  .catch((err) => {
    console.log(err);
  });

app.use(express.json());
app.use(cors(corsConfig));
app.use(cookieParser());

// routes
app.use("/user", router);
app.use("/", (req, res) => {
  res.send({ success: true, msg: "Fitness tracker running" });
});

app.listen(port, () => {
  console.log(`server is running on port ${port}`);
});

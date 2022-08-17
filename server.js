import express from "express";
import cors from "cors";
import { router } from "./routes/user.js";
import "dotenv/config";

const app = express();
const port = process.env.PORT || 8088;

app.use(express.json());
app.use(cors());

// routes
app.use("/user", router);

app.listen(port, () => {
  console.log(`server is running on port ${port}`);
});

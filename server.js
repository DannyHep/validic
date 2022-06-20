const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
const port = process.env.PORT || 8080;

app.use(express.json());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// routes
const userRouter = require("./routes/user");
app.use("/user", userRouter);

app.listen(port, () => {
  console.log(`server is running on port ${port}`);
});

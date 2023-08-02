const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
require("dotenv").config();

const authRoutes = require("./src/routes/auth");
const taskRoutes = require("./src/routes/task");

// const { db } = require("./models/User");

const app = express();

mongoose
  .connect(process.env.DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("DB Connected"));

// middlewares
app.use(bodyParser.json());
app.use(cors());

app.use("/api", authRoutes);
app.use("/api/task", taskRoutes);

const port = process.env.PORT || 8000;

app.listen(port, () => {
  console.log(`Server is running on ${port}`);
});

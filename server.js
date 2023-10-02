require("dotenv").config({ path: "./config.env" });
const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");

const app = express();

app.use(morgan("dev"));
app.use(express.static("./public"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

mongoose
  .connect(process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/hblog", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(() => {
    console.log("MongoDB Connected");
    try {
      app.listen(process.env.PORT || 9999);
      console.log("Server Connected");
    } catch (error) {
      console.log("Error: ", error.stack);
    }
  });

require("dotenv").config({ path: "./config.env" });
const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const routes = require("./routes");

const app = express();

app.use(morgan("dev"));
app.use(express.static("./public"));
app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/", routes);
mongoose
  // .connect(process.env.MONGODB_URI)
  .connect(process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/hblog")
  .then(() => {
    console.log("MongoDB Connected");
    try {
      app.listen(process.env.PORT || 9999);
      console.log("Server Connected \nRunning on at localhost:"+(process.env.PORT || 9999));
    } catch (error) {
      console.log("Error: ", error.stack);
    }
  });

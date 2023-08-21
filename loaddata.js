const mongoose = require("mongoose");
const dotenv = require("dotenv");
const fs = require("fs");
const Tour = require("./models/dataModel");

dotenv.config({ path: "./config.env" });

const uri =
  "mongodb+srv://hwy:<password>@xtours.gzchnul.mongodb.net/?retryWrites=true&w=majority";

mongoose
  .connect(uri.replace("<password>", process.env.DB_PASSWORD))
  .then((conn) => {
    // console.log(conn);
    console.log("Conntect to database");
  });

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/dev-data/data/tours.json`, "utf-8")
);

//INSERT INTO DATABASE
const importData = async () => {
  try {
    await Tour.create(tours);
    console.log("Data Successfully Loaded");
  } catch (err) {
    console.log(err);
  }
};

importData();

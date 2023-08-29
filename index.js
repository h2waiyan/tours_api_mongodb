const mongoose = require("mongoose");
const app = require("./app");

console.log(app.get("env")); // Express Env V

process.on("uncaughtException", (err) => {
  console.log(err.name, err.message);
  process.exit(1);
});

// console.log(process.env); // Nodejs Env V

const port = 3000;

const uri =
  "mongodb+srv://user:<password>@xtours.gzchnul.mongodb.net/?retryWrites=true&w=majority";

mongoose
  .connect(uri.replace("<password>", process.env.DB_PASSWORD))
  .then((conn) => {
    // console.log(conn);
    console.log("Conntect to database");
  });

server = app.listen(port, () => {
  console.log(`App is runing on port ${port}`);
});

process.on("unhandledRejection", (err) => {
  console.log(err.name, err.message);
  console.log("UnhandledRejection");
  server.close(() => {
    process.exit(1);
  });
});

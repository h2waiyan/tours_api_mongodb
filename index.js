const mongoose = require("mongoose");
const app = require("./app");

console.log(app.get("env")); // Express Env V

// console.log(process.env); // Nodejs Env V

const port = 3000;

const uri =
  "mongodb+srv://hwy:<password>@xtours.gzchnul.mongodb.net/?retryWrites=true&w=majority";

mongoose
  .connect(uri.replace("<password>", process.env.DB_PASSWORD))
  .then((conn) => {
    // console.log(conn);
    console.log("Conntect to database");
  });

app.listen(port, () => {
  console.log(`App is runing on port ${port}`);
});

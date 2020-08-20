const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const postsRoute = require("./routes/posts");
require("dotenv/config");

const app = express();
const PORT = process.env.PORT || 8080;

app.use(bodyParser.json());
app.use(express.urlencoded({ extended: false }));
// routes
app.use("/posts", postsRoute);

//Connect to DB
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

mongoose.connection.on("connected", () => {
  console.log("Connected");
});

//Listener to the server
app.listen(PORT);

const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();
const mongoose = require("mongoose");

const apiUserRoutes = require("./server/routes/apiUserRoutes");

// Connection to MONGO_DB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use(cors());

// To parse the data coming from POST requests
app.use(express.urlencoded({ extended: false }));

app.use(express.static("./client/public"));
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/client/views/index.html");
});

// Mount routes
app.use("/", apiUserRoutes);

const listener = app.listen(process.env.PORT || 3000, () => {
  console.log("Your app is listening on port " + listener.address().port);
});

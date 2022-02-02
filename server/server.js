require("dotenv").config();
const express = require("express");
const sequelize = require("./database/database.js");
const app = express();
const cors = require("cors");
const User = require("./database/models/User.js");
app.use(express.json());
app.use(cors());

//Running server
const PORT = process.env.DEVPORT || 5000;

app.post("/user", async (req, res) => {
  const user = await User.create({
    email: req.body.email,
    role: "admin",
    state: true,
  });
  res.status(201).send({
    message: "User created",
    data: user,
  });
});

//Routes
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
  const path = require("path");
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

app.listen(PORT, function () {
  console.log(`Server running on port ${PORT}`);
  sequelize
    .authenticate()
    .then(() => {
      console.log("Database connected");
    })
    .catch((error) => {
      console.log("Unable to connect to database: ", error);
    });
});

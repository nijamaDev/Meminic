require("dotenv").config();
const express = require("express");
const sequelize = require("./database/database.js");
const app = express();
const cors = require("cors");
const User = require("./database/models/User.js");
const { setEnvironmentData } = require("worker_threads");
app.use(express.json());
app.use(cors());

//Running server
const PORT = process.env.PORT || 5000;

// app.get("/test", (req, res) => {
//   User.build({
//     email: "melimusic@gmail.com",
//     role: "gay",
//     state: true,
//   }).then(async (user) => {
//     res.json(user);
//     await user.save();
//     console.log(user);
//   });
// });

app.get("/test", async (req, res) => {
  const user = await User.create({
    email: "melimusic@gmail.com",
    role: "gay",
    state: true,
  })
  res.status(201).send({
    message: "User created",
    data: user
  })
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

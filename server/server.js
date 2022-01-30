require('dotenv').config();
const express = require('express');
const sequelize = require('./database/database.js');
const bodyParser = require('body-parser');
const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

if (process.env.NODE_ENV === 'production') {
}
//Routes
const path = require('path');
console.log(path.resolve(__dirname, 'index.html'));
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'index.html'));
});

//Running server
const PORT = process.env.PORT || 5000;

app.listen(PORT, function () {
  console.log(`Server running on port ${PORT}`);
  sequelize
    .authenticate()
    .then(() => {
      console.log('Database connected');
    })
    .catch((error) => {
      console.log('Unable to connect to database: ', error);
    });
});

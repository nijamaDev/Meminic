require("dotenv").config();
const express = require("express");
const sequelize = require("./database/database.js");
const app = express();
const cors = require("cors");
const User = require("./database/models/user.js");
const Store = require("./database/models/store.js");
const KardexProduct = require("./database/models/kardexProduct.js");

app.use(express.json());
app.use(cors());

//Running server
const PORT = process.env.DEVPORT || 5000;

//Configuring models
Store.hasMany(User, { as: "Employee" });
User.belongsTo(Store, {as: "Store"});

Store.hasMany(KardexProduct, { as: "Product" });
KardexProduct.belongsTo(Store, {as: "Store"});



//Creates a new store in the database
app.post("/createStore", async (req, res) => {
  const store = await Store.create();
  console.log("Store created");
  res.status(201).send(store);
});

//Creates a new user as the admin of a store created before in the database
app.post("/createUser", async (req, res) => {
  const store = await Store.findByPk(req.body.store);
  const user = await User.create({
    email: req.body.email,
    role: "Administrador",
    state: true,
  });
  //Links the user with their store, setting the store_id in User table
  store.addEmployee(user);
  console.log("User created");
  res.status(201).send({
    message: "User created",
    data: user,
  });
});

//Creates a new product in the database
app.post("/addProduct", async (req, res) => {
  const store = await Store.findByPk(req.body.store);
  const product = await KardexProduct.create({
    idKardex: req.body.idKardex,
    reference: req.body.reference,
    productName: req.body.productName,
    location: req.body.location,
    supplier : req.body.supplier,
    minimumAmount: req.body.minimumAmount,
    maximumAmount : req.body.maximumAmount
  }
  );
  store.addProduct(product);
  console.log("Product created");
  res.status(201).send(product);
});


//Updates the fields of a product in the database
app.post("/updateProduct", async (req, res) => {
  const product = await KardexProduct.findByPk(req.body.idKardex);
  //Some verifications are done to update only the fields the user intended to
  if (req.body.reference !== "") {
    product.reference = req.body.reference;
  }
  if (req.body.productName !== "") {
    product.productName = req.body.productName;
  }
  if (req.body.location !== "") {
    product.location = req.body.location;
  }
  if (req.body.supplier !== "") {
    product.supplier = req.body.supplier;
  }
  if (req.body.minimumAmount !== "") {
    product.minimumAmount = req.body.minimumAmount;
  }
  if (req.body.maximumAmount !== "") {
    product.maximumAmount = req.body.maximumAmount;
  }
  await product.save();
  console.log("Product updated");
  res.status(201).send(product);
});


//Searches for a product in the db 
app.post("/searchProduct", async (req, res) => {
  const product = await KardexProduct.findByPk(req.body.idKardex);
  res.status(201).send(product);
});



//Adds a user to and already existent store
app.post("/addUser", async (req, res) => {
  const store = await Store.findByPk(req.body.store);
  const user = await User.create({
    email: req.body.email,
    role: req.body.role,
    state: true,
  });
  //Links the user with their store, setting the store_id in User table
  store.addEmployee(user);
  console.log("User created");
  res.status(201).send({
    message: "User created",
    data: user,
  });
});


//Updates user fields in the database
app.post("/updateUser", async (req, res) => {
  var state = true;
  const user = await User.findByPk(req.body.email);
  if(req.body.state === "Inactivo"){
      state = false;
  }
  user.role = req.body.role ;
  user.state = state;
  await user.save();
  console.log("User updated");
  res.status(201).send({
    message: "User updated",
    data: user,
  });
});


//Searches an user in database
app.post("/searchUser", async (req, res) => {
  const user = await User.findByPk(req.body.email);
  res.status(201).send(user);
});


//Returns the workers of a store 
app.post("/getWorkers", async (req, res) => {
  const store = await Store.findByPk(req.body.storeId);
  console.log("Store found:" ,store);
  const workers = await store.getEmployee( );
  res.status(201).send(workers);
});

//Returns the products of a store 
app.post("/getProducts", async (req, res) => {
  const store = await Store.findByPk(req.body.storeId);
  console.log("Store found:" ,store);
  const products = await store.getProduct( );
  res.status(201).send(products);
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
    .sync()
    .then(() => {
      console.log("Database connected");
    })
    .catch((error) => {
      console.log("Unable to connect to database: ", error);
    });
});

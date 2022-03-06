require("dotenv").config();
const express = require("express");
const sequelize = require("./database/database.js");
const app = express();
const cors = require("cors");
const { Op } = require("sequelize");
const User = require("./database/models/user.js");
const Store = require("./database/models/store.js");
const Product = require("./database/models/product.js");
const Movement = require("./database/models/movements.js");
app.use(express.json());
app.use(cors());

//Running server
const PORT = process.env.DEVPORT || 5000;

//Configuring models
Store.hasMany(User, { as: "Employee" });
//It creates a 1 to 1 relationship between User and Store
User.belongsTo(Store, { as: "Store" });
Store.hasMany(Product, { as: "Product" });
Product.belongsTo(Store, { as: "Store" });
Product.hasMany(Movement, { as: "Movement" });
Movement.belongsTo(Product, { as: "Product" });

// ================================== Store ============================================
//Creates a new store in the database
app.post("/createStore", async (req, res) => {
  const store = await Store.create();
  console.log("Store created");
  res.status(201).send(store);
});

//Return the workers of a the current store where user belongs
app.post("/getWorkers", async (req, res) => {
  const store = await Store.findByPk(req.body.storeId);
  console.log("Store found:", store);
  const workers = await store.getEmployee();
  res.status(201).send(workers);
});

// ===================================== Users ====================================

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
  if (req.body.state === "Inactivo") {
    state = false;
  }
  user.role = req.body.role;
  user.state = state;
  await user.save();
  console.log("User updated");
  res.status(201).send({
    message: "User updated",
    data: user,
  });
});

//Searches an user in database
//Search user in database
app.post("/searchUser", async (req, res) => {
  const user = await User.findByPk(req.body.email);
  res.status(201).send(user);
});

// ================================== Products ======================================

//Creates a new product in the database
app.post("/addProduct", async (req, res) => {
  const store = await Store.findByPk(req.body.store);
  const product = await Product.create({
    idKardex: req.body.idKardex,
    reference: req.body.reference,
    productName: req.body.productName,
    location: req.body.location,
    supplier: req.body.supplier,
    minimumAmount: req.body.minimumAmount,
    maximumAmount: req.body.maximumAmount,
    available: true,
  });
  store.addProduct(product);
  console.log("Product created");
  res.status(201).send(product);
});

//Updates the fields of a product in the database
app.post("/updateProduct", async (req, res) => {
  const product = await Product.findByPk(req.body.idKardex);
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
  if (req.body.available === "No disponible") {
    product.available = false;
  }
  if (req.body.available === "Disponible") {
    product.available = true;
  }
  await product.save();
  console.log("Product updated");
  res.status(201).send(product);
});

//Searches for a product in the db
app.post("/searchProduct", async (req, res) => {
  const product = await Product.findByPk(req.body.idKardex);
  res.status(201).send(product);
});

//Returns the products of a store
app.post("/getProducts", async (req, res) => {
  const store = await Store.findByPk(req.body.storeId);
  console.log("Store found:", store);
  const products = await store.getProduct();
  res.status(201).send(products);
});

// ===================================== Movements ==================================

/**
 * Consulta que se encarga de añadir el inventario inicial a la tabla de movimientos
 */

app.post("/addInitialInventory", async (req, res) => {
  const product = await Product.findByPk(req.body.idProduct);
  const movement = await Movement.create({
    date: new Date(),
    accSupport: req.body.accSupport,
    movementType: "Inventario inicial",
    unitValue: req.body.unitValue,
    weightedValue: req.body.unitValue,
    inputAmount: req.body.inputAmount,
    inputValue: req.body.unitValue * req.body.inputAmount,
    balanceAmount: req.body.inputAmount,
    balanceValue: req.body.unitValue * req.body.inputAmount,
  });
  //foreign key
  product.addMovement(movement);
  console.log("Initial inventory added");
  res.status(201).send(movement);
});

/**
 * Consulta que se encarga de añadir una venta a la tabla de movimientos
 */

app.post("/addSale", async (req, res) => {
  const product = await Product.findOne({
    where: { productName: req.body.productName },
  });
  var lastMovement = await Movement.findAll({
    where: { productIdKardex: product.idKardex },
    limit: 1,
    order: [["updatedAt", "DESC"]],
  });
  lastMovement = lastMovement[0];
  const weightedValue = lastMovement.weightedValue;
  const unitValue = lastMovement.unitValue;
  const outputAmount = req.body.outputAmount;
  const outputValue = outputAmount * lastMovement.weightedValue;
  const balanceAmount = lastMovement.balanceAmount - outputAmount;
  const balanceValue = lastMovement.balanceValue - outputValue;
  const movement = await Movement.create({
    date: new Date(),
    accSupport: req.body.accSupport,
    movementType: "Venta",
    unitValue: unitValue,
    weightedValue: weightedValue,
    outputAmount: outputAmount,
    outputValue: outputValue,
    balanceAmount: balanceAmount,
    balanceValue: balanceValue,
  });
  //foreign key
  product.addMovement(movement);
  console.log("sale added");
  res.status(201).send(movement);
});

/**
 * Consulta que verifica si las existencias de los productos
 * son suficientes para realizar la venta
 */
app.post("/addSaleVerification", async (req, res) => {
  var isPossible = true;
  var productNotEnough = { index: 0 };
  for (let i = 0; i < req.body.data.length; i++) {
    const product = await Product.findOne({
      where: { productName: req.body.data[i].name },
    });
    var lastMovement = await Movement.findAll({
      where: { productIdKardex: product.idKardex },
      limit: 1,
      order: [["updatedAt", "DESC"]],
    });
    lastMovement = lastMovement[0];
    const balanceAmount = lastMovement.balanceAmount - req.body.data[i].amount;
    if (balanceAmount < 0) {
      isPossible = false;
      productNotEnough = { index: i };
    }
  }
  if (isPossible === true) {
    res.status(201).send(isPossible);
  } else {
    res.status(201).send({ productNotEnough });
  }
});

/**
 * Consulta que se encarga de añadir una compra a la tabla de movimientos
 */

app.post("/addPurchase", async (req, res) => {
  const product = await Product.findOne({
    where: { productName: req.body.productName },
  });
  var lastMovement = await Movement.findAll({
    where: { productIdKardex: product.idKardex },
    limit: 1,
    order: [["updatedAt", "DESC"]],
  });
  lastMovement = lastMovement[0];
  //Valor de saldo anterior + cantidad actual * valor unitariofalta la division, y este seria el ponderado no?
  const weightedValue =
    (lastMovement.balanceValue + req.body.inputAmount * req.body.unitValue) /
    (lastMovement.balanceAmount + req.body.inputAmount);
  const unitValue = req.body.unitValue;
  const inputAmount = req.body.inputAmount;
  // valor de entrada = cantidad ingresada * valor unitario ingresado
  const inputValue = req.body.inputAmount * req.body.unitValue;
  const balanceAmount = lastMovement.balanceAmount + req.body.inputAmount;
  const balanceValue = lastMovement.balanceValue + inputValue;
  const movement = await Movement.create({
    date: new Date(),
    movementType: "Compra",
    unitValue: unitValue,
    accSupport: req.body.accSupport,
    weightedValue: weightedValue,
    inputAmount: inputAmount,
    inputValue: inputValue,
    balanceAmount: balanceAmount,
    balanceValue: balanceValue,
  });
  //foreign key
  product.addMovement(movement);
  console.log("purchase added");
  res.status(201).send(movement);
});

app.post("/addReturnSale", async (req, res) => {
  const product = await Product.findOne({
    where: { productName: req.body.productName },
  });
  var movementaccSupport = await Movement.findAll({
    where: {
      [Op.and]: [
        { accSupport: req.body.accSupport },
        { productIdKardex: product.idKardex },
      ],
    },
    limit: 1,
    order: [["updatedAt", "DESC"]],
  });
  var lastMovement = await Movement.findAll({
    where: { productIdKardex: product.idKardex },
    limit: 1,
    order: [["updatedAt", "DESC"]],
  });
  lastMovement = lastMovement[0];
  movementaccSupport = movementaccSupport[0];
  const unitValue = movementaccSupport.unitValue;
  // Valor saldo anterior + cantidad ingresada * costo del producto cuando realizó la venta
  const weightedValue =
    (lastMovement.balanceValue +
      req.body.outputAmount * movementaccSupport.unitValue) /
    (lastMovement.balanceAmount + req.body.outputAmount);
  // Cantidad a devolver
  const outputAmount = req.body.outputAmount;
  // Valor unitario por el cual fue vendido el producto * cantidad ingresada
  const outputValue = movementaccSupport.unitValue * outputAmount;
  // Cantidad ingresada + cantidad anterior
  const balanceAmount = lastMovement.balanceAmount + outputAmount;
  // Cantidad ingresada * valor promedio ponderado
  const balanceValue = balanceAmount * weightedValue;
  const movement = await Movement.create({
    date: new Date(),
    movementType: "Devolución de venta",
    accSupport: movementaccSupport.accSupport,
    unitValue: unitValue,
    weightedValue: weightedValue,
    outputAmount: outputAmount,
    outputValue: outputValue,
    balanceAmount: balanceAmount,
    balanceValue: balanceValue,
  });
  //foreign key
  product.addMovement(movement);
  console.log("Return sale added");
  res.status(201).send(movement);
});

/**
 * Consulta que se encarga de añadir una devolucion de compra a la tabla de movimientos
 */
app.post("/addReturnPurchase", async (req, res) => {
  const product = await Product.findOne({
    where: { productName: req.body.productName },
  });
  var accSupportMovement = await Movement.findAll({
    where: {
      [Op.and]: [
        { accSupport: req.body.accSupport },
        { productIdKardex: product.idKardex },
      ],
    },
    limit: 1,
    order: [["updatedAt", "DESC"]],
  });
  accSupportMovement = accSupportMovement[0];

  var lastMovement = await Movement.findAll({
    where: { productIdKardex: product.idKardex },
    limit: 1,
    order: [["updatedAt", "DESC"]],
  });
  lastMovement = lastMovement[0];
  //Valor de saldo anterior - cantidad actual * valor unitario
  const weightedValue =
    (lastMovement.balanceValue -
      req.body.outputAmount * accSupportMovement.unitValue) /
    (lastMovement.balanceAmount - req.body.outputAmount);
  const unitValue = accSupportMovement.unitValue;
  const inputAmount = req.body.outputAmount;
  // valor de entrada = cantidad ingresada * valor unitario registrado en el movimiento
  //correspondiente a la factura de compra
  const inputValue = req.body.outputAmount * accSupportMovement.unitValue;
  const balanceAmount = lastMovement.balanceAmount - req.body.outputAmount;
  const balanceValue = weightedValue * balanceAmount;
  const movement = await Movement.create({
    date: new Date(),
    movementType: "Devolución de compra",
    accSupport: req.body.accSupport,
    unitValue: unitValue,
    weightedValue: weightedValue,
    inputAmount: inputAmount,
    inputValue: inputValue,
    balanceAmount: balanceAmount,
    balanceValue: balanceValue,
  });
  //foreign key
  product.addMovement(movement);
  console.log("return purchase added");
  res.status(201).send(movement);
});

/**
 * Consulta que verifica si la factura ingresada se encuentra ya en
 * la base de datos
 */
app.post("/addReturnVerification", async (req, res) => {
  var isPossible = true;
  for (let i = 0; i < req.body.data.length; i++) {
    const product = await Product.findOne({
      where: { productName: req.body.data[i].name },
    });
    var movementaccSupport = await Movement.findAll({
      where: {
        [Op.and]: [
          { accSupport: req.body.data[i].accSupport },
          { productIdKardex: product.idKardex },
        ],
      },
      limit: 1,
      order: [["updatedAt", "DESC"]],
    });
    if (movementaccSupport.length === 0) {
      isPossible = false;
    }
  }
  res.status(201).send(isPossible);
});

// ===================================== Reports =======================================

app.post("/salesByMonth", async (req, res) => {
  // find the user
  const user = await User.findByPk(req.body.email);
  // //find the id of a store
  const store = await Store.findByPk(user.dataValues.storeStoreId);
  // // get the products of the current store
  // const products = await store.getProduct();
  const products = await Product.findAll({
    distinct: true,
    where: { storeStoreId: store.dataValues.store_id },
  });
  // get all movements of the current store
  // var movement;
  // for (let j = 0; j < products.length; j++) {
  //   movement = await products[j].getMovement();
  // for (let i = 0; i < products.length; i++) {
  //   var salesByMonthData = await Product.findAll({
  //     include: { model: Movement, as: "Movement" },
  //     where: {
  //       [Op.and]: [
  //         { idKardex: products[i].dataValues.idKardex },
  //         { storeStoreId: user.dataValues.storeStoreId },
  //         { movementType: "Venta" },
  //       ],
  //     },
  //   });
  // }

  console.log(
    "================================================ movimientos ===============================",
    products[0].dataValues.idKardex,
    user.dataValues.storeStoreId
  );
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

import axios from "axios";
import { useState } from "react";
import Auth0Hook from "../hooks/Auth0Hook";

const UserContext = () => {
  const [isAdmin, setIsAdmin] = useState(false);
  const { user } = Auth0Hook();
  /**
   * This function creates a new store in the database
   * @param {}
   */
  const saveDataStore = async () => {
    try {
      const store = await axios.post("http://localhost:5000/createStore", {});
      return store;
    } catch (error) {
      console.log("error");
    }
  };
  /**
   * This function creates a new user as an admin of a store that is already created
   * @param {} id
   * @param {*} email
   */
  const saveDataUser = async (id) => {
    try {
      await axios.post("http://localhost:5000/createUser", {
        email: user.email,
        store: id,
      });
    } catch (error) {
      console.log("error");
    }
  };

  /**
   * This function add a new user to an already existent store
   *
   */
  const addUser = async (newUser, id) => {
    try {
      await axios.post("http://localhost:5000/addUser", {
        email: newUser.Email,
        role: newUser.Rol,
        store: id,
      });
    } catch (error) {
      console.log("error");
    }
  };

  /**
   * This function updates the given user
   *
   */
  const updateUser = async (data) => {
    try {
      await axios.post("http://localhost:5000/updateUser", {
        email: data.Email,
        role: data.Rol,
        state: data.Estado,
      });
    } catch (error) {
      console.log("error");
    }
  };

  /**
   * This function searchs an user
   * @param {*} email
   */
  const searchUser = async (email) => {
    try {
      const userFound = await axios.post("http://localhost:5000/searchUser", {
        email: email,
      });
      return userFound;
    } catch (error) {
      console.log("error");
    }
  };

  /**
   * This function gets the workers of a store
   * @param {*} id
   */
  const getWorkers = async (id) => {
    try {
      const workers = await axios.post("http://localhost:5000/getWorkers", {
        storeId: id,
      });
      return workers;
    } catch (error) {
      console.log("error");
    }
  };


  /**
   * This function adds a new product in the db associated with its store
   * @param {*} id
   */
   const addProduct = async (data, store) => {
    try {
      const product = await axios.post("http://localhost:5000/addProduct", {
        store: store,
        idKardex: data.Identificador,
        reference: data.Referencia,
        productName: data.Nombre,
        location: data.Localización,
        supplier: data.Proveedor,
        minimumAmount: data["Cantidad minima"],
        maximumAmount: data["Cantidad maxima"],
      });
      console.log("Product added")
      return product;
    } catch (error) {
      console.log("error");
    }
  };

  /**
   * This function verifies if a user is already in the database
   * If the user is not in database, it creates a new store the user will be linked to.
   * If a new store was created, this creates a new user in the database, as the store's admin.
   * @param{}
   */
  const verifyUser = async () => {
    await axios
      .post("http://localhost:5000/searchUser", {
        email: user.email,
      })
      .then(function (response) {
        if (response.data === "") {
          return saveDataStore();
        }
      })
      .then(function (response) {
        if (typeof response !== "undefined") {
          saveDataUser(response.data.store_id);
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  /**
   * Función que se encarga de verificar que el rol, si este retorna true, es porque
   * es un administrador, de lo contrario es un vendedor
   * @param {}
   */

  const verifyUserForUI = async () => {
    await axios
      .post("http://localhost:5000/searchUser", {
        email: user.email,
      })
      .then(function (response) {
        if (response.data.role === "Administrador") {
          setIsAdmin(true);
        } else {
          setIsAdmin(false);
        }
      })
      .catch(function (error) {
        console.log(error);
      });
    return isAdmin;
  };
  const readResult = async () => {
    const booleanAdmin = await verifyUserForUI();
    console.log(booleanAdmin);
  };
  return {
    saveDataStore,
    saveDataUser,
    verifyUser,
    searchUser,
    addUser,
    updateUser,
    getWorkers,    
    verifyUserForUI,
    readResult,
    isAdmin,
    searchUser, 
    addUser, 
    updateUser, 
    getWorkers,
    addProduct
  };
};

export default UserContext;

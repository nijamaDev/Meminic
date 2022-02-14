import axios from "axios";
import Auth0Hook from "../hooks/Auth0Hook";

const UserContext = () => {
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
        state:  data.Estado,
      });
    } catch (error) {
      console.log("error");
    }
  };


  const searchUser = async (email) => {
    try {
      const userFound = await axios
      .post("http://localhost:5000/searchUser", {
        email: email,
      });
      return userFound;
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

  return { saveDataStore, saveDataUser, verifyUser ,searchUser, addUser, updateUser};
};

export default UserContext;

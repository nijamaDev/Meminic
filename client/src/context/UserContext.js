import axios from "axios";
/**
 * This function creates a new store in the database
 * @param {}
 */
export const saveDataStore = async () => {
  try {
    const store = await axios.post("http://localhost:5000/createStore");
    return store;
  } catch (error) {
    console.log("Could not create a store");
  }
};
/**
 * This function creates a new user as an admin of a store that is already created
 * @param {} id
 * @param {*} email
 */
export const saveDataUser = async (id, email) => {
  try {
    await axios.post("http://localhost:5000/createUser", {
      email: email,
      store: id,
    });
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
export const verifyUser = async (email) => {
  await axios
    .post("http://localhost:5000/searchUser", {
      email: email,
    })
    .then(function (response) {
      if (response.data === "") {
        return saveDataStore();
      }
    })
    .then(function (response) {
      if (typeof response !== "undefined") {
        saveDataUser(response.data.store_id, email);
      }
    })
    .catch(function (error) {
      console.log(error);
    });
};

import axios from "axios";
const ProductContext = () => {
  /**
   * This function gets the workers of a store
   * @param {*} id
   */
   const getProducts = async (id) => {
    try {
      const products = await axios.post("http://localhost:5000/getProducts", {
        storeId: id,
      });
      return products;
    } catch (error) {
      console.log("error");
    }
  };

  /**
   * This function adds a new product in the db associated with its store
   * @param {*} data
   *@param {*} store
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
      console.log("Product added");
      return product;
    } catch (error) {
      console.log("error");
    }
  };

  /**
   * This function updates the information of a product
   * @param {*} data
   */
  const updateProduct = async (data) => {
    try {
      const product = await axios.post("http://localhost:5000/updateProduct", {
        idKardex: data.Identificador,
        reference: data.Referencia,
        productName: data.Nombre,
        location: data.Localización,
        supplier: data.Proveedor,
        minimumAmount: data["Cantidad minima"],
        maximumAmount: data["Cantidad maxima"],
        available: data.Estado,
      });
      console.log("Product updated");
      return product;
    } catch (error) {
      console.log("error");
    }
  };

  /**
   * This function searches a product in the db
   * @param {*} id
   */
  const searchProduct = async (id) => {
    try {
      const product = await axios.post("http://localhost:5000/searchProduct", {
        idKardex: id,
      });
      return product;
    } catch (error) {
      console.log("error");
    }
  };

return {
    getProducts,
    addProduct,
    updateProduct,
    searchProduct
}
}

export default ProductContext
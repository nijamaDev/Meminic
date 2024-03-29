import axios from "axios";
const ProductContext = () => {
  /**
   * This function gets the products of a store
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
        minimumAmount: data["Cantidad mínima"],
        maximumAmount: data["Cantidad máxima"],
      });
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
   * This function searches a product in the database
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

  const addInitialInventory = async (data, idProduct) => {
    try {
      const initialInventory = await axios.post(
        "http://localhost:5000/addInitialInventory",
        {
          accSupport: data["No de Factura"],
          unitValue: data["Valor unitario inicial"],
          inputAmount: data["Cantidad inicial"],
          idProduct: idProduct,
        }
      );
      console.log("initial inventory added");
      return initialInventory;
    } catch (error) {
      console.log("error");
    }
  };

  return {
    getProducts,
    addProduct,
    updateProduct,
    searchProduct,
    addInitialInventory,
  };
};

export default ProductContext;

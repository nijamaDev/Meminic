import axios from "axios";

const MovementContext = () => {
  const addSale = async (data) => {
    try {
      const sale = await axios.post("http://localhost:5000/addSale", {
        productName: data.name,
        outputAmount: data.amount,
        accSupport: data.accSupport,
      });
      return sale;
    } catch (error) {
      console.log("error");
    }
  };

  const addSaleVerification = async (data) => {
    try {
      const saleVeritication = await axios.post(
        "http://localhost:5000/addSaleVerification",
        {
          data,
        }
      );
      return saleVeritication;
    } catch (error) {
      console.log("error");
    }
  };

  const addPurchase = async (data) => {
    try {
      const purchase = await axios.post("http://localhost:5000/addPurchase", {
        productName: data.name,
        inputAmount: data.amount,
        unitValue: data.unitValue,
        accSupport: data.accSupport,
      });
      return purchase;
    } catch (error) {
      console.log("error");
    }
  };

  /**
   * Función asíncrona que se encarga de realizar la consulta addReturnSale
   * definida en el server
   * @param {*} data
   * @returns {Promise}
   */
  const addReturnSale = async (data) => {
    try {
      const returnSale = await axios.post(
        "http://localhost:5000/addReturnSale",
        {
          productName: data.name,
          outputAmount: data.amount,
          accSupport: data.accSupport,
        }
      );
      return returnSale;
    } catch (error) {
      console.log("error");
    }
  };
  /**
   * Función que se encarga de llamar a la consulta returnVerification
   * @param {*} data
   * @returns {Promise}
   */
  const addReturnVerification = async (data) => {
    try {
      const returnVerification = await axios.post(
        "http://localhost:5000/addReturnVerification",
        {
          data,
        }
      );
      
      return returnVerification;
    } catch (error) {
      console.log("error");
    }
  };

  return {
    addSale,
    addSaleVerification,
    addPurchase,
    addReturnSale,
    addReturnVerification,
  };
};

export default MovementContext;

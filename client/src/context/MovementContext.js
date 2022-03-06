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


  const addReturnPurchaseVerification = async (data) => {
    try {
      const returnPurchaseVeritication = await axios.post(
        "http://localhost:5000/addReturnPurchaseVerification",
        {
          data,
        }
      );
      return returnPurchaseVeritication;
    } catch (error) {
      console.log("error");
    }
  };

  const addReturnPurchase = async (data) => {
    try {
      const returnPurchase = await axios.post("http://localhost:5000/addReturnPurchase", {
        productName: data.name,
        outputAmount: data.amount,
        accSupport: data.accSupport,
      });
      return returnPurchase;
    } catch (error) {
      console.log("error");
    }
  };

  return {
    addSale,
    addSaleVerification,
    addPurchase,
    addReturnPurchase,
    addReturnPurchaseVerification
  };
};

export default MovementContext;

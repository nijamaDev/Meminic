import axios from "axios";

const MovementContext = () => {
  const addSale = async (data) => {
    try {
      const sale = await axios.post("http://localhost:5000/addSale", {
        productName: data.name,
        outputAmount: data.amount,
        accSupport : data.accSupport
      });
      return sale;
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
        accSupport : data.accSupport
      });
      return purchase;
    } catch (error) {
      console.log("error");
    }
  };
  return {
    addSale,
    addPurchase,
  };
};

export default MovementContext;

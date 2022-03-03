import axios from "axios";

const MovementContext = () => {
  const addSale = async (data) => {
    try {
      const sale = await axios.post("http://localhost:5000/addSale", {
        productName: data.name,
        outputAmount: data.amount,
      });
      return sale;
    } catch (error) {
      console.log("error");
    }
  };
  // const addPurchase = async (data) => {
  //   try {
  //     const sale = await axios.post("http://localhost:5000/addPurchase", {
  //       productName: data.name,
  //       outputAmount: data.amount,
  //     });
  //     return sale;
  //   } catch (error) {
  //     console.log("error");
  //   }
  // };
  return {
    addSale,
  };
};

export default MovementContext;

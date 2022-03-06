import MovementContext from "../../../context/MovementContext";

const MovementAddPurchaseEvents = () => {
  const { addPurchase } = MovementContext();
  const onClickRegisterPurchase = (productsList) => {
    for(let i = 0; i < productsList.length; i++){
        if(productsList[i].unitValue <= 0){
            return false;
        }
    }
    productsList.map((product) => {
      return addPurchase(product);
    });
    return true;
  };

  return { onClickRegisterPurchase };
};

export default MovementAddPurchaseEvents;

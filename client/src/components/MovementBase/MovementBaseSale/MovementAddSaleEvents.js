import MovementContext from "../../../context/MovementContext";

const MovementAddSaleEvents = () => {
  const { addSale } = MovementContext();

  const onClickRegisterSale = (productsList) => {
    productsList.map((product) => {
      return addSale(product);
    });

    return true;
  };

  return { onClickRegisterSale };
};

export default MovementAddSaleEvents;

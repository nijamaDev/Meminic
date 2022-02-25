import { useState } from "react";
import ProductContext from "../../context/ProductContext";
import UserContext from "../../context/UserContext";
import Auth0Hook from "../../hooks/Auth0Hook";

const ProductReadTableEvents = () => {
  const { user } = Auth0Hook();
  const { searchUser } = UserContext();
  const { getProducts } = ProductContext();
  const [isClicked, setIsClicked] = useState(false);
  const [productsList, setProductsList] = useState([]);

  const onClickProductsTable = () =>
    searchUser(user.email).then(function (response) {
      getProducts(response.data.storeStoreId).then(function (response) {
        setProductsList(response.data);
        return response;
      });
      setIsClicked(!isClicked);
    });
  return { onClickProductsTable, productsList, isClicked };
};

export default ProductReadTableEvents;

import { useState } from "react";
import UserContext from "../../context/UserContext";
import Auth0Hook from "../../hooks/Auth0Hook";

const ProductReadTableEvents = () => {
  const { user } = Auth0Hook();
  const { searchUser, getProducts } = UserContext();
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

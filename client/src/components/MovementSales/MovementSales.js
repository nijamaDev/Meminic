import SearchBar from "../SearchBar/SearchBar";
import ProductContext from "../../context/ProductContext";
import UserContext from "../../context/UserContext";
import Auth0Hook from "../../hooks/Auth0Hook";
import { rowTitleSales } from "./rowTitlesSales";
import { useState } from "react";

const MovementSales = () => {
  const { getProducts } = ProductContext();
  const { searchUser } = UserContext();
  const { user } = Auth0Hook();
  const [productDataArray, setProductDataArray] = useState();
  const [getData, setGetDate] = useState(true);
  const productsData = async () => {
    searchUser(user.email).then(function (response) {
      getProducts(response.data.storeStoreId).then(function (res) {
        setProductDataArray(res.data);
        setGetDate(false);
        return res.data;
      });
    });
  };
  if (getData) {
    productsData();
  }

  return (
    <div>
      <SearchBar
        placeholder="Ingresa el nombre del producto"
        data={productDataArray}
        rowTitles={rowTitleSales}
      />
    </div>
  );
};

export default MovementSales;

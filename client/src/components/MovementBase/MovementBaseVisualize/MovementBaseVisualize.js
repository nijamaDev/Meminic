import SearchBarVisualize from "../../SearchBar/SearchBarVisualize/SearchBarVisualize";
import ProductContext from "../../../context/ProductContext";
import UserContext from "../../../context/UserContext";
import Auth0Hook from "../../../hooks/Auth0Hook";
import { rowTitleVisualize } from "./rowTitlesVisualize";
import { useState } from "react";
import "../MovementBase.css";
import { useNavigate } from "react-router-dom";
import { InitialMovements } from "../initialMovements";
import "./MovementBaseVisualize.css";
var productsList = [];

const MovementBaseVisualize = ({ title, messageRegister, modalTitle }) => {
  const { getProducts } = ProductContext();
  const { searchUser } = UserContext();
  const { user } = Auth0Hook();
  const [productDataArray, setProductDataArray] = useState();
  const [getData, setGetDate] = useState(true);
  const navigate = useNavigate();

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
    <div className="movements__visualize_container">
      <h1 className="movements__title">{title}</h1>
      <SearchBarVisualize
        placeholder="Ingresa el nombre del producto"
        data={productDataArray}
        rowTitles={rowTitleVisualize}
        resultsArray={productsList}
        initialMovements={InitialMovements}
      />
      <div className="movements__button_container">
        <button
          onClick={() => navigate("/users")}
          className="movements__button__cancel"
        >
          Regresar
        </button>
      </div>
    </div>
  );
};

export default MovementBaseVisualize;

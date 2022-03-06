import SearchBarPurchase from "../../SearchBar/SearchBarPurchase/SearchBarPurchase";
import ProductContext from "../../../context/ProductContext";
import UserContext from "../../../context/UserContext";
import Auth0Hook from "../../../hooks/Auth0Hook";
import { rowTitlePurchase } from "./rowTitlesPurchase";
import { useState } from "react";
import "../MovementBase.css";
import Modal from "../../Modal/Modal";
import check_icon from "../../../assets/check_icon.svg";
import { useNavigate } from "react-router-dom";
import { InitialProducts } from "../initialProducts";
var productsList = [];

const MovementBasePurchase = ({ title, onClickEvent, message, modalTitle }) => {
  const { getProducts } = ProductContext();
  const { searchUser } = UserContext();
  const { user } = Auth0Hook();
  const [productDataArray, setProductDataArray] = useState();
  const [getData, setGetDate] = useState(true);
  const [addMovement, setAddMovement] = useState(false);
  const [addLabelError, setAddLabelError] = useState(false);
  const navigate = useNavigate();
  const OnClickModalAndEvent = (array) => {
    if (onClickEvent(array) === true) {
      productsList = [];
      setAddMovement(true);
      setAddLabelError(false);
    } else {
      setAddLabelError(true);
      setAddMovement(false);
    }
  };
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
    <div className="movements__container">
      <h1 className="movements__title">{title}</h1>
      <SearchBarPurchase
        placeholder="Ingresa el nombre del producto"
        data={productDataArray}
        rowTitles={rowTitlePurchase}
        resultsArray={productsList}
        initialProducts={InitialProducts}
      />
      {addLabelError ? (
        <label className="movements__label">
          El valor unitario no es válido
        </label>
      ) : (
        <></>
      )}
      <div className="movements__button_container">
        <button
          onClick={() => navigate("/")}
          className="movements__button__cancel"
        >
          Regresar
        </button>
        <button
          className="movements__button__register"
          onClick={() => OnClickModalAndEvent(productsList)}
        >
          Registrar
        </button>
      </div>

      {addMovement ? (
        <Modal
          message={message}
          textButton={"Aceptar"}
          title={modalTitle}
          iconURL={check_icon}
          altImg={"check"}
          onClickEvent={() => setAddMovement(!addMovement)}
        ></Modal>
      ) : (
        <></>
      )}
    </div>
  );
};

export default MovementBasePurchase;

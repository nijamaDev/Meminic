import SearchBarSale from "../../SearchBar/SearchBarSale/SearchBarSale";
import ProductContext from "../../../context/ProductContext";
import UserContext from "../../../context/UserContext";
import Auth0Hook from "../../../hooks/Auth0Hook";
import { rowTitlesReturnPurchase } from "./rowTitlesReturnPurchase";
import { useState } from "react";
import "../MovementBase.css";
import Modal from "../../Modal/Modal";
import check_icon from "../../../assets/check_icon.svg";
import error_icon from "../../../assets/error_icon.svg";
import { useNavigate } from "react-router-dom";
import { InitialProducts } from "../InitialProducts";
import MovementContext from "../../../context/MovementContext";
var productsList = [];

const MovementBaseReturnPurchase = ({ title, messageRegister, modalTitle }) => {
  const { getProducts } = ProductContext();
  const { searchUser } = UserContext();
  const { user } = Auth0Hook();
  const [productDataArray, setProductDataArray] = useState();
  const [getData, setGetDate] = useState(true);
  const [addMovement, setAddMovement] = useState(false);
  const [isNotPosible, setIsNotPosible] = useState(false);
  // const [productNameNotEnough, setProductNameNotEnough] = useState("");
  const { addReturnPurchase, addReturnVerification } = MovementContext();
  const navigate = useNavigate();
  const onClickRegisterReturnPurchase = (array) => {
    addReturnVerification(array).then(function (response) {
      if (response.data === true) {
        array.map((product) => {
          return addReturnPurchase(product);
        });
        productsList = [];
        setAddMovement(true);
        setIsNotPosible(false);
        return true;
      } else {
        setIsNotPosible(true);
        return response;
      }
    });
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
      <SearchBarSale
        placeholder="Ingresa el nombre del producto"
        data={productDataArray}
        rowTitles={rowTitlesReturnPurchase}
        resultsArray={productsList}
        initialProducts={InitialProducts}
      />
      <div className="movements__button_container">
        <button
          onClick={() => navigate("/users")}
          className="movements__button__cancel"
        >
          Regresar
        </button>
        <button
          className="movements__button__register"
          onClick={() => onClickRegisterReturnPurchase(productsList)}
        >
          Registrar
        </button>
      </div>
      {addMovement ? (
        <Modal
          message={messageRegister}
          textButton={"Aceptar"}
          title={modalTitle}
          iconURL={check_icon}
          altImg={"check"}
          onClickEvent={() => setAddMovement(!addMovement)}
        ></Modal>
      ) : (
        <></>
      )}
      {isNotPosible ? (
        <Modal
          message={
            "Verifique el número de factura o la cantidad de existencias"
          }
          textButton={"Aceptar"}
          title="Devolución de compra no registrada"
          iconURL={error_icon}
          altImg={"error"}
          onClickEvent={() => setIsNotPosible(!isNotPosible)}
        ></Modal>
      ) : (
        <></>
      )}
    </div>
  );
};

export default MovementBaseReturnPurchase;

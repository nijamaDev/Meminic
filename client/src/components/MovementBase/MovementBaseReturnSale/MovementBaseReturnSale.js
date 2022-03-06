import SearchBarSale from "../../SearchBar/SearchBarSale/SearchBarSale";
import ProductContext from "../../../context/ProductContext";
import UserContext from "../../../context/UserContext";
import Auth0Hook from "../../../hooks/Auth0Hook";
import { rowTitleSales } from "../MovementBaseSale/rowTitlesSales";
import { useState } from "react";
import "../MovementBase.css";
import Modal from "../../Modal/Modal";
import check_icon from "../../../assets/check_icon.svg";
import error_icon from "../../../assets/error_icon.svg";
import { useNavigate } from "react-router-dom";
import { InitialProducts } from "../initialProducts";
import MovementContext from "../../../context/MovementContext";
var productsList = [];

const MovementBaseReturnSale = ({
  title,
  messageRegister,
  messageError,
  modalTitle,
  modalTitleError,
}) => {
  const { getProducts } = ProductContext();
  const { searchUser } = UserContext();
  const { user } = Auth0Hook();
  const [productDataArray, setProductDataArray] = useState();
  const [getData, setGetDate] = useState(true);
  const [addMovement, setAddMovement] = useState(false);
  const [addMovementError, setAddMovementError] = useState(false);
  const navigate = useNavigate();
  const { addReturnSale, addReturnVerification } = MovementContext();
  const onClickRegisterReturnSale = (array) => {
    addReturnVerification(array).then(function (response) {
      if (response.data) {
        array.map((product) => {
          return addReturnSale(product);
        });
        productsList = [];
        setAddMovement(true);
        setAddMovementError(false);
        return true;
      }
      setAddMovementError(true);
      return response;
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
        rowTitles={rowTitleSales}
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
          onClick={() => onClickRegisterReturnSale(productsList)}
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
      {addMovementError ? (
        <Modal
          message={messageError}
          textButton={"Aceptar"}
          title={modalTitleError}
          iconURL={error_icon}
          altImg={"error"}
          onClickEvent={() => setAddMovementError(!addMovementError)}
        ></Modal>
      ) : (
        <></>
      )}
    </div>
  );
};

export default MovementBaseReturnSale;

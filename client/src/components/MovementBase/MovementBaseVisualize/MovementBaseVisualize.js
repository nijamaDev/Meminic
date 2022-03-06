
import SearchBarVisualize from "../../SearchBar/SearchBarVisualize/SearchBarVisualize";
import ProductContext from "../../../context/ProductContext";
import UserContext from "../../../context/UserContext";
import Auth0Hook from "../../../hooks/Auth0Hook";
import { rowTitleVisualize } from "./rowTitlesVisualize";
import { useState } from "react";
import "../MovementBase.css";
import Modal from "../../Modal/Modal";
import check_icon from "../../../assets/check_icon.svg";
import error_icon from "../../../assets/error_icon.svg";
import { useNavigate } from "react-router-dom";
import MovementContext from "../../../context/MovementContext";
import { InitialMovements } from "../initialMovements";
var productsList = [];

const MovementBaseVisualize = ({ title, messageRegister, modalTitle }) => {
  const { getProducts } = ProductContext();
  const { searchUser } = UserContext();
  const { user } = Auth0Hook();
  const [productDataArray, setProductDataArray] = useState();
  const [getData, setGetDate] = useState(true);
  const [addMovement, setAddMovement] = useState(false);
  const [isNotPosible, setIsNotPosible] = useState(false);
  const [productNameNotEnough, setProductNameNotEnough] = useState("");
  const { addSale, addSaleVerification } = MovementContext();
  const navigate = useNavigate();
  // const onClickRegisterSale = (array) => {
  //   addSaleVerification(array).then(function (response) {
  //     if (response.data === true) {
  //       array.map((product) => {
  //         return addSale(product);
  //       });
  //       productsList = [];
  //       setAddMovement(true);
  //       setIsNotPosible(false);
  //       return true;
  //     } else {
  //       setProductNameNotEnough(
  //         array[response.data.productNotEnough.index].name
  //       );
  //       setIsNotPosible(true);
  //       return response;
  //     }
  //   });
  // };

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
        {/* <button
          className="movements__button__register"
          onClick={() => onClickRegisterSale(productsList)}
        >
          Registrar
        </button> */}
      </div>
      {/* {addMovement ? (
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
      )} */}
      {/* {isNotPosible ? (
        <Modal
          message={
            productNameNotEnough + " no cuenta con suficiente existencias"
          }
          textButton={"Aceptar"}
          title="Venta no registrada"
          iconURL={error_icon}
          altImg={"error"}
          onClickEvent={() => setIsNotPosible(!isNotPosible)}
        ></Modal>
      ) : (
        <></>
      )} */}
    </div>
  );
};

export default MovementBaseVisualize;

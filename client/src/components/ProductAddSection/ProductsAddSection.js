import React, { useState } from "react";
import ManagementBox from "../ManagementBox/ManagementBox";
import { CreateProductItems } from "./CreateProductItems";
import UserContext from "../../context/UserContext";
import ProductContext from "../../context/ProductContext";
import Modal from "../Modal/Modal";
import registerProductIcon from "../../assets/register_user.svg";
import check_icon from "../../assets/check_icon.svg";
import error_icon from "../../assets/error_icon.svg";

const ProductsAddSection = ({ user }) => {
  const { searchUser } = UserContext();
  const { addProduct, searchProduct, addInitialInventory } = ProductContext();
  const [toggleSuccess, setToggleSuccess] = useState(false);
  const [toggleFail, setToggleFail] = useState(false);

  const onSubmitRegister = (data, e) => {
    searchProduct(data.Identificador).then(function (response) {
      if (response.data === "") {
        searchUser(user.email).then(function (response) {
          addProduct(data, response.data.storeStoreId).then(function (
            response
          ) {
            console.log(response);
            if (response.status === 201) {
              setToggleSuccess(true);
              e.target.reset();
            }
            addInitialInventory(data, response.data.idKardex);
          });
        });
      } else {
        setToggleFail(true);
        e.target.reset();
        console.log("This product was already create");
      }
    });
  };

  return (
    <div>
      <div>
        {!toggleSuccess ? (
          <>
            <ManagementBox
              img={registerProductIcon}
              onSubmitFunct={onSubmitRegister}
              obj={user}
              formId="CreateProduct"
              title="Registro de productos"
              buttonName="Añadir producto"
              itemsInput={CreateProductItems}
            />
          </>
        ) : (
          <>
            <Modal
              message={"El producto ha sido creado con éxito!"}
              textButton={"Aceptar"}
              title={"Producto creado"}
              iconURL={check_icon}
              altImg={"check"}
              onClickEvent={() => setToggleSuccess(!toggleSuccess)}
            ></Modal>
            <ManagementBox
              img={registerProductIcon}
              onSubmitFunct={onSubmitRegister}
              obj={user}
              formId="CreateProduct"
              title="Registro de productos"
              buttonName="Añadir producto"
              itemsInput={CreateProductItems}
            />
          </>
        )}
        {!toggleFail ? (
          <></>
        ) : (
          <>
            <Modal
              message={"El producto ya se encuentra registrado"}
              textButton={"Aceptar"}
              title={"Producto ya registrado"}
              iconURL={error_icon}
              altImg={"check"}
              onClickEvent={() => setToggleFail(!toggleFail)}
            ></Modal>
            <ManagementBox
              img={registerProductIcon}
              onSubmitFunct={onSubmitRegister}
              obj={user}
              formId="CreateProduct"
              title="Registro de productos"
              buttonName="Añadir producto"
              itemsInput={CreateProductItems}
            />
          </>
        )}
      </div>
    </div>
  );
};

export default ProductsAddSection;

import React  , { useState } from "react";
import ManagementBox from "../ManagementBox/ManagementBox";
import { UpdateProductItems } from "./UpdateProductItems";
import { UpdateAvailableItem } from "./UpdateAvailableItem";
import ProductContext from "../../context/ProductContext";
import updateProductIcon from "../../assets/update_user.svg";
import Modal from "../Modal/Modal";
import check_icon from "../../assets/check_icon.svg";
import error_icon from "../../assets/error_icon.svg";

const ProductsUpdateSection = ({ user }) => {
  const { searchProduct, updateProduct } = ProductContext();
  const [toggleSuccess, setToggleSuccess] = useState(false);
  const [toggleFail, setToggleFail] = useState(false);

  const onSubmitUpdate = (data, e) => {
    searchProduct(data.Identificador).then(function (response) {
      if (response.data !== "") {
        updateProduct(data).then(function(response){
          if (response.status === 201) {
            setToggleSuccess(true);
            e.target.reset();
          }
        });
      } else {
        setToggleFail(true);
        e.target.reset();
        console.log("This hasn't been created yet");
      }
    });
  };



  return (
    <div>
      <div>
      { !toggleSuccess ? (
          <>
          <ManagementBox
          img={updateProductIcon}
          onSubmitFunct={onSubmitUpdate}
          obj={user}
          formId="UpdateProduct"
          name="Modificar información"
          buttonName="Actualizar"
          itemsInput={UpdateProductItems}
          itemsSelect={UpdateAvailableItem}
          />
          </>

        ):(
          <> 
          <Modal
              message={"El producto ha sido actualizado con éxito!"}
              textButton={"Aceptar"}
              title={"Producto actualizado"}
              iconURL={check_icon}
              altImg={"check"}
              onClickEvent={() => setToggleSuccess(!toggleSuccess)}
          ></Modal>
          <ManagementBox
          img={updateProductIcon}
          onSubmitFunct={onSubmitUpdate}
          obj={user}
          formId="UpdateProduct"
          name="Modificar información"
          buttonName="Actualizar"
          itemsInput={UpdateProductItems}
          itemsSelect={UpdateAvailableItem}
          />
          </>
        )

        }
        { !toggleFail ? (
          <>
          </>
        ):(
          <> 
          <Modal
              message={"El producto aún no ha sido creado"}
              textButton={"Aceptar"}
              title={"Producto no registrado"}
              iconURL={error_icon}
              altImg={"check"}
              onClickEvent={() => setToggleFail(!toggleFail)}
          ></Modal>
          <ManagementBox
          img={updateProductIcon}
          onSubmitFunct={onSubmitUpdate}
          obj={user}
          formId="UpdateProduct"
          name="Modificar información"
          buttonName="Actualizar"
          itemsInput={UpdateProductItems}
          itemsSelect={UpdateAvailableItem}
          />
          </>
        )

        }
      </div>
    </div>
  );
};

export default ProductsUpdateSection;

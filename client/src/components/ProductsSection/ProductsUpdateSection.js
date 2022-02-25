import React from "react";
import ManagementBox from "../ManagementBox/ManagementBox";
import { UpdateProductItems } from "./UpdateProductItems";
import updateProductIcon from "../../assets/update_user.svg";
import ProductContext from "../../context/ProductContext";

const ProductsUpdateSection = ({ user }) => {
  const { searchProduct, updateProduct } = ProductContext();

  const onSubmitUpdate = (data, e) => {
    searchProduct(data.Identificador).then(function (response) {
      if (response.data !== "") {
        updateProduct(data);
        console.log("La información fue actualizada");
      } else {
        console.log("El producto no ha sido creado aún");
      }
    });
  };

  return (
    <div>
      <div>
        <ManagementBox
          img={updateProductIcon}
          onSubmitFunct={onSubmitUpdate}
          obj={user}
          formId="UpdateProduct"
          title="Modificar información"
          buttonName="Actualizar"
          itemsInput={UpdateProductItems}
        />
      </div>
    </div>
  );
};

export default ProductsUpdateSection;

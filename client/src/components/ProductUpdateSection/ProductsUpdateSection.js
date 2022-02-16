import React from "react";
import ManagementBox from "../ManagementBox/ManagementBox";
import { UpdateProductItems } from "./UpdateProductItems";
import UserContext from "../../context/UserContext";
import updateProductIcon from "../../assets/update_user.svg";

const ProductsUpdateSection = ({ user }) => {
  const { searchProduct, updateProduct } = UserContext();

  const onSubmitUpdate = (data, e) => {
    searchProduct(data.Identificador).then(function (response) {
      if (response.data !== "") {
        updateProduct(data);
        console.log("Information was update");
      } else {
        console.log("This hasn't been created yet");
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
          name="Modificar información"
          buttonName="Actualizar"
          itemsInput={UpdateProductItems}
        />
      </div>
    </div>
  );
};

export default ProductsUpdateSection;

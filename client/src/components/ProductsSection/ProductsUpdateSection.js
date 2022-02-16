import React from "react";
import ManagementBox from "../ManagementBox/ManagementBox";
import { UpdateProductItems } from "./UpdateProductItems";
import UserContext from "../../context/UserContext";
import updateProductIcon from "../../assets/update_user.svg";
import visualizeProductIcon from "../../assets/visualize_user.svg";

const ProductsUpdateSection = ({ user }) => {
  const { searchUser, searchProduct, updateProduct, getProducts } =
    UserContext();

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

  // const onSubmitVisualize = (data, e) => {
  //   searchUser(user.email).then(function (response) {
  //     getProducts(response.data.storeStoreId).then(function (response) {
  //       console.log("Productos: ", response);
  //     });
  //   });
  // };

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

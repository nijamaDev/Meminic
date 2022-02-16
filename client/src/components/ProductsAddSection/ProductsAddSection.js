import React from "react";
import ManagementBox from "../ManagementBox/ManagementBox";
//import "./UsersManagementSection.css";
import {CreateProductItems } from "./CreateProductItems";
import UserContext from "../../context/UserContext";
import registerUser from "../../assets/register_user.svg";
import visualizeUser from "../../assets/visualize_user.svg";


const ProductsAddSection = ({user}) => {
  const {  searchUser,addProduct } = UserContext();
  const onSubmitRegister = (data, e) =>{
    searchUser(user.email).then(function (response) {
        addProduct(data, response.data.storeStoreId);
    }); 
  }

  return (
    <div >
      <div >
        <ManagementBox  img={registerUser} onSubmitFunct = {onSubmitRegister} obj={user} formId= "CreateProduct"  name="Registro de productos" buttonName = "Añadir producto"   itemsInput={CreateProductItems} />
      </div>
    </div>
  );
};


export default ProductsAddSection;
import React from "react";
import ManagementBox from "../ManagementBox/ManagementBox";

import {CreateProductItems } from "./CreateProductItems";

import UserContext from "../../context/UserContext";
import registerProductIcon from "../../assets/register_user.svg";



const ProductsAddSection = ({user}) => {
  const {  searchUser,addProduct , searchProduct, updateProduct, getProducts} = UserContext();
  const onSubmitRegister = (data, e) =>{
    searchProduct(data.Identificador).then(function(response){
        if(response.data === ""){
            searchUser(user.email).then(function (response) {
                addProduct(data, response.data.storeStoreId);
            }); 
            console.log("Producto creado"); 
        }
        else{
            console.log("Este producto ya existe");
        }
    })
  }


  return (
    <div >
      <div >
        <ManagementBox  img={registerProductIcon} onSubmitFunct = {onSubmitRegister} obj={user} formId= "CreateProduct"  name="Registro de productos" buttonName = "Añadir producto"   itemsInput={CreateProductItems} />
      </div>
    </div>
  );
};


export default ProductsAddSection;
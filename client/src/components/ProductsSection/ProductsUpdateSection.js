import React from "react";
import ManagementBox from "../ManagementBox/ManagementBox";
import {UpdateProductItems } from "./UpdateProductItems";
import UserContext from "../../context/UserContext";
import updateProductIcon from "../../assets/update_user.svg";
import visualizeProductIcon from "../../assets/visualize_user.svg";


const ProductsUpdateSection = ({user}) => {
  const {  searchUser, searchProduct, updateProduct, getProducts} = UserContext();


  const onSubmitUpdate = (data, e) =>{
    searchProduct(data.Identificador).then(function(response){
        if(response.data !== ""){
            updateProduct(data);
            console.log("La información fue actualizada"); 
        }
        else{
            console.log("El producto no ha sido creado aún");
        }
    })
  }

  const onSubmitVisualize = (data, e) =>{
    searchUser(user.email).then(function (response) {
        getProducts( response.data.storeStoreId).then(function(response){
            console.log("Productos: ",response);
        });
    }); 
  }

  return (
    <div >
      <div >
        <ManagementBox  img={updateProductIcon} onSubmitFunct = {onSubmitUpdate} obj={user} formId= "UpdateProduct"  title="Modificar información" buttonName = "Actualizar"   itemsInput={UpdateProductItems} />
        <ManagementBox  img={visualizeProductIcon} onSubmitFunct = {onSubmitVisualize} obj={user} formId= "VisualizeProduct"  title="Productos registrados" buttonName = "Consultar"   />
      </div>
    </div>
  );
};


export default ProductsUpdateSection;
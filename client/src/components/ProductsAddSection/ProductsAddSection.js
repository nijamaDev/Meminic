import React from "react";
import ManagementBox from "../ManagementBox/ManagementBox";
//import "./UsersManagementSection.css";
import {CreateProductItems } from "./CreateProductItems";
import {UpdateProductItems } from "./UpdateProductItems";
import UserContext from "../../context/UserContext";
import registerUser from "../../assets/register_user.svg";
import visualizeUser from "../../assets/visualize_user.svg";


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
        <ManagementBox  img={registerUser} onSubmitFunct = {onSubmitRegister} obj={user} formId= "CreateProduct"  name="Registro de productos" buttonName = "Añadir producto"   itemsInput={CreateProductItems} />
        <ManagementBox  img={visualizeUser} onSubmitFunct = {onSubmitUpdate} obj={user} formId= "UpdateProduct"  name="Modificar información" buttonName = "Actualizar"   itemsInput={UpdateProductItems} />
        <ManagementBox  img={visualizeUser} onSubmitFunct = {onSubmitVisualize} obj={user} formId= "VisualizeProduct"  name="Productos registrados" buttonName = "Consultar"   />
      </div>
    </div>
  );
};


export default ProductsAddSection;
import React from "react";
import ManagementBox from "../ManagementBox/ManagementBox";
import "./UsersManagementSection.css";
import {CreateUserItems } from "./CreateUserItems";
import {UpdateUserItems } from "./UpdateUserItems";
import {InputUserItems } from "./InputUserItems";
import UserContext from "../../context/UserContext";
import registerUserIcon from "../../assets/register_user.svg";
import visualizeUserIcon from "../../assets/visualize_user.svg";
import updateUserIcon from "../../assets/update_user.svg";
// Para importar los iconos


const UsersManagementSection = ({user}) => {
  const { searchUser , addUser, updateUser, getWorkers } = UserContext();
  const onSubmitRegister = (data, e) =>
    searchUser(data.Email).then(function (response) {
      if(response.data === ""){
        console.log("no esta en la bd?");
        searchUser(user.email).then(function (response) {
            addUser(data, response.data.storeStoreId);
        }); 
      }
      else{
        console.log("else: ", response);
      } 
    });

  const onSubmitUpdate = (data, e) =>
    searchUser(data.Email).then(function (response) {
      if(response.data === ""){
        console.log("El usuario aún no ha sido creado")
      }
      else{
        updateUser(data);
        console.log("Actualizado ");
      } 
  });

  const onSubmitVisualize = (data, e) =>
    searchUser(user.email).then(function (response) {
      console.log(response.data.storeStoreId);
      getWorkers(response.data.storeStoreId)
      .then(function(response
        ){ console.log(response);
        });
    }); 

 
  return (
    <div className="usersManagement__section">
      <div className="users__section_boxes">
        <ManagementBox  img={registerUserIcon} onSubmitFunct = {onSubmitRegister} obj={user} formId= "CreateUser"  name="Registro de usuarios" buttonName = "Añadir usuario"   itemsInput={InputUserItems} itemsSelect={CreateUserItems} />
        <ManagementBox img={updateUserIcon}  onSubmitFunct = {onSubmitUpdate}   obj={user}  formId= "UpdateUser"    name="Modificar información" buttonName = "Modificar"  itemsInput={InputUserItems}   itemsSelect={UpdateUserItems}  />
        <ManagementBox img={ visualizeUserIcon}  onSubmitFunct = {onSubmitVisualize}   obj={user}  formId= "VisualizeUser"    name="Usuarios registrados" buttonName = "Consultar"   />
      </div>
    </div>
  );
};


export default UsersManagementSection;
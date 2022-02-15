import React from "react";
import ManagementBox from "../ManagementBox/ManagementBox";
import "./UsersManagementSection.css";
import {CreateUserItems } from "./CreateUserItems";
import {UpdateUserItems } from "./UpdateUserItems";
import {InputUserItems } from "./InputUserItems";
import UserContext from "../../context/UserContext";
import registerUser from "../../assets/register_user.svg";
import visualizeUser from "../../assets/visualize_user.svg";
// Para importar los iconos


const UsersManagementSection = ({user}) => {
  const { searchUser , addUser, updateUser } = UserContext();
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
 
  return (
    <div className="usersManagement__section">
      <div className="users__section_boxes">
        <ManagementBox  img={registerUser} onSubmitFunct = {onSubmitRegister} obj={user} formId= "CreateUser"  name="Registro de usuarios" buttonName = "Añadir usuario"   itemsInput={InputUserItems} itemsSelect={CreateUserItems} />
        <ManagementBox img={visualizeUser}  onSubmitFunct = {onSubmitUpdate}   obj={user}  formId= "UpdateUser"    name="Modificar información" buttonName = "Modificar"  itemsInput={InputUserItems}   itemsSelect={UpdateUserItems}  />
      </div>
    </div>
  );
};


export default UsersManagementSection;
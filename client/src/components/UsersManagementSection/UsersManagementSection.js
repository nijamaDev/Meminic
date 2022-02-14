import React from "react";
import UserManagementBox from "../UsersManagementBox/UsersManagementBox";
import "./UsersManagementSection.css";
import {CreateUserItems } from "./CreateUserItems";
import {UpdateUserItems } from "./UpdateUserItems";
import arrowDown from "../../assets/arrow_down.svg";
// Para importar los iconos


const UsersManagementSection = ({user}) => {
  return (
    <div className="usersManagement__section">
      <div className="users__section_boxes">
        <UserManagementBox user={user} formId= "CreateUser" url = "/createUser" name="Registro de usuarios" buttonName = "Añadir usuario" items={CreateUserItems} />
        <UserManagementBox user={user}  formId= "UpdateUser"   url = "/addUser" name="Modificar información" buttonName = "Modificar" items={UpdateUserItems}  />
      </div>
    </div>
  );
};


export default UsersManagementSection;
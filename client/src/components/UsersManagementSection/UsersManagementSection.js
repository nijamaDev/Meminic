import React from "react";
import ManagementBox from "../ManagementBox/ManagementBox";
import { CreateUserItems } from "./CreateUserItems";
import { UpdateUserItems } from "./UpdateUserItems";
import { InputUserItems } from "./InputUserItems";
import UserContext from "../../context/UserContext";
import Auth0Hook from "../../hooks/Auth0Hook";
import UserManagementTable from "../UserManagementTable/UserManagementTable";
import registerUserIcon from "../../assets/register_user.svg";
import updateUserIcon from "../../assets/update_user.svg";
import visualizeUserIcon from "../../assets/visualize_user.svg";

const UsersManagementSection = () => {
  const { searchUser, addUser, updateUser } = UserContext();
  const { user } = Auth0Hook();

  const onSubmitRegister = (data, e) =>
    searchUser(data.Email).then(function (response) {
      if (response.data === "") {
        searchUser(user.email).then(function (response) {
          addUser(data, response.data.storeStoreId);
        });
      } else {
        console.log(response);
      }
    });

  const onSubmitUpdate = (data, e) =>
    searchUser(data.Email).then(function (response) {
      if (response.data === "") {
        console.log("El usuario aún no ha sido creado");
      } else {
        updateUser(data);
        console.log("Actualizado ");
      }
    });

  return (
    <div className="users__management__section">
      <div className="users__section_boxes">
        <ManagementBox  img={registerUserIcon} onSubmitFunct = {onSubmitRegister} obj={user} formId= "CreateUser"  name="Registro de usuarios" buttonName = "Añadir usuario"   itemsInput={InputUserItems} itemsSelect={CreateUserItems} />
        <ManagementBox img={updateUserIcon}  onSubmitFunct = {onSubmitUpdate}   obj={user}  formId= "UpdateUser"    name="Modificar información" buttonName = "Modificar"  itemsInput={InputUserItems}   itemsSelect={UpdateUserItems}  />
        <UserManagementTable></UserManagementTable>
      </div>
    </div>
  );
};

export default UsersManagementSection;

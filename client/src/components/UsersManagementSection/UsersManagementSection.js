import React from "react";
import ManagementBox from "../ManagementBox/ManagementBox";
import { CreateUserItems } from "./CreateUserItems";
import { UpdateUserItems } from "./UpdateUserItems";
import { InputUserItems } from "./InputUserItems";
import UserContext from "../../context/UserContext";
import registerUser from "../../assets/register_user.svg";
import visualizeUser from "../../assets/visualize_user.svg";
import Auth0Hook from "../../hooks/Auth0Hook";
import UserReadTable from "../UserReadTable/UserReadTable";
import UserReadTableEvents from "../UserReadTable/UserReadTableEvents";

const UsersManagementSection = () => {
  const { searchUser, addUser, updateUser } = UserContext();
  const { user } = Auth0Hook();
  const { employeesList, onClickTable, isClicked } = UserReadTableEvents();
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
        <ManagementBox
          img={registerUser}
          title="Registro de usuarios"
          onSubmitFunct={onSubmitRegister}
          obj={user}
          formId="CreateUser"
          buttonName="Añadir usuario"
          itemsInput={InputUserItems}
          itemsSelect={CreateUserItems}
        />
        <ManagementBox
          img={visualizeUser}
          title="Modificar información"
          onSubmitFunct={onSubmitUpdate}
          obj={user}
          formId="UpdateUser"
          buttonName="Modificar"
          itemsInput={InputUserItems}
          itemsSelect={UpdateUserItems}
        />
        <UserReadTable
          onClickTable={onClickTable}
          isClicked={isClicked}
          Items={employeesList}
        />
      </div>
    </div>
  );
};

export default UsersManagementSection;

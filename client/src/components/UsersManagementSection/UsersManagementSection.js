import React from "react";
import ManagementBox from "../ManagementBox/ManagementBox";
import { CreateUserItems } from "./CreateUserItems";
import { UpdateUserItems } from "./UpdateUserItems";
import { InputUserItems } from "./InputUserItems";
import Auth0Hook from "../../hooks/Auth0Hook";
import UserReadTableEvents from "../UserReadTable/UserReadTableEvents";
import UserReadTable from "../UserReadTable/UserReadTable";
import registerUserIcon from "../../assets/register_user.svg";
import visualizeUserIcon from "../../assets/visualize_user.svg";

const UsersManagementSection = ({ onSubmitRegister, onSubmitUpdate }) => {
  const { user } = Auth0Hook();
  const { employeesList, onClickTable, isClicked } = UserReadTableEvents();

  return (
    <div className="users__management__section">
      <div className="users__section_boxes">
        <ManagementBox
          img={registerUserIcon}
          title="Registro de usuarios"
          onSubmitFunct={onSubmitRegister}
          obj={user}
          formId="CreateUser"
          buttonName="Añadir usuario"
          itemsInput={InputUserItems}
          itemsSelect={CreateUserItems}
        />
        <ManagementBox
          img={visualizeUserIcon}
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

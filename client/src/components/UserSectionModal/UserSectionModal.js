import { useState } from "react";
import UserContext from "../../context/UserContext";
import Modal from "../Modal/Modal";
import check_icon from "../../assets/check_icon.svg";
import error_icon from "../../assets/error_icon.svg";
import UserManagementSection from "../UsersManagementSection/UsersManagementSection";
import Auth0Hook from "../../hooks/Auth0Hook";
const UserSectionModal = () => {
  const { searchUser, addUser, updateUser } = UserContext();
  const [toggleSuccess, setToggleSuccess] = useState(false);
  const [toggleFail, setToggleFail] = useState(false);
  const [toggleSucessUpdate, setToggleSuccessUpdate] = useState(false);
  const [toggleFailUpdate, setToggleFailUpdate] = useState(false);
  const [toggleDelete, setToggleDelete] = useState(false);
  const { user } = Auth0Hook();

  const onSubmitRegister = (data, e) =>
    searchUser(data.Email).then(function (response) {
      if (response.data === "") {
        searchUser(user.email).then(function (response) {
          addUser(data, response.data.storeStoreId);
          if (data.email !== "") {
            setToggleSuccess(true);
            e.target.reset();
          }
        });
      } else {
        setToggleFail(true);
        e.target.reset();
      }
    });

  const onSubmitUpdate = (data, e) =>
    searchUser(data.Email).then(function (response) {
      if (response.data === "") {
        setToggleFailUpdate(true);
        e.target.reset();
      } else {
        updateUser(data);
        if (data.email !== "") {
          setToggleSuccessUpdate(true);
          e.target.reset();
        }
        if (data.Estado === "Inactivo") {
          setToggleSuccessUpdate(false);
          setToggleDelete(true);
          e.target.reset();
        }
      }
    });
  return (
    <>
      {!toggleSuccess ? (
        <UserManagementSection
          onSubmitRegister={onSubmitRegister}
          onSubmitUpdate={onSubmitUpdate}
        />
      ) : (
        <>
          <Modal
            message={"El Usuario ha sido creado con éxito!"}
            textButton={"Aceptar"}
            title={"Usuario creado"}
            iconURL={check_icon}
            altImg={"check"}
            onClickEvent={() => setToggleSuccess(!toggleSuccess)}
          ></Modal>
          <UserManagementSection
            onSubmitRegister={onSubmitRegister}
            onSubmitUpdate={onSubmitUpdate}
          />
        </>
      )}
      {toggleFail ? (
        <>
          <Modal
            message={"El Usuario ya ha sido creado"}
            textButton={"Aceptar"}
            title={"Usuario ya registrado"}
            iconURL={error_icon}
            altImg={"check"}
            onClickEvent={() => setToggleFail(!toggleFail)}
          ></Modal>
          <UserManagementSection
            onSubmitRegister={onSubmitRegister}
            onSubmitUpdate={onSubmitUpdate}
          />
        </>
      ) : (
        <></>
      )}
      {toggleSucessUpdate ? (
        <>
          <>
            <Modal
              message={"La información ha sido actualizada con éxito!"}
              textButton={"Aceptar"}
              title={"Usuario actualizado"}
              iconURL={check_icon}
              altImg={"check"}
              onClickEvent={() => setToggleSuccessUpdate(!toggleSucessUpdate)}
            ></Modal>
            <UserManagementSection
              onSubmitRegister={onSubmitRegister}
              onSubmitUpdate={onSubmitUpdate}
            />
          </>
        </>
      ) : (
        <></>
      )}
      {toggleFailUpdate ? (
        <>
          <Modal
            message={"El usuario no se encuentra registrado"}
            textButton={"Aceptar"}
            title={"Usuario no registrado"}
            iconURL={error_icon}
            altImg={"check"}
            onClickEvent={() => setToggleFailUpdate(!toggleFailUpdate)}
          ></Modal>
          <UserManagementSection
            onSubmitRegister={onSubmitRegister}
            onSubmitUpdate={onSubmitUpdate}
          />
        </>
      ) : (
        <></>
      )}
      {toggleDelete ? (
        <>
          <Modal
            message={"El usuario ha sido eliminado exitosamente!"}
            textButton={"Aceptar"}
            title={"Usuario eliminado"}
            iconURL={error_icon}
            altImg={"check"}
            onClickEvent={() => setToggleDelete(!toggleDelete)}
          ></Modal>
          <UserManagementSection
            onSubmitRegister={onSubmitRegister}
            onSubmitUpdate={onSubmitUpdate}
          />
        </>
      ) : (
        <></>
      )}
    </>
  );
};

export default UserSectionModal;

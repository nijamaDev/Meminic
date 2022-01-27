import React from "react";
import "./RegisterButton.css";
const RegisterButton = ({ onClick }) => {
  return (
    <button className="register__button" onClick={onClick}>
      Registrarse
    </button>
  );
};

export default RegisterButton;

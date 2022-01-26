import React from "react";
import "./RegisterButton.css";
const RegisterButton = ({ event }) => {
  return (
    <button className="register__button" onClick={event}>
      Registrarse
    </button>
  );
};

export default RegisterButton;

import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import "../RegisterButton/RegisterButton.css";
import "./LogOut.css";
const LogOut = () => {
  const { logout } = useAuth0();
  return (
    <button
      className="logout__button"
      onClick={() => logout({ returnTo: window.location.origin })}
    >
      Cerrar sesión
    </button>
  );
};

export default LogOut;

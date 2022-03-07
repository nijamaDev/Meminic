import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import "../RegisterButton/RegisterButton.css";
import "./LogOut.css";
import Auth0Hook from "../../hooks/Auth0Hook";
import RegisterButton from "../RegisterButton/RegisterButton";

const LogOut = () => {
  const { isAuthenticated } = Auth0Hook();
  const { logout, loginWithRedirect } = useAuth0();
  return <>
  {isAuthenticated ? 
    <button
      className="logout__button"
      onClick={() => logout({ returnTo: window.location.origin })}
    >
      Cerrar sesión
    </button>
    : 
    (<RegisterButton onClick={() => loginWithRedirect()} />)
  }
  </>;
};

export default LogOut;

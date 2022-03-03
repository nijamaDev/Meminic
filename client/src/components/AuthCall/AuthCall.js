import React from "react";
import { useState , useEffect} from "react";
import { useAuth0 } from "@auth0/auth0-react";


const AuthCall = () => {
    const { loginWithRedirect } = useAuth0();
    useEffect(() => {
        loginWithRedirect();       
  }, []) 

    return (
        <div> popo </div>
  );
};

export default AuthCall;
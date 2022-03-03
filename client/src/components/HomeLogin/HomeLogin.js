import React from "react";
import { useState , useEffect} from "react";
import Auth0Hook from "../../hooks/Auth0Hook";
import UserContext from "../../context/UserContext";
import axios from "axios";
import UserProfile from "../UserProfile/UserProfile";
import ModulesSectionAdmin from "../ModulesSection/ModulesSectionAdmin";
import ModulesSectionSeller from "../ModulesSection/ModuleSectionSeller";
import { ModulesInfoAdmin } from "../ModulesSection/ModulesInfoAdmin";
import { ModulesInfoSeller } from "../ModulesSection/ModulesInfoSeller";


const HomeLogin = () => {
    const { user, isAuthenticated } = Auth0Hook();
    const [readResultUsed, setReadResultUsed] = useState(false);
    const [verifiedUser, setVerifiedUser] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const { saveDataStore, saveDataUser } = UserContext();
    const [isAdmin, setIsAdmin] = useState(false);

    useEffect(() => {
        //First the user is added to the database if needed.
        axios
        .post("http://localhost:5000/searchUser", {
          email: user.email,
        })
        .then(function (response) {
          if (response.data === "") {
            return saveDataStore();
          }
        })
        .then(function (response) {
          if (typeof response !== "undefined") {
            saveDataUser(response.data.store_id);
          }
        })
        .then(function(response){
            //Then we are able to get the user role
            axios
              .post("http://localhost:5000/searchUser", {
                email: user.email,
              })
              .then(function (response) {
                  console.log("here");
                if (response.data.role === "Administrador" || response.data === "") {
                  setIsAdmin(true);
                  setIsLoading(false);
                  console.log("here2", isLoading);
                } else {
                  setIsAdmin(false);
                  setIsLoading(false);
                }
              });
        })
        .catch(function (error) {
          console.log(error);
        });
                      
    }, []) 

    return (
        <>
        { isLoading ? (
            <div> Cargando </div>
        ) : (
          <>
            {isAdmin ? (
                      <>
                        <UserProfile
                          profileImg={user.picture}
                          name={user.name}
                          role="Administrador"
                        />
                        <ModulesSectionAdmin
                          Modules={ModulesInfoAdmin}
                        />
                      </>
                    ) : (
                      <>
                        <UserProfile
                          profileImg={user.picture}
                          name={user.name}
                          role="Vendedor"
                        />
                        <ModulesSectionSeller
                          Modules={ModulesInfoSeller}
                          className="modules__box__seller"
                        />
                      </>
                    )}
          </>
        )}
      </>
  );
};

export default HomeLogin;
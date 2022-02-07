import React from "react";
import Header from "./components/Header/Header";
import Banner from "./components/Banner/Banner";
import ServicesBanner from "./components/ServicesBanner/ServicesBanner";
import Footer from "./components/Footer/Footer";
import { useAuth0 } from "@auth0/auth0-react";
import ModulesSection from "./components/ModulesSection/ModulesSection";
import UserProfile from "./components/UserProfile/UserProfile";
import "./index.css";
import axios from "axios";
import { useState } from "react";

function App() {
  const { user, isAuthenticated } = useAuth0();
  //console.log(user);


  const verifyUser = async () => {
      await axios.post("http://localhost:5000/searchUser" , {
        email: user.email })
      .then( function (response) {
        if(typeof response !== 'undefined'){
          if(response.data==""){
            console.log("Vacio", response.data);
            saveDataUser();
          }
          else{
            console.log("No vacio" , response.data);
          }
        }
        //console.log(response);
      } )
      .catch(function (error) {
        // handle error
        console.log(error);
      });
  };

  
  const saveDataUser = async () => {
    
      try {
        await axios.post("http://localhost:5000/createUser", {
          email: user.email,
        });
      } catch (error) {
        console.log("error");
      }
    
  };

  return (
    <div>
      {isAuthenticated ? (
        verifyUser() &&  (
          <>
            <Header />
            <UserProfile
              profileImg={user.picture}
              name={user.name}
              role={"Administrador"}
             />
            <ModulesSection />
          </>
        )
      ) : (
        <>
          {" "}
          <Header />
          <Banner />
          <ServicesBanner />
          <Footer />
        </>
      )}
    </div>
  );
}

export default App;
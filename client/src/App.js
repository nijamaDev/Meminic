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
  const [ newUser, setnewUser] = useState(0);
  const [ run, setRun] = useState(0);
  var userdb = "";
  console.log(user);


  const verifyUser = async () => {
    console.log("Setted");
    try {
        userdb = await axios.post("http://localhost:5000/searchUser", {
        email: user.email,
      }).data;
      setnewUser(1);
    } catch (error) {
      console.log("error");
    }  
  };
  
  const saveDataUser = async () => {
    try {
      await axios.post("http://localhost:5000/createUser", {
        email: user.email,
      });
      setnewUser(2);
    } catch (error) {
      console.log("error");
    }
  };

  const initSesion = async () => {
    if(typeof newUser == "undefined"){
      console.log("Undefined if");
      try{
        verifyUser();
      }
      catch (error) {
        console.log("Couldn't verify user?");
      }
    }
    if(newUser===1){
        console.log("newUser if");
        if(userdb=== ""){
          try{
            saveDataUser();
          }
          catch (error) {
            console.log("Couldn't create user?");
          }
        } 
    } 
    if(newUser===0){
      console.log("Undefined else");
      try{
        verifyUser();
      }
      catch (error) {
        console.log("Couldn't verify user?");
      }
      /*if (typeof userdb !== "undefined"){
        verifyUser();
      }
      else{
        this.setState =({ newUser: userdb });
      }*/
      
    }
  };

  return (
    <div>
      {isAuthenticated ? (
        initSesion() && (
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
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


function App() {
  const { user, isAuthenticated } = useAuth0();


  const verifyUser = async () => {
      //Verifies if the user is already in the db
      await axios.post("http://localhost:5000/searchUser" , {
        email: user.email })
      .then( function (response) {
          //If the user is not found, this creates a new store the user will be linked to
          if(response.data==""){
            return saveDataStore();
          }
        }
      )
      .then( function (response) {
        //If a new store was created, this creates a new user in the db, as the store's admin.  
        if(typeof response !== 'undefined'){
            saveDataUser( response.data.store_id );
        }
      } )
      .catch(function (error) {
        console.log(error);
      });
  };

 //Creates a new store in the db
  const saveDataStore = async () => {
    try {
      const store = await axios.post("http://localhost:5000/createStore", {});
      return store;
    } catch (error) {
      console.log("error");
    }
};
  
  // Creates a new user as an admin of a store created before 
  const saveDataUser = async (id) => { 
      try {
        await axios.post("http://localhost:5000/createUser", {
          email: user.email,
          store: id
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
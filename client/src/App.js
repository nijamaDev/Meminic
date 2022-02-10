import React from "react";
import Header from "./components/Header/Header";
import Banner from "./components/Banner/Banner";
import ServicesBanner from "./components/ServicesBanner/ServicesBanner";
import Footer from "./components/Footer/Footer";
// import { useAuth0 } from "@auth0/auth0-react";
import ModulesSection from "./components/ModulesSection/ModulesSection";
import UserProfile from "./components/UserProfile/UserProfile";
import "./index.css";
import UserContext from "./context/UserContext";
import Auth0Hook from "./hooks/Auth0Hook";

function App() {
  const { user, isAuthenticated } = Auth0Hook();
  const { verifyUser } = UserContext();
  return (
    <div>
      {isAuthenticated ? (
        verifyUser() && (
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

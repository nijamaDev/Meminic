import React from "react";
import Header from "./components/Header/Header";
import Banner from "./components/Banner/Banner";
import ServicesBanner from "./components/ServicesBanner/ServicesBanner";
import Footer from "./components/Footer/Footer";
import { useAuth0 } from "@auth0/auth0-react";
import ModulesSection from "./components/ModulesSection/ModulesSection";
import "./index.css";

function App() {
  const { isAuthenticated } = useAuth0();
  return (
    <div>
      {isAuthenticated ? (
        <>
          <ModulesSection />
          
        </>
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

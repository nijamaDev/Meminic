import React from "react";
import Header from "./components/Header/Header";
import Banner from "./components/Banner/Banner";
import ServicesBanner from "./components/ServicesBanner/ServicesBanner";
import Footer from "./components/Footer/Footer";
import { useAuth0 } from "@auth0/auth0-react";
import ModulesSection from "./components/ModulesSection/ModulesSection";
import "./index.css";
import { useState, useEffect } from "react";

function App() {
  const { isAuthenticated } = useAuth0();
  const [data, setData] = useState({});

  useEffect(() => {
    fetch("/test", {
      method: "GET",
      headers: {
        Accept: "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => setData(data));
  }, []);
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
          <div>{data.name}</div>
          <Footer />
        </>
      )}
    </div>
  );
}

export default App;

import React from "react";
import Header from "./components/Header/Header";
import Banner from "./components/Banner/Banner";
import ServicesBanner from "./components/ServicesBanner/ServicesBanner";
import Footer from "./components/Footer/Footer";
import "./index.css";

function App() {
  return (
    <div>
      <Header />
      <Banner />
      <ServicesBanner />
      <Footer />
    </div>
  );
}

export default App;

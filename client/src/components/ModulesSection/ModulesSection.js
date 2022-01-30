import React from "react";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import ModuleBox from "../ModulesBox/ModulesBox";
import "./ModulesSection.css";
import LogOut from "../LogOut/LogOut";
const ModulesSection = () => {
  return (
    <div className="modules__section">
      <Header />
      <div className="modules__section_boxes">
        <ModuleBox name="Movimientos" />
        <ModuleBox name="Productos" />
        <ModuleBox name="Reportes" />
        <LogOut />
      </div>
      <Footer />
    </div>
  );
};

export default ModulesSection;

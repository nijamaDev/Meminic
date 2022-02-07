import React from "react";
import Footer from "../Footer/Footer";
import ModuleBox from "../ModulesBox/ModulesBox";
import "./ModulesSection.css";
import LogOut from "../LogOut/LogOut";


const ModulesSection = () => {
  const { user, isAuthenticated } = useAuth0();
  console.log("user: ", user.email);
  return (
    <div className="modules__section">
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

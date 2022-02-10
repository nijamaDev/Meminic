import React from "react";
import ModuleBox from "../ModulesBox/ModulesBox";
import "./ModulesSection.css";
import LogOut from "../LogOut/LogOut";

const ModulesSection = () => {
  return (
    <div className="modules__section">
      <div className="modules__section_boxes">
        <ModuleBox name="Usuarios" />
        <ModuleBox name="Movimientos" />
        <ModuleBox name="Productos" />
        <ModuleBox name="Reportes" />
        <LogOut />
      </div>
    </div>
  );
};

export default ModulesSection;

import React from "react";
import ModuleBox from "../ModulesBox/ModulesBox";
import "./ModulesSection.css";
import LogOut from "../LogOut/LogOut";
import { ModuleUserItems } from "./ModulesItemsBox";
const ModulesSection = () => {
  return (
    <div className="modules__section">
      <div className="modules__section_boxes">
        <ModuleBox name="Usuarios" items={ModuleUserItems} />
        <ModuleBox name="Movimientos" />
        <ModuleBox name="Productos" />
        <ModuleBox name="Reportes" />
        <LogOut />
      </div>
    </div>
  );
};

export default ModulesSection;
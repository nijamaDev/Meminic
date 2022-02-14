import React from "react";
import ModuleBox from "../ModulesBox/ModulesBox";
import "./ModulesSection.css";
import LogOut from "../LogOut/LogOut";
import {
  ModuleUserItems,
  ModuleMovementsItems,
  ModuleProductsItems,
  ModuleReportsItems,
} from "./ModulesItemsBox";
const ModulesSection = () => {
  return (
    <div className="modules__section">
      <div className="modules__section_boxes">
        <ModuleBox name="Usuarios" items={ModuleUserItems} />
        <ModuleBox name="Movimientos" items={ModuleMovementsItems} />
        <ModuleBox name="Productos" items={ModuleProductsItems} />
        <ModuleBox name="Reportes" items={ModuleReportsItems} />
        <LogOut />
      </div>
    </div>
  );
};

export default ModulesSection;

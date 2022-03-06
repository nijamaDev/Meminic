import React from "react";
import ModuleBox from "../ModulesBox/ModulesBox";
import LogOut from "../LogOut/LogOut";
import "./ModulesSection.css"

const ModulesSectionAdmin = ({ Modules }) => {
  return (
    <div className="modules__section">
      <div className="modules__section_boxes">
        {Modules.map((item, index) => {
          return (
            <ModuleBox
              key={index}
              name={item.moduleName}
              items={item.modulesItems}
            />
          );
        })}
      </div>
      <LogOut />
    </div>
  );
};

export default ModulesSectionAdmin;

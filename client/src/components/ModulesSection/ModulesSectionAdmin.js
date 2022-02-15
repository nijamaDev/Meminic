import React from "react";
import ModuleBox from "../ModulesBox/ModulesBox";
import LogOut from "../LogOut/LogOut";

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
        <LogOut />
      </div>
    </div>
  );
};

export default ModulesSectionAdmin;
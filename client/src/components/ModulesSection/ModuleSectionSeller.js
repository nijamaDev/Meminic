import React from "react";
import ModuleBox from "../ModulesBox/ModulesBox";
import "../ModulesBox/ModulesBox.css";
import LogOut from "../LogOut/LogOut";

const ModulesSectionSeller = ({ Modules }) => {
  return (
    <div className="modules__section__seller">
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

export default ModulesSectionSeller;

import React from "react";
import arrow from "../../assets/arrow.svg";
import "./ModulesBox.css";
const ModuleBox = ({ name }) => {
  return (
    <div className="module__box">
      <h2 className="module__name">{name}</h2>
      <button onClick={() => {}} className="module__button">
        <img src={arrow} alt="<"></img>
      </button>
    </div>
  );
};

export default ModuleBox;

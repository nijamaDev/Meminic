import React, { useState } from "react";
import arrowDown from "../../assets/arrow_down.svg";
import arrowUp from "../../assets/arrow_up.svg";
import "./ModulesBox.css";
const ModuleBox = ({ name }) => {
  const [isClicked, setIsClicked] = useState(false);
  return (
    <div className="module__box">
      <h2 className="module__name">{name}</h2>
      <button
        onClick={() => setIsClicked(!isClicked)}
        className="module__button"
      >
        {isClicked ? (
          <img src={arrowUp} alt=">"></img>
        ) : (
          <img src={arrowDown} alt="<"></img>
        )}
      </button>
    </div>
  );
};

export default ModuleBox;

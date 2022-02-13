import React, { useState } from "react";
import arrowDown from "../../assets/arrow_down.svg";
import arrowUp from "../../assets/arrow_up.svg";
import "./ModulesBox.css";

const ModuleBox = ({ name, items }) => {
  const [isClicked, setIsClicked] = useState(false);
  return (
    <div className="module__box">
      <h2 className="module__name">{name}</h2>
      <button
        onClick={() => setIsClicked(!isClicked)}
        className="module__button"
      >
        {isClicked ? (
          <>
            <img src={arrowUp} alt=">"></img>
            <div className="module__items__container">
              <ul>
                {items.map((item, index) => {
                  return (
                    <li key={index}>
                      <a href={item.url}>{item.title}</a>
                    </li>
                  );
                })}
              </ul>
            </div>
          </>
        ) : (
          <img src={arrowDown} alt="<"></img>
        )}
      </button>
    </div>
  );
};

export default ModuleBox;

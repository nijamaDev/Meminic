import React, { useState } from "react";
import { Link } from "react-router-dom";
import arrowDown from "../../assets/arrow_down.svg";
import arrowUp from "../../assets/arrow_up.svg";
import "./ModulesBox.css";

const ModuleBox = ({ name, items }) => {
  const [isClicked, setIsClicked] = useState(false);
  return (
    <div className={isClicked ? "module__box__clicked" : "module__box"}>
      <h2 className="module__name">{name}</h2>
      <button
        onClick={() => setIsClicked(!isClicked)}
        className="module__button"
      >
        {isClicked ? (
          <>
            <img src={arrowUp} alt=">"></img>
            <div className="module__box__list">
              <ul className="module__items__list">
                {items.map((item, index) => {
                  return (
                    <li key={index}>
                      <Link to={item.url}>{item.title}</Link>
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

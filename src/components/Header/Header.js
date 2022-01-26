import React, { useState } from "react";
import "./Header.css";
import { MenuItems } from "./MenuItems";
import { GoThreeBars } from "react-icons/go";
import { AiOutlineClose } from "react-icons/ai";

const Header = () => {
  const [isClicked, setIsClicked] = useState(false);

  return (
    <nav className="navbar__container">
      <h1 className="navbar__container__logo">
        Méminic
      </h1>
      {/*Manejamos el ícono que se mostrará cuando se haga click en el menú 
      hamburguesa y cuando este esté inactivo*/}
      <div className="navbar__menu-icon" onClick={() => setIsClicked(true)}>
        {isClicked ? <AiOutlineClose /> : <GoThreeBars className="navbar__hamburguer"/>}
      </div>
      <div className="menu-icon"></div>
      <ul className={isClicked ? "nav-menu active" : "nav-menu"}>
        {MenuItems.map((item, index) => {
          return (
            <li key={index}>
              <a className={item.cName} href={item.url}>
                {item.title}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export default Header;

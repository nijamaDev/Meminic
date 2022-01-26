import React, { useState } from "react";
import "./Header.css";
import { MenuItems } from "./MenuItems";
import { GoThreeBars } from "react-icons/go";
import { AiOutlineClose } from "react-icons/ai";
import logo from "../../assets/logo.svg";
const Header = () => {
  const [isClicked, setIsClicked] = useState(false);
  return (
    <nav className="navbar__container">
      <a href="/">
        <img src={logo} className="navbar__container__logo" alt="méminic" />
      </a>
      {/*Manejamos el ícono que se mostrará cuando se haga click en el menú 
      hamburguesa y cuando este esté inactivo*/}
      <div
        className="navbar__menu-icon"
        onClick={() => setIsClicked(!isClicked)}
      >
        {isClicked ? (
          <AiOutlineClose />
        ) : (
          <GoThreeBars className="navbar__hamburguer" />
        )}
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

import React, { useState } from "react";
import "./Header.css";
import { GoThreeBars } from "react-icons/go";
import { AiOutlineClose } from "react-icons/ai";
import Menu from "../Menu/Menu";
import logo from "../../assets/logo.svg";
import { MenuItems } from "../Header/MenuItems";
const Header = () => {
  const [isClicked, setIsClicked] = useState(false);
  return (
    <nav className="navbar__container">
      <a href="/">
        <img src={logo} className="navbar__container__logo" alt="méminic" />
      </a>
      <div>
        <div className="menu-icon"></div>
        <div
          className="navbar__menu-icon"
          onClick={() => setIsClicked(!isClicked)}
        >
          {isClicked ? (
            <AiOutlineClose className="navbar__close" />
          ) : (
            <GoThreeBars className="navbar__hamburguer" />
          )}
        </div>
        <Menu
          NameClass={isClicked ? "nav-menu active" : "nav-menu"}
          Items={MenuItems}
        />
      </div>
    </nav>
  );
};

export default Header;

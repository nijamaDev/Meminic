import React from "react";
import Menu from "../Menu/Menu";
import "./Footer.css";
import { AiOutlineTwitter } from "react-icons/ai";
import { AiOutlineInstagram } from "react-icons/ai";
import { CgFacebook } from "react-icons/cg";
const Footer = () => {
  return (
    <div>
      <h1 className="menu__title"> Menú </h1>
      <Menu NameClass="menu__footer" />
      <div className="menu__container__social">
        <a href="/">
          <CgFacebook />
        </a>
        <a href="/">
          <AiOutlineTwitter />
        </a>
        <a href="/">
          <AiOutlineInstagram />
        </a>
      </div>
      <div className="menu__divider"></div>

      <p className="menu__copyright">
        Copyright © 2022 Avocado Team. <br></br>
        All Rights Reserved.
      </p>
    </div>
  );
};

export default Footer;

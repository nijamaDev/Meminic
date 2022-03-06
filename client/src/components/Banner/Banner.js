import React from "react";
import shop_img from "../../assets/shop_home_image.jpg";
import "./Banner.css";

const Banner = () => {
  return (
    <div id="about" className="banner__container">
      <div className="banner__container__image">
        <img
          src={shop_img}
          alt="Ilustración de tienda colombiana"
          className="img__home"
        />
      </div>
      <div className="over__text">
        <p className="p__home"> Cada </p>
        <p className="p__home"> detalle </p>
        <p className="p__home"> en su sitio </p>
      </div>
    </div>
  );
};

export default Banner;

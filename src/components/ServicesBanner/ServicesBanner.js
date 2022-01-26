import React from "react";
import check from "../../assets/check_icon.svg";
import "./ServicesBanner.css";
import { ServicesItems } from "./ServicesItems";

const ServicesBanner = () => {
  return (
    <div className="services__container">
      <h1 className="services__title"> MÉMINIC </h1>
      <p className="services__text">
        {" "}
        Te ayudamos a gestionar el inventario y la contabilidad de tu tienda de
        una forma eficiente y segura.{" "}
      </p>
      <h3 className="services__offered"> ¿Qué ofrecemos? </h3>
      {ServicesItems.map((item, index) => {
        return (
          <p className={item.servicesClass} key={index}>
            {" "}
            <img src={check} className="services__icon" alt="check icon" />{" "}
            {item.title}
          </p>
        );
      })}
    </div>
  );
};

export default ServicesBanner;

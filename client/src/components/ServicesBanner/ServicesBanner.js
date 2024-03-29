import React from "react";
import check from "../../assets/check_icon.svg";
import "./ServicesBanner.css";
import { ServicesItems } from "./ServicesItems";
import RegisterButton from "../RegisterButton/RegisterButton";
import { useAuth0 } from "@auth0/auth0-react";
import { Link } from "react-router-dom";

const ServicesBanner = () => {
  const { loginWithRedirect } = useAuth0();
  return (
    <div className="services__container">
      <h1 className="services__title"> MÉMINIC </h1>
      <p className="services__text">
        {" "}
        Te ayudamos a gestionar el inventario y la contabilidad de tu tienda de
        una forma eficiente y segura.{" "}
      </p>
      <h3 id="offer" className="services__offered">
        {" "}
        ¿Qué ofrecemos?{" "}
      </h3>
      <div className="services__offered__div">
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
      <h3 className="services__offered_text">
        ¿Estas interesado en trabajar con nosotros? Regístrate para empezar
      </h3>
      <div id="register" className="services__buttons">
        <RegisterButton onClick={() => loginWithRedirect()} />
        <Link className="services__button__contact" to="/contact">contáctanos
        </Link>
      </div>
    </div>
  );
};

export default ServicesBanner;

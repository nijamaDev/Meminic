
import React, {Component} from 'react';
import check from "./check_icon.svg"
import "./Services.css";

const Services_Div = () => {


  return (
    <div className="services_container">
          <h1 className='title'> MÉMINIC </h1>
          <p className='p_services'> Te ayudamos a gestionar el inventario y la contabilidad de tu tienda de una forma eficiente y segura. </p>
          <h3 className='font2'> ¿Qué ofrecemos? </h3>
          <p className='p_services'> <img src={check} className="left" alt="check icon" />Simplicidad </p>
          <p className='p_services'> <img src={check} className="left" alt="check icon" /> Seguridad </p>
          <p className='p_services'> <img src={check} className="left" alt="check icon" /> Eficiencia </p>

    </div>
  );
};

export default Services_Div;
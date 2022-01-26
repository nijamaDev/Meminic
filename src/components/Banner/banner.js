
import React, {Component} from 'react';
import shop_img from "./shop_home_image.jpg"
import "./Banner.css";

const Banner_home = () => {


  return (
    <div className="banner_container">
          <img  src={shop_img} className="banner-home" alt="Ilustración de tienda colombiana"  className="img_home"/>
          <div className='over_text1'>   
            <p className='p_home'> Cada </p>
            <p className='p_home'> detalle </p>
            <p className='p_home'> en su sitio </p>
          </div>
    </div>
  );
};

export default Banner_home;




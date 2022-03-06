import ContactForm from "../ContactForm/ContactForm";
import map_img from "../../assets/map.png";
import map_point_img from "../../assets/map-point.png";
import call_img from "../../assets/call.png";
import msg_img from "../../assets/msg.png";
import compass_img from "../../assets/compass.png";
import "./ContactPage.css"
import Card from "../Card/Card";


const ContactPage = () => {
  return (
      <>
      <div className="contact__full">
        <div className="contact__container">
          <h1 className="contact__title">
          Contacto
          </h1>
          <p className="contact__top__text">
          Méminic ofrece servicios de calidad que incluyen el control de inventarios y contabilidad de tu tienda
          </p>
        </div>
        <div className="contact__form__container">
          <div className="contact__form__block">
            <h2 className="contact__form__title">Contáctanos</h2>
            <ContactForm />
          </div>
        </div>
        <div className="map__container">
          {/* <div className="map__img__point__container"> */}
            <img className="map__point__img" src={map_point_img} alt="map point" />
          {/* </div> */}
          {/* <div className="map__img__container"> */}
            {/* <img className="map__img" src={map_img} alt="map" /> */}
          {/* </div> */}
        </div>
        <div className="info__container">
          <Card img={call_img} title="TELÉFONO" content="2672076"/>
          <Card img={msg_img} title="EMAIL" content="support@meminic.com"/>
          <Card img={compass_img} title="DIRECCIÓN" content="2247 Lunetta Street, TX 76301"/>
        </div>
      </div>
      </>
  );
};

export default ContactPage;
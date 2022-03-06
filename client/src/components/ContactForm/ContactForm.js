import FormBase from "../FormBase/FormBase";
import "./ContactForm.css";
import Modal from "../Modal/Modal";
import check_icon from "../../assets/check_icon.svg";
import error_icon from "../../assets/error_icon.svg";
import { useState } from "react";

const ContactForm = () => {
  const [toggleSuccess, setToggleSuccess] = useState(false);
  const [toggleFail, setToggleFail] = useState(false);
  const itemsInput = [
    {
      title: "email ",
      type: "text",
      required: "Este campo es requerido",
      message: "Ingrese un email válido",
      value: /\S+@\S+\.\S+/,
      placeholder: "Email",
    },
    {
      title: "motivo ",
      type: "text",
      required: "Este campo es requerido",
      placeholder: "Motivo",
    },
    {
      title: "mensaje ",
      type: "text",
      required: "Este campo es requerido",
      placeholder: "Mensaje",
    },
  ];

  const sendEmail = (data, e) => {
    e.preventDefault();
    window.emailjs.send(
      'service_p28c6ys', 'template_pezzinj', data
  ).then(res => {
      e.target.reset();
      setToggleSuccess(true);
      console.log('Email successfully sent!')
  }).catch((error) => {
    setToggleFail(true);
  });
  }

  return (
    <>
      { !toggleSuccess ? (
          <FormBase
            formId="contact-form"
            onSubmitFunct={sendEmail}
            buttonName="ENVIAR"
            itemsInput={itemsInput}
          />
        ) : (
          <>
            <Modal
              message={"El mensaje fue enviado con exito! Nos comunicaremos lo más pronto posible"}
              textButton={"Aceptar"}
              title={"Email enviado"}
              iconURL={check_icon}
              altImg={"check"}
              onClickEvent={() => setToggleSuccess(!toggleSuccess)}
            ></Modal>
            <FormBase
              formId="contact-form"
              onSubmitFunct={sendEmail}
              buttonName="ENVIAR"
              itemsInput={itemsInput}
            />
          </>
        )}

    { !toggleFail ? (
              <> </>
            ) : (
              <>
                <Modal
                  message={"No fue posible enviar el correo, por favor intente nuevamente."}
                  textButton={"Aceptar"}
                  title={"Email no enviado"}
                  iconURL={error_icon}
                  altImg={"check"}
                  onClickEvent={() => setToggleFail(!toggleFail)}
                ></Modal>
                <FormBase
                  formId="contact-form"
                  onSubmitFunct={sendEmail}
                  buttonName="ENVIAR"
                  itemsInput={itemsInput}
                />
              </>
            )}
      

    </>
  );
};

export default ContactForm;

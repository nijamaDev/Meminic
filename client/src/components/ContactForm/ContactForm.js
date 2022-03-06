import FormBase from "../FormBase/FormBase";
import "./ContactForm.css";

const ContactForm = () => {
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
  const onSubmitFunct = (data) => {
    console.log(data);
  };
  return (
    <>
      <FormBase
        formId="ContactForm"
        onSubmitFunct={onSubmitFunct}
        buttonName="ENVIAR"
        itemsInput={itemsInput}
      />
    </>
  );
};

export default ContactForm;

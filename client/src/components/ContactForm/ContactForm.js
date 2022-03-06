import FormBase from "../FormBase/FormBase";
import "./ContactForm.css"


const ContactForm = () => {
  const itemsInput = [{
    title:"email ",
    type:"text",
    required: true,
    placeholder:"Email"
  },{
    title:"motivo ",
    type:"text",
    required: true,
    placeholder:"Motivo"
  },{
    title:"mensaje ",
    type:"text",
    required: true,
    placeholder:"Mensaje"
  }];
  const onSubmitFunct = (data) => {
    console.log(data);
  }
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
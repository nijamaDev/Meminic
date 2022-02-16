import React from "react";
import "../FormBase/FormBase.css";
import FormBase from "../FormBase/FormBase";
import SectionTitle from "../SectionTitle/SectionTitle";

const ManagementBox = ({
  img,
  title,
  obj,
  formId,
  onSubmitFunct,
  buttonName,
  itemsInput,
  itemsSelect,
}) => {
  return (
    <div className="user__management__box">
      <SectionTitle imgUrl={img} imgAlt="image_icon" title={title} />
      <>
        <FormBase
          obj={obj}
          formId={formId}
          onSubmitFunct={onSubmitFunct}
          buttonName={buttonName}
          itemsInput={itemsInput}
          itemsSelect={itemsSelect}
        />
        <div className="bar"> </div>
      </>
    </div>
  );
};

export default ManagementBox;

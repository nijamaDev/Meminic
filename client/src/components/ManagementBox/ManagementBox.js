import React from "react";
import "./ManagementBox.css";
import FormBase from "../FormBase/FormBase";

const ManagementBox = ({  img ,obj,formId, onSubmitFunct,   name, buttonName , itemsInput,itemsSelect }) => {
  
  return (
    <div className="userManagement__box">
      <img src={img} alt=">" className="img__box"></img> 
      <h2 className="box__name">{name}</h2>
      <>
      <FormBase obj = {obj} formId={formId} onSubmitFunct={onSubmitFunct}   
          buttonName ={buttonName} itemsInput = {itemsInput} itemsSelect = {itemsSelect}/>
      <div className="bar"> </div>
      </>
      
    </div>
  );
};


export default ManagementBox;
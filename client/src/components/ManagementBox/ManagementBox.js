import React from "react";
import "./ManagementBox.css";
import { useForm } from "react-hook-form";
import Options from "../SelectOptions/SelectOptions";

const ManagementBox = ({  img ,obj,formId, onSubmitFunct,   name, buttonName , itemsInput,itemsSelect }) => {
  const { register, handleSubmit } = useForm();
  const onSubmit = onSubmitFunct;

  return (
    <div className="userManagement__box">
      <img src={img} alt=">" className="img__box"></img> 
      <h2 className="box__name">{name}</h2>
      <>
      <form id={formId}  
              onSubmit= {handleSubmit(onSubmit)} className= "form__user" >
          <div className="userToolBox">
            {itemsInput.map((item, index) => {
              return (
                <div className="item__form" key={index}>
                  <div className="div__item">
                    <label htmlFor={item.title} className="label__item">
                      {" "}
                      {item.title}
                    </label>
                  </div>
                  <input
                    className="input__form"
                    type={item.type}
                    id={item.title}
                    {...register(item.title, { required: true })}
                    placeholder={item.placeholder}
                  />
                </div>
              );
            })}
            {itemsSelect.map((item, index) => {
              return (

                <div key={index} className="item__form">
                <div className="div__item">
                <label htmlFor={item.title} className="label__item" >  {item.title} </label>
                </div>
                  <select {...register(item.title, {required: true}) } className="select__form" >   
                   <Options  values={item.options}  />
                   
                   </select> 
                </div>
              );
            })}
          </div>
          <button type="submit" className="button__form"> {buttonName} </button>
        </form>
        <div className="bar"> </div>
      </>
      
    </div>
  );
};


export default ManagementBox;
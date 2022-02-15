import React from "react";
import Options from "../SelectOptions/SelectOptions";
import "./UsersManagementBox.css";
import { useForm } from "react-hook-form";


const UsersManagementBox = ({  img ,user,formId, onSubmitFunct,   name, buttonName ,items }) => {

  const { register, handleSubmit } = useForm();
  const onSubmit = onSubmitFunct;

  //const onError = (errors, e) => console.log(errors, e);

  return (
    <div className="userManagement__box">
      <img src={img} alt=">" className="img__box"></img> 
      <h2 className="box__name">{name}</h2>
      <>
        <form id={formId}  
              onSubmit= {handleSubmit(onSubmit)} className= "form__user" >
          <div className="userToolBox">
            <div className="item__form">
            <div className="div__item">
              <label htmlFor="email" className="label__item"> Email:</label>
            </div>
            <input
              className="input__form"
              type="text"
              id="email"
              {...register("Email", {required: true})}
              placeholder="correo@ejemplo.com"
            />
            </div>
            {items.map((item, index) => {
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


//<img src={arrowUp} alt=">"></img> para el icono

/**<button
        onClick={() => setIsClicked(!isClicked)}
        className="module__button"
      ></button> */
export default UsersManagementBox;
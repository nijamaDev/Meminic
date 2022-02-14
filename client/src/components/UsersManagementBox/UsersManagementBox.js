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
      <img src={img} alt=">"></img> 
      <h2 className="box__name">{name}</h2>
      <>
        <form id={formId}  
              onSubmit= {handleSubmit(onSubmit)} >
          <div>
            <label htmlFor="email">Email:</label>
            <input
              type="text"
              id="email"
              {...register("Email", {required: true})}
              placeholder="correo@ejemplo.com"
            />
            {items.map((item, index) => {
              return (

                <div key={index}>
                <label htmlFor={item.title}  >  {item.title} </label>
                  <select {...register(item.title, {required: true})   }>   
                   <Options  values={item.options}  />
                   </select> 
                </div>
              );
            })}
          </div>
          <button type="submit"> {buttonName} </button>
        </form>
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
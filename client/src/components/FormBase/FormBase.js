import React from "react";
import "./FormBase.css";
import { useForm } from "react-hook-form";
import Options from "../SelectOptions/SelectOptions";

const FormBase = ({
  obj,
  formId,
  onSubmitFunct,
  buttonName,
  itemsInput,
  itemsSelect,
}) => {
  const addInputs = () => {
    var add = false;
    if (typeof itemsInput !== "undefined") {
      add = true;
    }
    return add;
  };

  const addSelects = () => {
    var add = false;
    if (typeof itemsSelect !== "undefined") {
      add = true;
    }
    return add;
  };
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = onSubmitFunct;
  return (
    <form id={formId} onSubmit={handleSubmit(onSubmit)} className="form__user">
      <div className="userToolBox">
        {addInputs() ? (
          <>
            {itemsInput.map((item, index) => {
              return (
                <React.Fragment key={index}>
                  <div className="item__form">
                    <div className="div__item">
                      <label htmlFor={item.title} className="label__item">
                        {" "}
                        {item.title}
                      </label>
                    </div>
                    <input
                      className="input__form"
                      type={item.type}
                      id={item.title.slice(0, -1)}
                      {...register(item.title.slice(0, -1), {
                        required: item.required,
                        pattern: {
                          value: item.value,
                          message: item.message,
                        },
                      })}
                      placeholder={item.placeholder}
                    />
                  </div>
                  <div className="container__message">
                    <p className="div__item"></p>
                    <p className="input__message__error">
                      {errors[item.title.slice(0, -1)]?.message}
                    </p>
                  </div>
                </React.Fragment>
              );
            })}
          </>
        ) : (
          <></>
        )}

        {addSelects() ? (
          <>
            {itemsSelect.map((item, index) => {
              return (
                <div key={index} className="item__form">
                  <div className="div__item">
                    <label htmlFor={item.title} className="label__item">
                      {" "}
                      {item.title}{" "}
                    </label>
                  </div>
                  <select
                    {...register(item.title.slice(0, -1), {
                      required: true,
                    })}
                    className="select__form"
                  >
                    <Options values={item.options} />
                  </select>
                </div>
              );
            })}
          </>
        ) : (
          <></>
        )}
      </div>
      <button type="submit" className="button__form">
        {" "}
        {buttonName}{" "}
      </button>
    </form>
  );
};

export default FormBase;

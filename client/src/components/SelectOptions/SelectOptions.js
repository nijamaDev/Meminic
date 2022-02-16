import React from "react";

const Options = ({ values }) => {
  return (
    <>
      {values.map((item, index) => {
        return (
          <option value={item} key={index}>
            {" "}
            {item}
          </option>
        );
      })}
    </>
  );
};

export default Options;

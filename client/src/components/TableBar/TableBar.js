import React, { useState } from "react";

const TableBar = ({ rowTitles, productsData }) => {
  const [counter, setCounter] = useState(0);
  const addOnClick = (index) => {
    console.log("index", index, "add", productsData[index]);
    productsData[index].amount = productsData[index].amount + 1;
    setCounter(counter + 1);
  };
  const substractOnClick = (index) => {
    productsData[index].amount = productsData[index].amount - 1;
    setCounter(counter - 1);
  };

  return (
    <table className="products__table">
      <thead>
        <tr className="products__table__titles">
          {rowTitles.map((item, key) => {
            return <th key={key}>{item.title}</th>;
          })}
        </tr>
      </thead>
      <tbody className="">
        {productsData.map((item, key) => {
          return (
            <tr key={key}>
              <td> {item.name} </td>
              <td>
                <div>
                  <button onClick={() => substractOnClick(key)}>-</button>
                  {item.amount}
                  <button onClick={() => addOnClick(key)}>+</button>
                </div>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default TableBar;

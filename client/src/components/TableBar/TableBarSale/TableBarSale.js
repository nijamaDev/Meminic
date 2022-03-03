import React, { useState } from "react";
import "../TableBar.css";

const TableBarSale = ({ rowTitles, productsData }) => {
  const [counter, setCounter] = useState(0);
  const addOnClick = (index) => {
    productsData[index].amount = productsData[index].amount + 1;
    setCounter(counter + 1);
  };
  const substractOnClick = (index) => {
    if (productsData[index].amount > 1) {
      productsData[index].amount = productsData[index].amount - 1;
      setCounter(counter - 1);
    }
  };

  return (
    <table className="products__table">
      <thead className="products__table__head">
        <tr>
          {rowTitles.map((item, key) => {
            return <th key={key}>{item.title}</th>;
          })}
        </tr>
      </thead>
      <tbody className="products__table__body">
        {productsData.map((item, key) => {
          return (
            <tr key={key}>
              <td> {item.name} </td>
              <td>
                <div>
                  <button
                    className="products__table__button"
                    onClick={() => substractOnClick(key)}
                  >
                    -
                  </button>
                  {item.amount}
                  <button
                    className="products__table__button"
                    onClick={() => addOnClick(key)}
                  >
                    +
                  </button>
                </div>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default TableBarSale;

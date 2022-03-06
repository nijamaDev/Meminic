import React from "react";
import "../TableBar.css";
const TableBarVisualize = ({ rowTitles, productsData }) => {
  return (
    <>
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
                <td> {item.date} </td>
                <td> {item.accSupport}</td>
                <td> {item.movementType} </td>
                <td> {item.unitValue} </td>
                <td> {item.weightedValue} </td>
                <td> {item.inputAmount} </td>
                <td> {item.inputValue} </td>
                <td> {item.outputAmount} </td>
                <td> {item.outputValue} </td>
                <td> {item.balanceAmount} </td>
                <td> {item.balanceValue} </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
};

export default TableBarVisualize;

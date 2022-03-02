import React from "react";

const TableBar = ({ rowTitles, productsData }) => {
  return (
    <table>
      <thead>
        <tr>
          {rowTitles.map((item, key) => {
            return <th key={key}>{item.title}</th>;
          })}
        </tr>
      </thead>
      <tbody>
        {productsData.map((item, key) => {
          return (
            <tr key={key}>
              <td>{item}</td>
              <td>cantidad:0</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default TableBar;

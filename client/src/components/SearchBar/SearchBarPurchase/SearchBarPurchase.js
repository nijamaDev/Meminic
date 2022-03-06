import "../SearchBar.css";

import TableBarPurchase from "../../TableBar/TableBarPurchase/TableBarPurchase";
import SearchBarPurchaseEvents from "./SearchBarPurchaseEvents";
import { MdOutlineDeleteForever } from "react-icons/md";
function SearchBarPurchase({
  placeholder,
  data,
  rowTitles,
  resultsArray,
  initialProducts,
}) {
  const { filteredData, addToTable, addProduct, wordEntered, handleFilter } =
    SearchBarPurchaseEvents(data, resultsArray);

  return (
    <div className="search">
      {addProduct ? (
        <TableBarPurchase rowTitles={rowTitles} productsData={resultsArray} />
      ) : (
        <table className="products__table">
          <thead className="products__table__head">
            <tr>
              {rowTitles.map((item, key) => {
                return <th key={key}>{item.title}</th>;
              })}
            </tr>
          </thead>
          <tbody className="products__table__body">
            {initialProducts.map((item, key) => {
              return (
                <tr key={key}>
                  <td> {item.name} </td>
                  <td>
                    <div>
                      <button className="products__table__button">-</button>1
                      <button className="products__table__button">+</button>
                    </div>
                  </td>
                  <td>
                    <p>4000</p>
                  </td>
                  <td className="accsupport__container">
                    <p>123</p>
                    <MdOutlineDeleteForever className="product__delete" />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
      <div className="searchInputs">
        <input
          className="search__input__bar"
          type="text"
          placeholder={placeholder}
          value={wordEntered}
          onChange={handleFilter}
        />
      </div>
      {filteredData.length !== 0 && (
        <div className="dataResult">
          {filteredData.map((value, key) => {
            return (
              <label
                key={key}
                className="dataItem"
                onClick={() => addToTable(value.productName)}
              >
                {value.productName}
              </label>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default SearchBarPurchase;

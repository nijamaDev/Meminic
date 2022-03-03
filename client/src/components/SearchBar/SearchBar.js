import { useState } from "react";
import "./SearchBar.css";
import TableBar from "../TableBar/TableBar";

function SearchBar({
  placeholder,
  data,
  rowTitles,
  resultsArray,
  initialProducts,
}) {
  const [filteredData, setFilteredData] = useState([]);
  const [wordEntered, setWordEntered] = useState("");
  const [addProduct, setAddProduct] = useState();
  const addToTable = (product) => {
    resultsArray.push({ name: product, amount: 1 });
    setAddProduct(true);
    setWordEntered("");
    setFilteredData([]);
  };

  const handleFilter = (event) => {
    const searchWord = event.target.value;
    setWordEntered(searchWord);
    const newFilter = data.filter((value) => {
      return value.productName.toLowerCase().includes(searchWord.toLowerCase());
    });

    if (searchWord === "") {
      setFilteredData([]);
    } else {
      setFilteredData(newFilter);
    }
  };

  return (
    <div className="search">
      {addProduct ? (
        <TableBar rowTitles={rowTitles} productsData={resultsArray} />
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
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
      <div className="searchInputs">
        <input
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

export default SearchBar;

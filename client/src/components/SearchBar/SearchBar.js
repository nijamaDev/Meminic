import { useState } from "react";
import "./SearchBar.css";
import TableBar from "../TableBar/TableBar";
var productsList = [];

function SearchBar({ placeholder, data, rowTitles }) {
  const [filteredData, setFilteredData] = useState([]);
  const [wordEntered, setWordEntered] = useState("");
  const [addProduct, setAddProduct] = useState();
  const addToTable = (product) => {
    productsList.push({ name: product, amount: 0 });
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
        <TableBar rowTitles={rowTitles} productsData={productsList} />
      ) : (
        <></>
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

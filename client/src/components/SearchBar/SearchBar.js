import { useState } from "react";

function SearchBar({ placeholder, data }) {
  const [filteredData, setFilteredData] = useState([]);
  const [wordEntered, setWordEntered] = useState("");
  //const addToTable = () =>{};
  const handleFilter = (event) => {
    console.log("Popover", data);
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

  //   const clearInput = () => {
  //     setFilteredData([]);
  //     setWordEntered("");
  //   };

  return (
    <div className="search">
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
          {filteredData.slice(0, 15).map((value, key) => {
            return (
              // onclick={addToTable}
              <label className="dataItem">{value.productName}</label>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default SearchBar;

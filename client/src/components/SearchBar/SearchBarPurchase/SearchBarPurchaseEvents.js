import { useState } from "react";

const SearchBarPurchaseEvents = (data, resultsArray) => {
  const [filteredData, setFilteredData] = useState([]);
  const [wordEntered, setWordEntered] = useState("");
  const [addProduct, setAddProduct] = useState();
  const addToTable = (product) => {
    resultsArray.push({ name: product, amount: 1, unitValue: 0 });
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

  return { addToTable, handleFilter, filteredData, wordEntered, addProduct };
};
export default SearchBarPurchaseEvents;

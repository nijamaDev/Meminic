import { useState } from "react";

const SearchBarSaleEvents = (data, resultsArray) => {
  const [filteredData, setFilteredData] = useState([]);
  const [wordEntered, setWordEntered] = useState("");
  const [addProduct, setAddProduct] = useState();
  const addToTable = (product) => {
    if(resultsArray.length === 0){
      resultsArray.push({ name: product, amount: 1, accSupport: "" });
    }
    if(resultsArray.length !== 0){
      resultsArray.push({ name: product, amount: 1, accSupport: resultsArray[0].accSupport });
    }
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
export default SearchBarSaleEvents;

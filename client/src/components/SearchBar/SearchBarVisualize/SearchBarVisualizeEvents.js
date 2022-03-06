import { useState } from "react";
import MovementContext from "../../../context/MovementContext";

const SearchBarSaleEvents = (data, resultsArray) => {
  const { getMovements } = MovementContext();
  const [filteredData, setFilteredData] = useState([]);
  const [wordEntered, setWordEntered] = useState("");
  const [addProduct, setAddProduct] = useState();
  const [productSearched, setProductSearched] = useState("");
  const addToTable = (product) => {
    if(productSearched !== product){
      getMovements(product).then(function(response){
        for(let i = 0; i < resultsArray.length; i++){
          resultsArray.pop();
        }
        for(let i = 0; i < response.data.length ; i++){
          resultsArray.push({ 
            date: response.data[i].date,
            accSupport: response.data[i].accSupport,
            movementType: response.data[i].movementType,
            unitValue: response.data[i].unitValue,
            weightedValue: response.data[i].weightedValue,
            inputAmount : response.data[i].inputAmount,
            inputValue: response.data[i].inputValue,
            outputAmount: response.data[i].outputAmount,
            outputValue: response.data[i].outputValue,
            balanceAmount: response.data[i].balanceAmount,
            balanceValue: response.data[i].balanceValue
        }); 
        } 
        console.log("movimientos: " ,response);
        setAddProduct(true);
        setWordEntered("");
        setFilteredData([]);
        setProductSearched(product);
        
      });
    } 
    else{
        setAddProduct(true);
        setWordEntered("");
        setFilteredData([]);

    }
    // resultsArray.push({ name: product, amount: 1, accSupport: "" });
     
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

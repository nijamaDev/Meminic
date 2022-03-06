import "../SearchBar.css";
import TableBarVisualize from "../../TableBar/TableBarVisualize/TableBarVisualize";
import SearchBarVisualizeEvents from "./SearchBarVisualizeEvents";

function SearchBarVisualize({
  placeholder,
  data,
  rowTitles,
  resultsArray,
  initialMovements,
}) {
  const { filteredData, addToTable, addProduct, wordEntered, handleFilter } =
    SearchBarVisualizeEvents(data, resultsArray);

  return (
    <div className="search">
      {addProduct ? (
        <TableBarVisualize rowTitles={rowTitles} productsData={resultsArray} />
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
            {initialMovements.map((item, key) => {
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

export default SearchBarVisualize;

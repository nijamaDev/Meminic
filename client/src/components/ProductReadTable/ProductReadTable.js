import users_registered from "../../assets/users_registered.svg";
import SectionTitle from "../SectionTitle/SectionTitle";
import "../FormBase/FormBase.css";
import "../UserReadTable/ReadTable.css";

const ProductReadTable = ({ onClickTable, isClicked, Items }) => {
  return (
    <div className="user__management__box">
      <SectionTitle
        imgUrl={users_registered}
        altUrl="icon"
        title="Productos registrados"
      />
      <div className="user__management_options">
        <p>¿Desea consultar los productos registrados en su tienda?</p>
        <button className="button__form" onClick={onClickTable}>
          consultar
        </button>
      </div>
      {isClicked ? (
        <table width="100%" className="user__table">
          <thead className="product__table__head">
            <tr>
              <th className="">Referencia</th>
              <th className="">Producto</th>
            </tr>
          </thead>
          <tbody className="product__table__body">
            {Items.map((item, key) => {
              return (
                <tr key={key}>
                  <td>{item.reference}</td>
                  <td>{item.productName}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      ) : (
        <div></div>
      )}
    </div>
  );
};

export default ProductReadTable;

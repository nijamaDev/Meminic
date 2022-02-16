import users_registered from "../../assets/users_registered.svg";
import SectionTitle from "../SectionTitle/SectionTitle";
import "../FormBase/FormBase.css";
import "./ReadTable.css";

const UserReadTable = ({ onClickTable, isClicked, Items }) => {
  return (
    <div className="user__management__box">
      <SectionTitle
        imgUrl={users_registered}
        altUrl="icon"
        title="Usuarios registrados"
      />
      <div className="user__management_options">
        <p>¿Desea consultar los usuarios registrados en su tienda?</p>
        <button className="button__form" onClick={onClickTable}>
          consultar
        </button>
      </div>
      {isClicked ? (
        <table width="100%" className="user__table">
          <thead className="user__table__head">
            <tr>
              <th className="">Email</th>
              <th className="">Rol</th>
              <th className="">Estado</th>
            </tr>
          </thead>
          <tbody className="user__table__body">
            {Items.map((item, key) => {
              return (
                <tr key={key}>
                  <td>{item.email}</td>
                  <td>{item.role} </td>
                  {item.state === true ? <td>Activo</td> : <td>Inactivo </td>}
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

export default UserReadTable;

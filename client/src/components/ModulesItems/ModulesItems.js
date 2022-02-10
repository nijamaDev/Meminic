import "../ModulesBox/ModulesBox.css";
const ModulesItems = ({ Items }) => {
  return (
    <div className="module__box">
      <ul className="modules__items">
        {Items.map((item, index) => {
          return (
            <li key={index}>
              <a className={item.cName} href={item.url}>
                {item.title}
              </a>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default ModulesItems;

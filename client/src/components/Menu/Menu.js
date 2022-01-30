import React from "react";

const Menu = ({ NameClass, Items }) => {
  return (
    <div>
      <ul className={NameClass}>
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

export default Menu;

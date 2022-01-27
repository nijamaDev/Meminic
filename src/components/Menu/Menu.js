import React from "react";
import { MenuItems } from "../Header/MenuItems";

const Menu = ({ NameClass }) => {
  return (
    <div>
      <ul className={NameClass}>
        {MenuItems.map((item, index) => {
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

import React from "react";
import { Link } from "react-router-dom";
import LogOut from "../LogOut/LogOut";

const Menu = ({ NameClass, Items }) => {
  return (
    <div>
      <ul className={NameClass}>
        {Items.map((item, index) => {
          return (
            <li key={index}>
              <Link className={item.cName} to={item.url}>
                {item.title}
              </Link>
            </li>
          );
        })}
          <LogOut/>
      </ul>
    </div>
  );
};

export default Menu;

import React, { useState } from "react";
import { Link } from "react-router-dom";
import { studentDropdown, startupDropdown } from "./NavItems";
import './Dropdown.css';

function Dropdown(type) {
  const [dropdown, setDropdown] = useState(false);
  if(type.type === "student"){
    return (
      <>
        <ul className="submenu">
          {studentDropdown.map((item) => {
            return (
              <li key={item.id}>
                <Link to={item.path} onClick={() => setDropdown(false)}>
                  <img src={item.icon} id="icon"></img>
                  {item.title}
                </Link>
              </li>
            );
          })}
        </ul>
      </>
    );
  }
  return (
    <>
      <ul className="submenu">
        {startupDropdown.map((item) => {
          return (
            <li key={item.id}>
              <Link to={item.path} onClick={() => setDropdown(false)}>
                <img src={item.icon} id="icon"></img>
                {item.title}
              </Link>
            </li>
          );
        })}
      </ul>
    </>
  );
}

export default Dropdown;
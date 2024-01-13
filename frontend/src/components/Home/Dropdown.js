import React, { useState } from "react";
import { Link } from "react-router-dom";
import './Dropdown.css';

function Dropdown(drop) {
  const [dropdown, setDropdown] = useState(false);
  return (
    <>
      <ul className="homeSubmenu">
        {Object.values(drop).map((item) => {
          return (
            <li key={item.id}>
              <Link to={item.path} onClick={() => setDropdown(false)}>
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
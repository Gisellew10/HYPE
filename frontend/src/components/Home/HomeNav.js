import React from 'react'; // ES6 js
import { useState, useRef } from "react";
import {Link} from 'react-router-dom'
import { navItems } from "./NavItems";
import Dropdown from "./Dropdown";
import './HomeNav.css';

export function HomeNav() {
    const [dropdown, setDropdown] = useState("");
  return (
    <>
      <nav className="homeNavbar">
        <Link to="/">
            <img src="/images/HYPE.png" alt="HYPE Logo" id="logo"></img>
        </Link>
        <ul className="homeNav-items">
          {navItems.map((item) => {
            if (item.title === "Login") {
              return (
                <li
                  key={item.id}
                  className={item.cName}
                  onMouseEnter={() => setDropdown("login_t")}
                  onMouseLeave={() => setDropdown("login_f")}
                >
                  <Link>{item.title}</Link>
                  {dropdown === "login_t" && <Dropdown {...item.drop}/>}
                </li>
              );
            }

            else if (item.title === "Sign Up") {
              return (
                <li
                  key={item.id}
                  className={item.cName}
                  onMouseEnter={() => setDropdown("signup_t")}
                  onMouseLeave={() => setDropdown("signup_f")}
                >
                  <Link>{item.title}</Link>
                  {dropdown === "signup_t" && <Dropdown {...item.drop}/>}
                </li>
              );
            }

            return (
              <li key={item.id} className={item.cName}>
                <Link to={item.path}>{item.title}</Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </>
  );
}

export default HomeNav;
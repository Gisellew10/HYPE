import React from 'react'; // ES6 js
import { useState, useEffect, useRef, useCallback } from "react";
import {Link} from 'react-router-dom'
import { studentNav, startupNav } from "./NavItems";
import Dropdown from "./Dropdown";
import './Nav.css';

import { useStartupProfileContext } from '../../contexts/startupProfileContext';
import { useStudentProfileContext } from "../../contexts/studentProfileContext";
import { useSagas } from "../../sagas/sagaContext";

export function Nav( props ) {
  const { location } = props;
  const sagas = useSagas();
  let star_profile = useStartupProfileContext();
  let stu_profile = useStudentProfileContext();

  const [dropdown, setDropdown] = useState(false);
  const userRef = useRef();
  let type = "";

  if (localStorage.getItem("NavType")) {
    type = JSON.parse(localStorage.getItem("NavType")).storeType;
  }
  
  const clickOutside = useCallback(
    (e) => {
      if (
        userRef.current &&
        dropdown &&
        !userRef.current.contains(e.target)
      ) {
        setDropdown(false);
      }
    },
    [dropdown]
  );
  
  useEffect(() => {
    document.addEventListener("mousedown", clickOutside);
  }, [clickOutside]);

  useEffect(() => {
    const fetchData = async () => {
      if(type === "student"){
        await sagas.getStartupProfile();
      }
      else if(type === "startup"){
        await sagas.getStudentProfile();
      }
    };

    fetchData();
  }, []);

  function renderLeftNav(nav){
    return nav[0].map((item) => (
      <li key={item.id} id={location === item.title ? 'here' : ''}>
        <Link to={item.path}>
          <img src={item.icon} id="icon" alt={item.title} />
          <div className='text-wrapper'>{item.title}</div>
        </Link>
      </li>
    ));
  }

  function renderRightNav(nav){
    return nav[1].map((item) => {
      if (item.id === 5) {
        item.icon2 = dropdown ? "/images/up.png" : "/images/drop.png";
        item.title = type === "student" ? stu_profile.name : star_profile.companyName;
        return (
          <li key={item.id} ref={userRef} id='profile'>
            <Link onClick={() => setDropdown(!dropdown)}>
              <img src={item.icon} className="icon" alt={item.title} />
              <div id='name' className='text-wrapper'>{item.title}</div>
              <img src={item.icon2} className="drop" alt="Dropdown" />
            </Link>
            {dropdown === true && <Dropdown type={type} id="dropdown"/>}
          </li>
        );
      } else {
        return (
          <li key={item.id} id='chat'>
            <Link to={item.path}>
              <img src={item.icon} className="icon" alt={item.title} />
              <div className='text-wrapper'>{item.title}</div>
            </Link>
          </li>
        );
      }
    });
  }


  if(type === "student"){
    return (
      <>
        <div className='navbar'>
          <div className='leftNav'>
            <li>
              <Link to="/">
                <img src="/images/HYPE.png" alt="HYPE Logo" id="home"></img>
              </Link>
            </li>
            {renderLeftNav(studentNav)}
          </div>
          <div className='rightNav'>{renderRightNav(studentNav)}</div>
        </div>
        <div className="content-wrapper"></div>
      </>
    );
  }
  else{
    return (
      <>
        <div className='navbar'>
          <div className='leftNav'>
            <li>
              <Link to="/">
                <img src="/images/HYPE.png" alt="HYPE Logo" id="home"></img>
              </Link>
            </li>
            {renderLeftNav(startupNav)}
          </div>
          <div className='rightNav'>{renderRightNav(startupNav)}</div>
        </div>
        <div className="content-wrapper"></div>
      </>
    );
  }
}

export default Nav;
import React from 'react';
import './style.css'
import Nav from '../../components/NavBar/Nav';

function New() {
    return(
        <div className='internPage'>
            <Nav location="Internships"/>
            <p id="title">Exciting new features coming soon!!!</p>
        </div>
    );
}

export default New;
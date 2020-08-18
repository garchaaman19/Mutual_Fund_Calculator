import React from 'react';
import './App.css';
import { Link } from "react-router-dom";

function Nav() {
  return (
    <nav>
        <h3>
            <ul className="nav-links">
            <li>Home</li>
             <Link to='/about'>
                <li>about</li>
             </Link>
            </ul>
        </h3>



    </nav>
  );
}

export default Nav;

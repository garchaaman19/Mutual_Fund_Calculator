import React from 'react';
import './App.css';
import { Link } from "react-router-dom";

function Nav() {
  return (
    <nav>

<h2>AXIS MUTUAL FUND HOUSE</h2>
        <h3>
            <ul className="nav-links">
             <Link to='/history'>
                <li>Mutual Fund Calculator</li>
             </Link>

            </ul>
        </h3>

    </nav>
  );
}

export default Nav;

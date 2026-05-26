import React from "react";
import { NavLink } from "react-router-dom";

import './NavLinks.css';

const NavLinks = props => {
    return (
        <ul className="nav-links">
            <li>
                <NavLink to="/" exact>Create Purchase</NavLink>
            </li>
            <li>
                <NavLink to="/purchases">All Purchases</NavLink>
            </li>
            <li>
                <NavLink to="/receipts">Receipts</NavLink>
            </li>
        </ul>
    );
}

export default NavLinks;

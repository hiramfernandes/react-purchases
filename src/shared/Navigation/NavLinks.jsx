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
                <NavLink to="/purchases">All Purchase</NavLink>
            </li>
            <li>
                <NavLink to="/auth">Authenticate</NavLink>
            </li>
        </ul>
    );
}

export default NavLinks;

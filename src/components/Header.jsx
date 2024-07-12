import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
function Header() {
  const { user, logout } = useContext(AuthContext);
  const navItems = [
    {
      name: "Dashboard",
      link: "",
      active: user, // set true/false based on user is logged in or not
    },
    {
      name: "Login",
      link: "/login",
      active: !user,
    },
    {
      name: "Register",
      link: "/register",
      active: !user,
    },
  ];
  return (
    <header className="header">
      <nav className="navbar">
        <div className="logo">RLDash</div>
        <ul className="nav_list">
          {navItems.map((item, index) =>
            item.active ? (
              <NavLink
                key={index}
                to={item.link}
                className={({ isActive }) =>
                  isActive ? "navItem activeNavItem" : "navItem"
                }>
                {item.name}
              </NavLink>
            ) : null
          )}
          {user && (
            <button onClick={logout} className="navItem">
              Logout
            </button>
          )}
        </ul>
      </nav>
    </header>
  );
}

export default Header;

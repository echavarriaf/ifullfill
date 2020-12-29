import React, { useState, useEffect } from "react";
// import logo from "../../images/logo.png";
import "./Navbar.css";
import { Link } from "react-router-dom";
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import { sidebarData } from "./MenuItems";
import { IconContext } from "react-icons";

function Navbar() {
  const [sidebar, setSidebar] = useState(false);

  const showSidebar = () => setSidebar(!sidebar);

  useEffect(() => {
    const navbar = document.getElementById("navbar");
    let lastScroll = 0;
    window.addEventListener("scroll", () => {
      const currentScroll = window.pageYOffset;
      if (currentScroll <= 0) {
        navbar.style.top = "0";
        return;
      }

      if (currentScroll > lastScroll) {
        navbar.style.top = "-100px";
      } else {
        navbar.style.top = "0";
      }

      lastScroll = currentScroll;
    });
  }, []);

  return (
    <>
      <IconContext.Provider
        value={{ color: "#fff", width: "1rem", height: "1rem" }}
      >
        <div className="navbar" id="navbar">
          <Link to="#" className="menu-bars">
            <FaIcons.FaBars onClick={showSidebar} />
          </Link>
        </div>
        <nav className={sidebar ? "nav-menu active" : "nav-menu"}>
          <ul className="nav-menu-items">
            <li className="navbar-toggle">
              <Link to="#" className="menu-bars-close">
                <AiIcons.AiOutlineClose onClick={showSidebar} />
              </Link>
            </li>
            {sidebarData.map((item, index) => {
              return (
                <li key={index} className={item.cName}>
                  <Link to={item.path}>
                    {item.icon}
                    <span>{item.title}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </IconContext.Provider>
    </>
  );
}

export default Navbar;

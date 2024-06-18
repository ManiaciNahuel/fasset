import React, { useState } from "react";
import logo from "../../assets/images/Logotipo.jpg";
/* import userIcon from "../../assets/png/user1.png";
import lupaIcon from "../../assets/png/lupa.png"; */
import cartIcon from "../../assets/png/shopping-cart.png";
import hamMenu from "../../assets/svg/ham-menu.svg";
import hamMenuClose from "../../assets/svg/ham-menu-close.svg";


export const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="header">
      <div className="header__content">
        <div className="header__logo-container">
          <a href="/">
            <img
              src={logo}
              alt="Logo"
              className="header__logo-img"
            />
          </a>
        </div>
        <div className="header__main">
          <ul className="header__links">
           {/*  <li className="header__link-wrapper">
              <a href="./#section" className="header__link">
                <div className="search-icon-container">
                <img
                src={lupaIcon}
                alt="user-icon"
            />
                </div>
              </a>
            </li>
            <li className="header__link-wrapper">
              <a href="./#section" className="header__link">
                <img
                src={userIcon}
                alt="user-icon"
            />
              </a>
            </li> */}
             <li className="header__link-wrapper">
              <a href="./#section" className="header__link">
                <img
                src={cartIcon}
                alt="user-icon"
            />
              </a>
            </li>
          </ul>
          {/* Hamburger menu para pantallas chicas*/}
          <div className="header__main-ham-menu-cont">
            <button onClick={() => setIsOpen(!isOpen)}
              className={`${isOpen ? 'btn-open' : ''}`}>
              <img
                src={isOpen ? hamMenuClose : hamMenu}
                alt="hamburger menu"
                className="header__main-ham-menu "
              />
            </button>
          </div>
        </div>
      </div>
      {isOpen && (
        <div className="header__sm-menu">
          <div className="header__sm-menu-content">
            <ul className="header__sm-menu-links">
              <li className="header__sm-menu-link">
                <a href="./"> Inicio </a>
              </li>

              <li className="header__sm-menu-link">
                <a href="./#section"> Section 1 </a>
              </li>

              <li className="header__sm-menu-link">
                <a href="./"> Section 2 </a>
              </li>

            </ul>
          </div>
        </div>
      )}

    </header>
  );
};

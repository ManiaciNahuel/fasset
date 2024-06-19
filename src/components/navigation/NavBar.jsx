import React, { useState } from "react";
import logo from "../../assets/images/Logotipo.jpg";
import cartIcon from "../../assets/png/shopping-cart.png";
import hamMenu from "../../assets/svg/ham-menu.svg";
import hamMenuClose from "../../assets/svg/ham-menu-close.svg";
import { Link } from "react-router-dom";



export const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="header">
      <div className="header__content">
        <div className="header__logo-container">
          <Link to="/">
            <img src={logo} alt="Logo" className="header__logo-img" />
          </Link>
        </div>
        <div className="header__main">
          <ul className="header__links">
            <li className="header__link-wrapper">
              <Link to="/cart" className="header__link">
                <img src={cartIcon} alt="Carrito de compras" />
              </Link>
            </li>
          </ul>
          {/* Hamburger menu para pantallas chicas */}
          <div className="header__main-ham-menu-cont">
            <button onClick={() => setIsOpen(!isOpen)} className={`${isOpen ? 'btn-open' : ''}`}>
              <img
                src={isOpen ? hamMenuClose : hamMenu}
                alt="hamburger menu"
                className="header__main-ham-menu"
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
                <Link to="/">Inicio</Link>
              </li>
              <li className="header__sm-menu-link">
                <Link to="/section">Section 1</Link>
              </li>
              <li className="header__sm-menu-link">
                <Link to="/section">Section 2</Link>
              </li>
              <li className="header__sm-menu-link">
                <Link to="/cart">Carrito</Link>
              </li>
            </ul>
          </div>
        </div>
      )}
    </header>
  );
};



/* 
import userIcon from "../../assets/png/user1.png";
import lupaIcon from "../../assets/png/lupa.png"; 

<li className="header__link-wrapper">
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
</li> 
*/
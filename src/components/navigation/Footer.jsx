import React from "react";
import logo from "../../assets/images/Isotipo.jpg"
import instagram from "../../assets/png/insta-ico.png"

export const Footer = () => {
  return (
    <footer className="main-footer">
      <div className="main-container">
        <div className="main-footer__upper">
          <div className="main-footer__row main-footer__row-1">
           
            <div className="main-footer__social-cont">
              {/* Instagram */}
              <a target="_blank" rel="noreferrer" href="https://instagram.com">
                <img
                  src={instagram}
                  alt="Logo"
                  className="main-footer__icon"
                />
              </a>
              {/* Gmail */}
              <a target="_blank" rel="noreferrer" href="https://gmail.com">
                <img
                  src={instagram}
                  alt="Logo"
                  className="main-footer__icon"
                />
              </a>
            </div>
            <a rel="noreferrer" href="./#">
                <img
                  src={logo}
                  alt="Logo"
                  className="main-footer__logo-img"
                />
              </a>
          </div>
          <div className="main-footer__row main-footer__row-2">
            <h4 className="heading heading-sm text-lt">¿Quienes somos?</h4>
            <p className="main-footer__short-desc">
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Blanditiis commodi optio perferendis nisi eveniet odio veniam ratione cum accusantium distinctio tempore consectetur quis assumenda nulla quibusdam vero, modi consequatur error.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

import React from "react";
import logo from "../../assets/images/Logotipo.jpg"
import instagram from "../../assets/png/insta-ico.png"
import wsp from "../../assets/png/whatsapp-ico.png"

export const Footer = () => {
  return (
    <footer className="main-footer">
      <div className="main-container">
        <div className="main-footer__upper">
          <div className="main-footer__row main-footer__row-1">

            <div className="main-footer__social-cont">
              {/* Instagram */}
              <a target="_blank" rel="noreferrer" href="https://www.instagram.com/fasset.ar">
                <img
                  src={instagram}
                  alt="Logo"
                  className="main-footer__icon"
                />
              </a>
              {/* Instagram */}
              <a target="_blank" rel="noreferrer" href="https://wa.me/+5493512185195">
                <img
                  src={wsp}
                  alt="Logo"
                  className="main-footer__icon"
                />
              </a>
            </div>
            <div className="main-footer__mail">
              fasset.argentina@gmail.com
              
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
              Somos una marca de ropa única que celebra la evolución constante y las diversas fases de la vida de cada persona. Nuestra misión es acompañarte en cada uno de tus momentos, brindándote prendas que se adaptan a tu estilo y a tus necesidades cambiantes. Entendemos que la vida es una serie de transformaciones y creemos que tu ropa debe reflejar esa dinámica. Por eso, nuestras colecciones FASSET están diseñadas para ofrecerte comodidad, versatilidad y estilo, permitiéndote expresarte libremente en cada etapa de tu viaje personal. Somos más que una marca de ropa; somos tu aliado en cada fase de tu vida.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

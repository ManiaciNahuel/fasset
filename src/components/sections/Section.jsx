import React from 'react'
import { Item } from '../products/Item'
import remeraNegra from "../../assets/jpeg/remeraNegra2L.jpg"
import remeraBlanca from "../../assets/jpeg/remeraBlanca2L.png"
import baner from "../../assets/png/Untitled-1.png"

export const Section = () => {
  return (
    <section id='section' className="section sec-pad">
      {/*  <!-- SECTION --> */}
      <div className="main-container">
        <div className="section__content">
          <div className="section__content-details">
            <Item image={remeraNegra} title={"Remera Negra"} price={1000} id={1} />
          </div>
          <div className="section__content-details">
            <Item image={remeraBlanca} title={"Remera Blanca"} price={1000} id={2}/>
          </div>
        </div>
        <div className="section__banner">
          <img src={baner} alt="banerPublicidades" />
        </div>
      </div>
    </section>

  )
}
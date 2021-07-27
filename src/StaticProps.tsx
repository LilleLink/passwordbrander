import React, { useState } from 'react'
import imgURL from '../assets/symbol.png';

export function StaticHeader(props : any) {
    return (
        <header>
            <a href="#">
                <img src={props.imagePath}/>
            </a>
        </header>
    )
}
  
export function StaticFooter(props : any) {
    return (
    
        <div className="footerWrapper">
            <footer>
                <div className="row footerlogo">
                    <img src={imgURL}/>
                </div>
                <div className="row">
                    <p>Epost:</p>
                    <a href="mailto:exempel@exempel.se">exempel@exempel.se</a>
                    <p>Vardagar 07.00 - 17.00</p>
                </div>
                <div className="row">
                    <p>Telefon:</p>
                    <a href="tel:123-456789">123-45 67 89</a>
                    <p>Vardagar 07.00 - 17.00</p>
                </div>
            </footer>
        </div>

    )
}
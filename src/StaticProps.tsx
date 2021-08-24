import React, { useState } from 'react'
import imgURL from '../assets/symbol.png';
import footerLogo from '../assets/hhaLogo.png';

export function StaticHeader(props : any) {
    return (
        <header>
            <div className="headerContainer">
                <a href="https://www.holistichealthacademy.se/">
                    <img id="headerLogo" src={props.imagePath}/>
                </a>

                <p>Holistic Health Academy - Lösenord</p>
            </div> 
        </header>
    )
}
  
export function StaticFooter(props : any) {
    return (
    
        <div className="footerWrapper">
            <footer>
                <div className="row footerlogo">
                    <img id="footerLogo" src={footerLogo}/>
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
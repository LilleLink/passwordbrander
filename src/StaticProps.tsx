import React, { useState } from 'react'
import mainlogo from '../assets/mainlogo.png';
import rightarrowImageURL from '../assets/rightarrow.png';

export function StaticHeader() {
    return (
        <header>
            <div className="headerContainer">
                <a href="https://www.holistichealthacademy.se/">
                    <img id="headerLogo" src={mainlogo}/>
                </a>

                <h2 id="titleText">{import.meta.env.VITE_COMPANY_NAME} - Lösenord</h2>
            </div> 
        </header>
    )
}
  
export function StaticFooter() {
    return (
        <footer>
            <div className="footerContainer">
                <div className="footerFloatToLeft">
                    &copy; {new Date().getFullYear()} {import.meta.env.VITE_COMPANY_NAME}
                </div>
                <div className="footerFloatToRight">
                    <a href={`${import.meta.env.VITE_MAIN_SITE}`} target="_blank">Till huvudhemsida 
                    <img src={rightarrowImageURL} id="rightarrow"/></a>
                </div>
            </div>
        </footer>
    )
}
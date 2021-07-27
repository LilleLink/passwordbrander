import React, { EventHandler, useState } from "react";
import { postReq } from "./dataReq";
import { getReq } from "./dataReq";
import { genPass } from "./dataReq";
import generateImgURL from '../assets/generate.png';
import { Redirect } from "react-router-dom";

//TEMP

var URLgen: any | null = null;
// Formulärobjekt
// Tror att denna skall flyttas till en egen klass, då man kan göra såna och de verkar coola.
// Då får man lite objekt-orienterad funktionalitet som vi saknar här.
// Så har de gjort i denna tutorialen https://reactjs.org/docs/forms.html
// Tänker att man kke flyttar varje sån klass till sin egen fil, som importeras här, och sammanställs i "App"
// funktionen ovan.
export default function Form(props: any) {
    const [password, setPassword] = useState("");
    const [passwordIsValid, setPasswordIsValid] = useState(true);
    const [expiryDate, setExpiryDate] = useState(30);
    const [maxViews, setMaxViews] = useState(50);
    const [passwordURL, setPasswordURL] = useState("");
    const [passwordSent, setPasswordSent] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (passwordIsValid) {
          URLgen = await postReq(password, expiryDate, maxViews);
          setPasswordURL(URLgen);
          setPasswordSent(true);
        }
    };

    let sendMail = () => {
        const mailto: string =
        "mailto:?subject=Ditt%20l%C3%B6senord&body=Hej%2C%0A%0AH%C3%A4r%20kommer%20ditt%20l%C3%B6senord.%20%0AV%C3%A4nligen%20klicka%20p%C3%A5%20l%C3%A4nken%20nedan%20f%C3%B6r%20att%20h%C3%A4mta%20det.%20Denna%20l%C3%A4nk%20%C3%A4r%20bara%20tillg%C3%A4nglig%20f%C3%B6r%20" +
        Views() +
        ".%0A%0A" +
        URLgen +
        "%0A%0AMed%20v%C3%A4nliga%20h%C3%A4lsningar%2C%0ADialect%20Support";
        window.location.href = mailto;
    };

    function copyToClipboard() {
        navigator.clipboard.writeText(URLgen);
    }

    function Days(){
      const amountDays: string = expiryDate + " dagar"
      if (expiryDate < 2){
        const amountDays = expiryDate + " dag"
        return(amountDays)
      }
      return(amountDays)
    }

    function Views(){
      const amountViews: string = maxViews + " visningar"
      if (maxViews < 2){
        const amountViews = maxViews + " visning"
        return(amountViews)
      }
      return(amountViews)
    }

    function formRefreshed() {
      if(passwordSent) {
        setPasswordSent(false);
      }
    }

    function passwordChangeHandler(e : React.ChangeEvent<HTMLInputElement>) {
      setPassword(e.target.value);
      formRefreshed();

      if (e.target.value.includes('å') || e.target.value.includes('ä') || e.target.value.includes('ö')) {
        setPasswordIsValid(false);
      } else {
        setPasswordIsValid(true);
      }
    }

    function expiryDateChangeHandler(e : React.ChangeEvent<HTMLInputElement>) {
      setExpiryDate(e.target.valueAsNumber);
      formRefreshed();
    }

    function maxViewsChangeHandler(e : React.ChangeEvent<HTMLInputElement>) {
      setMaxViews(e.target.valueAsNumber);
      formRefreshed();
    }

    function PasswordGenerator() {

      return (
        <button className="generateButton" onClick={async () => setPassword(await genPass())}><img src={generateImgURL}/></button>
      )
    }

    function LinkSection() {
        return (
            <div>
                <br/>
                <div className="horizontalLine"></div>
                <br />
    
                <h3>Din delningslänk är:</h3>
                <input className="textField" readOnly value={passwordURL}/> <br/>
    
                <button className="button" onClick={sendMail}>Skicka mail</button>
                <button className="button" onClick={copyToClipboard}>Kopiera länk</button>
            </div>
            
        )
    }

    function InvalidPasswordMessage() {

      const style = {
        color: 'red'
      }

      return (
        <div>
          <p style={style}>Lösenordet kan ej innehålla å, ä eller ö.</p>
        </div>
      )
    }

    return (
    <div className="Content">

        <div>
            <h3>Lösenord</h3>
            <div className="verticalAlignTop">
              <input className="textField" type="text" value={password} onChange={passwordChangeHandler}/><br/>
              {passwordIsValid ? null : <InvalidPasswordMessage/>}
              <PasswordGenerator/>
            </div>
            
            <br/>
            <br/>
        </div>
        
        <form onSubmit={handleSubmit}>    
            <h3>Inaktivera länk och ta bort lösenord efter: </h3><br/>
            <input className="rangeSlider" min="1" max="60" type="range" value={expiryDate} onChange={expiryDateChangeHandler}/> 
            <p>{Days()}</p>
            <br/>

            <input className="rangeSlider" min="1" max="100" type="range" value={maxViews} onChange={maxViewsChangeHandler}/>
            <p>{Views()}</p>
            <br/>
            <p>(vad som än kommer först)</p>

            <button className="button" type="submit">Skapa länk</button>
        </form>

        {passwordSent ? <LinkSection/> : null}

    </div>
  );
}



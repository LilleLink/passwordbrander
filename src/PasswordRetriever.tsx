import React, { useState } from 'react'
import { postReq } from './dataReq';
import { getReq } from './dataReq';

export default function PasswordRetriever(props : any) {

    const [areaText, setAreaText] = useState("");
    const [boxClicked, setBoxClicked] = useState(false);
    const [daysRemaining, setDaysRemaining] = useState(0);
    const [viewsRemaining, setViewsRemaining] = useState(0);
    const [expired, setExpired] = useState(false);
    const id : string = props.id; 
    let requestObject : any;

    async function getPassword(e : any) {
        requestObject = await getReq(id);
        setAreaText(requestObject.payload);
        e.target.value = requestObject.payload;

        setViewsRemaining(requestObject.views_remaining);
        setDaysRemaining(requestObject.days_remaining);
        setExpired(requestObject.expired)

        setBoxClicked(true);
        
    }

    function dayParser(){
        const amountDays: string = daysRemaining + " dagar"
        if (daysRemaining < 2){
          const amountDays = daysRemaining + " dag"
          return(amountDays)
        }
        return(amountDays)
    }
  
    function viewParser(){
    const amountViews: string = viewsRemaining + " gånger"
    if (viewsRemaining < 2){
        const amountViews = viewsRemaining + " gång"
        return(amountViews)
    }
    return(amountViews)
    }

    function copyToClipboard() {
        navigator.clipboard.writeText(areaText);
    }

    function CopyButton() {
        return (
            <div>
                <button className="button" onClick={copyToClipboard}>Kopiera lösenord</button>
            </div>
        )
    }

    function PasswordButton() {
        return(
            <div>
                <button className="button" onClick={getPassword}>Klicka här för att hämta lösenord</button><br></br>
            </div>
        )
    }

    function PasswordText() {
        return(
            <div>
                <input readOnly className="textField" value={areaText}/><br/>
            </div>
        )
    }

    function PasswordInfoText() {
        return (
            <div>
                {viewsRemaining == 0 ? <p>Detta är sista gången du kan visa lösenordet.</p> : <p>Lösenordet kan visas {viewParser()}.</p>}
                <p>Lösenordet slutar gälla om {dayParser()}.</p>
            </div>
        )
    }

    if (expired == false) {
        return (
            <div className="Content">
                <h3>Med hjälp av denna sida kan du få ditt lösenord</h3>
                {boxClicked ? null : <PasswordButton/>}
                {boxClicked ? <PasswordText/> : null}
                {boxClicked ? <CopyButton/> : null}
                {boxClicked ? <PasswordInfoText/> : null}

            </div>
        )
    } else {
        return (
            <div className="Content">
                <h3>Lösenordet har gått ut</h3>
                <p>Kontakta supporten om du behöver en ny länk.<br/>
                Se kontaktuppgifter längst ned på sidan.</p>

            </div>
        )
    }

    
}
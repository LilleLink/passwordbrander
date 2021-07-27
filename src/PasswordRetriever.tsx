import React, { useState } from 'react'
import { postReq } from './dataReq';
import { getReq } from './dataReq';

export default function PasswordRetriever(props : any) {

    const [areaText, setAreaText] = useState("");
    const [boxClicked, setBoxClicked] = useState(false);
    const id : string = props.id; 

    async function getPassword(e : any) {
        const password : string = await getReq(id);
        setAreaText(password);
        e.target.value = password;
        setBoxClicked(true);
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

    return (
        <div className="Content">
            <h2>Med hjälp av denna sida kan du få ditt lösenord</h2>
            {boxClicked ? null : <PasswordButton/>}
            {boxClicked ? <PasswordText/> : null}
            {boxClicked ? <CopyButton/> : null}
            
        </div>
    )
}
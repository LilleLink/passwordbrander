import React, { useEffect, useState, } from 'react';

export interface GETdataFormat {
  payload: string,
  expired: boolean,
  days_remaining: number,
  views_remaining: number,
  first_view: boolean,
  deleted: boolean,
}

//Runs the POST request towards the backendpw site. Variables are set through postReq function
async function http<T>(request: RequestInfo): Promise<T> {
  const response = await fetch(request);
  const body = await response.json();
  return body;
}

export async function getReq(idPass: string) {

  const URLfget = `${import.meta.env.VITE_FRONTEND_URL}/get/` + idPass;

  //Calls "http" function with data that is needed for correct response
  const response = await http<GETdataFormat>(
    new Request(
      URLfget,
      {
        method: "GET",
        headers: { 'Accept': 'application/json' },
      }
    )
  );

  if(response.deleted === true || response.expired === true || response.payload == null){
    response.payload = "Lösenordet har gått ut eller blivit borttaget";
  }
  return(
    response
  )
}


//Function called from App.tsx. Gets called when handleSubmit runs
export async function postReq(payload: string, expire_after_days: number , expire_after_views: number,) {

  //Specifies what data is needed from the response
  interface POSTdataFormat {
    url_token: string
    error: string
    status: 500
  }

  const URLfpost = `${import.meta.env.VITE_FRONTEND_URL}/post/`;

  //Calls "http" function with data that is needed for correct response
  const response = await http<POSTdataFormat>(
    new Request(
      URLfpost,
      {
        method: "post",
        headers: { 'Content-Type': 'application/json'},
        body: JSON.stringify({
          password:{
          "payload": payload, 
          "expire_after_days": expire_after_days, 
          "expire_after_views": expire_after_views
          }
        })
      }
    )
  );

  //Make up for backend adding +1 to "expire after views"
  await getReq(response.url_token)

  console.log(response)
  if (response.status != null){
    return(
      "Något gick tyvärr fel. Försök igen senare"
    )
  }
  //Creates an URL to send back
  return(
    `${import.meta.env.VITE_FRONTEND_URL}/p/` + response.url_token
  )
}

//Fetches random passwords from dinopass.com
export async function genPass() {

  var password: string = "";
  const response = await fetch('https://makemeapassword.ligos.net/api/v1/passphrase/plain?wc=4&ups=4&whenUp=StartOfWord&nums=3&whenNum=StartOrEndOfWord&minCh=16&sp=false',{
  headers: { 'Content-Type': 'text/plain;charset=UTF-8'},
  })
  .then(function (response) {
	  // The API call was successful!
	  return response.text();
  }).then(function (html) {
	  // This is the HTML from our response as a text string
    password = html
  });

  const outputPass: string = await password

  function capitalizeFirstLetter(string: string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  return(
    capitalizeFirstLetter(outputPass)
  )
}
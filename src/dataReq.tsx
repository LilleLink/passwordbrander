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
  //if(!response.ok){
  //  throw Error(response.statusText)
  //}
  const body = await response.json();
  //console.log(body)
  return body;
}

export async function getReq(idPass: string) {

  /*const getURL = "http://localhost:80/get/"+idPass;

  const response : any = await fetch(getURL, {
    method: "GET",
    headers: {'Accept': 'application/json'}
  })*/

  const URLfget = "http://localhost:80/get/" + idPass;

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

  /*const postURL = "http://localhost:80/post";

  const response : any = await fetch(postURL, {
    method: "POST",
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({
      password: {
        "payload": payload,
        "expire_after_days": expire_after_days,
        "expire_after_views": expire_after_views
      }
    })
  })*/

  //Specifies what data is needed from the response
  interface POSTdataFormat {
    url_token: string
    error: string
    status: 500
  }

  //Calls "http" function with data that is needed for correct response
  const response = await http<POSTdataFormat>(
    new Request(
      "http://localhost:80/post/",
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
    'http://localhost:80/p/' + response.url_token
  )
}


export async function genPass() {

  var password: string = "";
  const response = await fetch('https://www.dinopass.com/password/simple',{
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
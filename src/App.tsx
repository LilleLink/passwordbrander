import React, { useState } from 'react'
import { BrowserRouter as Router, Link, Switch, Route, Redirect, useParams } from "react-router-dom";
import Form from './Form';
import './App.css'
import {StaticHeader, StaticFooter} from './StaticProps';
import PasswordRetriever from './PasswordRetriever';

// Huvud "Appen" där allt laddas in. T.ex. formulärobjektet med "<Form/>"
function App() {

  return (
    <Router>
        <Switch>
          <Route exact path="*/p/:id" component={GetPassword}/>
          <Route exact path="/" component={PostPassword}/>
          <Route component={NotFound}/>
        </Switch>
    </Router>
  )
}


function PostPassword() {

  return (
    <div className="App">
      <StaticHeader/>

      <main>
        <Form/>
      </main>

      <StaticFooter/>
      
    </div>
  )
}

function GetPassword() {

  const {id} : any = useParams();
  
  return (
    <div className="App">
      <StaticHeader/>

      <main>
        <PasswordRetriever id={id}/>
      </main>

      <StaticFooter/>
      
    </div>  
  )

}

function NotFound() {
  return (
    <div className="App">
      <StaticHeader/>

      <main>
        <h1>Error: 404</h1>
        <h2>Hoppsan! Sidan du letar efter finns inte...</h2>
      </main>

      <StaticFooter/>
    </div>
  )
}

export default App

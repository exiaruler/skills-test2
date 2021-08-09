import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import React, {useEffect,useState} from "react";
import {
  BrowserRouter
    as Router, Switch, Route, Link, useParams, BrowserRouter
} from "react-router-dom";
import Routers from './components/RouterSwitch';

function App() {
  return (
    
    <div >
        <Router>
      <header className="App-header">
        <h1>Contacts</h1>
      </header>
      <Routers/>
      </Router>
     
    </div>
  );
}

export default App;

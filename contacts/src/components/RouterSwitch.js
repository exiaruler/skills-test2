import React from 'react';
import Contact from './Contact';
import ContactList  from './ContactList';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect
  } from "react-router-dom";

  /*
  Pathway of pages
  */
  function RouterSwitch(){
    return(
        <div>
            <Switch>
                <Route exact path="/"
                      render={() => {
                        return <Redirect to="/contact-list" />;
                      }}></Route>
                      <Route path="/contact-list" component={ContactList}>
                          </Route> 
                <Route path="/contact/:id"  component={Contact}>
                </Route>
                
            </Switch>
        </div>
    )
  }
  export default RouterSwitch;
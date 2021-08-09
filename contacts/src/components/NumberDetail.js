import React, {useEffect,useState} from "react";
import {
    BrowserRouter
      as Router, Switch, Route, Link, useParams, BrowserRouter,useHistory
  } from "react-router-dom";
  import { Card,Button,Container,Col,Row } from "react-bootstrap";
function NumberDetail(prop){

    return(
        <div>
            <p className="numberDropHead">Phone Number</p>
            <p className="para">{prop.phone}</p>
        </div>
    )
}export default NumberDetail;
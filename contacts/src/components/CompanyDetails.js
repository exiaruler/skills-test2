import React, {useEffect,useState} from "react";
import {
    BrowserRouter
      as Router, Switch, Route, Link, useParams, BrowserRouter,useHistory
  } from "react-router-dom";
  import { Card,Button,Container,Col,Row } from "react-bootstrap";
function CompanyDetails(company){
    return(
        <div>
            <Card >
              <Card.Body>
                <Card.Title>Memo</Card.Title>
                <Card.Text>
                <p>{company.catchPhrase}</p>
                </Card.Text>
                <Card.Title>Industry</Card.Title>
                <Card.Text>
                {company.bs}
                </Card.Text>
              </Card.Body>
                </Card>
        </div>
    )
}
export default CompanyDetails;
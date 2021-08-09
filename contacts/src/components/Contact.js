import React, {useEffect,useState} from "react";
import axios from 'axios';
import ReactHover, { Trigger, Hover } from "react-hover";
import {
    BrowserRouter
      as Router, Switch, Route, Link, useParams, BrowserRouter,useHistory
  } from "react-router-dom";
  import CompanyDetails from "./CompanyDetails";    
  import { Card,Button,Container,Col,Row } from "react-bootstrap";
  //pop over settings
  const optionsCursorTrueWithMargin = {
    followCursor: true,
    shiftX: -500,
    shiftY: -70,
  };
  
function Contact(){
    //text display
    const [name,setName]=useState("");
    const [username,setUsername]=useState("");
    const[email,setEmail]=useState("");
    const[address,setAddress]=useState({});
    const[phone,setPhone]=useState("");
    const[website,setWebsite]=useState("");
    const[company,setCompany]=useState({});
    const history=useHistory();
    const params=useParams();
    // get individual contact 
    const getContact = async ()=>{
            try{
              
              await axios({
                method:"GET",
                url:"https://jsonplaceholder.typicode.com/users/"+params.id,
              }).then((res)=>{
                setName(res.data.name);
                setUsername(res.data.username);
                setEmail(res.data.email);
                setAddress(res.data.address);
                setPhone(res.data.phone);
                setWebsite(res.data.website);
                setCompany(res.data.company);
      
              });
            }catch(err){
              console.error(err.message);
          }
    }
    // back to contact-list
    function back() {
        history.push("/contact-list");
      }

      // display text
      useEffect(() => {
        getContact();
        

      }, []);
    return(
        <div>
        <Container>
  <Row md={4}>
    <Col>
    <div className="mb-2 backButton">
    <Button onClick={back} size="lg" >Back</Button>
    </div>
    </Col>
    <Col xs={6}>   <div className="App para">

                <Card >
              <Card.Body>
                <Card.Title>Name</Card.Title>
                <Card.Text>
                <ReactHover options={optionsCursorTrueWithMargin }>
              <Trigger type="trigger">
              <p>{name}</p>
              </Trigger>
              <Hover type="hover">
                <Card >
              <Card.Body>
                <Card.Title>Username</Card.Title>
                <Card.Text>
                <p>{username}</p>
                </Card.Text>
              </Card.Body>
                </Card>
              </Hover>
            </ReactHover>
                </Card.Text>
                <Card.Body>

                </Card.Body>
                <Card.Title>Email</Card.Title>
                <Card.Text>
                {email}
                </Card.Text>
                <Card.Title>Address</Card.Title>
                <Card.Text>
                {address.suite}, {address.street},{address.city},{address.zipcode}
                </Card.Text>
                <Card.Title>Phone</Card.Title>
                <Card.Text>
                  {phone}
                </Card.Text>
                <Card.Title>Website</Card.Title>
                <Card.Text>
                  {website}
                </Card.Text>
                <Card.Title>Workplace</Card.Title>
                <Card.Text>
                <ReactHover options={optionsCursorTrueWithMargin }>
                <Trigger type="trigger">
                <p>{company.name}</p>
                </Trigger>
                <Hover type="hover">
                <CompanyDetails {...company}/>
                </Hover>
                </ReactHover>
                </Card.Text>
              </Card.Body>
                </Card>
            
        </div>

        </Col>
    <Col></Col>
  </Row>
</Container>
     
        </div>
    )

}
export default Contact;
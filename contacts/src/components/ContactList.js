import React, {useEffect,useState} from "react";
import axios from 'axios';
import NumberDetail from "./NumberDetail";
import {
    BrowserRouter
      as Router, Switch, Route, Link, useParams, BrowserRouter,useHistory
  } from "react-router-dom";
import { DropdownButton,Dropdown,Container,Col,Row,ListGroup } from "react-bootstrap";



function ContactList(){
  // setting
    const [contacts,setContacts]=useState([]);
    const [search,setSearch]=useState("");
    const [query]=useState(['name']);
   
  // retrieve contacts 
    const getContacts = async ()=>{
      try{
        await axios({
          method:"GET",
          url:"https://jsonplaceholder.typicode.com/users",
        }).then((res)=>{
          setContacts(res.data);
       
        });
      }catch(err){
        console.error(err.message);
    }
    
  }
  // search function by character typed and found in search of names and lastname
  function searchName(items){
    console.log(items);
    return items.filter((item) => {
      return query.some((newItem) => {
          return (
              item[newItem]
                  .toString()
                  .toLowerCase()
                  .indexOf(search.toLowerCase()) > -1
          );
      });
  });
  }
  
  useEffect( ()=>{
   getContacts();
  });
    return (
        <div>
            
        <div >
          <Container>
          <Row md={3}>
    <Col> 
    </Col>
    <Col xs={5}>
    <input type="text" id="search" name="search" value={search} onChange={(i)=>setSearch(i.target.value)} placeholder="Search" />
    {searchName(contacts).map(item =>(
    <ListGroup>

          <ListGroup.Item ley={item.id}>
          <Link to={'/contact/'+item.id}>
            <div className="textLeft listName hover">
           <a> {item.name} </a>
       </div>
       </Link>
       <div className="">
        <DropdownButton id="dropdown-basic-button" title="Number" className="dropDown"  variant="light" >
            <Dropdown.Item>    <NumberDetail {...item}/></Dropdown.Item>
            </DropdownButton>
            </div>
            </ListGroup.Item>
        
      </ListGroup>
     
      ))}
    </Col>
    <Col></Col>
  </Row>
          </Container>
   
      </div>

        </div>
    )
}
export default ContactList;
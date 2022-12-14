import React, { useEffect, useState } from "react";
import { useContext } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useNavigate, Link } from "react-router-dom";
import AuthContext from "../../context/AuthContext";
import "./NavBar.css";
import { Drawer, Box, List, ListItemButton, ListItemText } from '@mui/material';




const Navbar = (props) => {

  const { logoutUser, user,token } = useContext(AuthContext);
  const navigate = useNavigate();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [show, setShow] = useState(false);

 
  function handleClick(){
    setIsDrawerOpen(true)
  }


  return (

    <div className="navBar">
      {user
      ?<Container>
      <Row bsPrefix="custom-row">
       
        <Col>
          <Link className="brand" to="/" style={{ textDecoration: "none", color: "white" }}>
          <b>Motorcycle Trip Planner</b>
          </Link>
        </Col>
        <Col>
        <h></h>
          <button onClick={logoutUser}>Logout</button>
        </Col>
        <Col>
          <button onClick={()=>navigate("/profile")}>Profile</button>
        </Col>
      </Row>
    </Container>
    : <h2><b>Motorcycle Trip Planner</b></h2>}

      
      
    </div>
  );
};

export default Navbar;

//
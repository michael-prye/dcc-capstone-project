import React, { useEffect, useState } from "react";
import { useContext } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useNavigate, Link } from "react-router-dom";
import AuthContext from "../../context/AuthContext";
import "./NavBar.css";
import { Drawer, Box, ListItem, List, ListItemButton, ListItemText } from '@mui/material';
import Modal from 'react-bootstrap/Modal'





const Navbar = (props) => {

  const { logoutUser, user,token } = useContext(AuthContext);
  const navigate = useNavigate();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [show, setShow] = useState(false);
  const handleModalClose = () => setShow(false);
  const handleModalShow = () => setShow(true);
 
  function handleClick(){
    setIsDrawerOpen(true)
  
  }

  return (

    <div className="navBar">
      <Container>
        <Row bsPrefix="custom-row">
          <Col>
            <button onClick={handleClick}>TRIPS</button>
          </Col>
          <Col>
            <Link className="brand" to="/" style={{ textDecoration: "none", color: "white" }}>
            <b>React/Django JWT</b>
            </Link>
          </Col>
          <Col>
            <button onClick={logoutUser}>Logout</button>
          </Col>
          <Col>
            <button onClick={()=>navigate("/profile")}>Profile</button>
          </Col>
        </Row>
      </Container>
      <Drawer
            anchor ='right'
            open ={isDrawerOpen}
            onClose={()=> setIsDrawerOpen(false)}>
              <Box width ='250px' textAlign='center'>
                <h3>TRIPS</h3>
                <List>
                {props.trips && (
                  <>
                  {props.trips.map((trip, key)=>{
                    return(
                      <ListItemButton onClick={() =>{navigate(`/trip?t=${trip.id}`); setIsDrawerOpen(false)}}>
                      <ListItemText primary={`   ${trip.name}`}/>
                      </ListItemButton>
                    )})}
                  </>
                )}
                </List>
              </Box>
            </Drawer>
    </div>
  );
};

export default Navbar;

//
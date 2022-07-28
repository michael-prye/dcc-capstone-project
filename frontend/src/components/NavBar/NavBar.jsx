import React, { useEffect, useState } from "react";
import { useContext } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useNavigate, Link } from "react-router-dom";
import AuthContext from "../../context/AuthContext";
import "./NavBar.css";
import { Drawer, Box, List, ListItemButton, ListItemText } from '@mui/material';
import Modal from 'react-bootstrap/Modal'
import { red } from "@mui/material/colors";





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
      <Container>
        <Row bsPrefix="custom-row">
          <Col>
            <button onClick={handleClick}>TRIPS</button>
          </Col>
          <Col>
            <Link className="brand" to="/" style={{ textDecoration: "none", color: "white" }}>
            <b>Motorcycle Trip Planner</b>
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
            anchor ='left'
            open ={isDrawerOpen}
            onClose={()=> setIsDrawerOpen(false)}
            PaperProps={{sx:{background:'#f65151', color:"white"}}}>
              <Box width ='250px' textAlign='center'>
                <h3>TRIPS</h3>
                <List>
                {props.trips && (
                  <div className="trip-list">
                  {props.trips.map((trip, key)=>{
                    return(
                      <ListItemButton onClick={() =>{navigate(`/trip?t=${trip.id}`); setIsDrawerOpen(false)}}
                      sx={{margin:'5px' ,background:'transparent', border:'2px solid white',color:'white',
                      '&:hover':{background:'#fef4f4', color:'#f65151', cursor:'pointer'}}}>
                      <ListItemText primary={`   ${trip.name}`}/>
                      </ListItemButton>
                    )})}
                  </div>
                )}
                </List>
              </Box>
            </Drawer>
    </div>
  );
};

export default Navbar;

//
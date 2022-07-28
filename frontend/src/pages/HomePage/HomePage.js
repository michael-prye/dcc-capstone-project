import React from "react";
import { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import CreateTripForm from "../../components/CreateTripForm/CreateTripForm";
import axios from "axios";
import Carousel from "react-multi-carousel";
import { useNavigate, Link } from "react-router-dom";
import ClearIcon from '@mui/icons-material/Clear';
import { Dialog, DialogActions, DialogTitle } from "@mui/material";
import { Container, Row } from "react-bootstrap";
import './HomePage.css'


const HomePage = (props) => {

  const [user, token] = useAuth();
  const navigate = useNavigate();
  const [trips,setTrips]=useState([]);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [deletedTrip, setDeletedTrip] = useState();
  
  const responsive = {
    desktop: {
        breakpoint: { max: 3000, min: 10 },
        items: 3,
      },}

  useEffect(()=>{
    getTrips();
  },[])    

  const handleOpen = () =>{setShowDeleteDialog(true)}
  const handleClose = () =>{setShowDeleteDialog(false)}

  async function getTrips(){
    let response = await axios.get('http://127.0.0.1:8000/api/trip/',
    {
      headers: {
        Authorization: "Bearer " + token,
      },
    }).then((response) =>{
      console.log(response.data)
      setTrips(response.data)
    }).catch((error)=>{
      console.log(error.response)
    });
  }
  async function handleDelete(){
    console.log('DELETE TRIP YES', deletedTrip)
    await axios.delete(`http://127.0.0.1:8000/api/trip/?id=${deletedTrip.id}`,
    {
      headers: {
        Authorization: "Bearer " + token,
      },
    }).then((response)=>
    {
      console.log('DELETE TRIP ', response.status )
      getTrips();
      handleClose();
    })


  }
  
  





  return (
    <Container>
      <h1 className="welcome">Welcome {user.username}!</h1>
      
      <Carousel responsive={responsive} >
      {trips.map(trip=>{
        return(
          <div className="trip-card">
          
            <button className="delete-button"onClick={()=>{setDeletedTrip(trip);setShowDeleteDialog(true)}}>
            <ClearIcon fontSize="small"/>
          </button>
          
          <div onClick={() =>{navigate(`/trip?t=${trip.id}`)}}>
          <h2>{trip.name}</h2>
          <h6>{trip.description}</h6>
          </div>
          </div>
         
          
         
        )
      })}
      </Carousel>
      
      <CreateTripForm getTrips={getTrips} trips={trips}/>

   
      <Dialog
      open={showDeleteDialog}
      onClose={handleClose}>
        <DialogTitle>Do you want to delete this trip?</DialogTitle>
        <DialogActions>
          <button onClick={handleDelete}>YES</button>
          <button onClick={handleClose}>NO</button>
        </DialogActions>
      </Dialog>
      </Container>
  );
};

export default HomePage;

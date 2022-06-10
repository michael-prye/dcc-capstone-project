import React from "react";
import { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import CreateTripForm from "../../components/CreateTripForm/CreateTripForm";
import axios from "axios";
import Carousel from "react-multi-carousel";
import { useNavigate, Link } from "react-router-dom";


const HomePage = (props) => {

  const [user, token] = useAuth();
  const navigate = useNavigate();
  const [trips,setTrips]=useState([]);
  const responsive = {
    desktop: {
        breakpoint: { max: 3000, min: 10 },
        items: 3,
      },}

  useEffect(()=>{
    getTrips();
  },[])    
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
  
  





  return (
    <div className="container">
      <h1>Welcome {user.username}!</h1>
      <CreateTripForm getTrips={getTrips} trips={trips}/>
      <Carousel responsive={responsive}>
      {trips.map(trip=>{
        return(
          <div onClick={() =>{navigate(`/trip?t=${trip.id}`)}}>
          <h2>{trip.name}</h2>
          <h6>{trip.description}</h6>
          </div>
        )
      })}

      </Carousel>
      
     
    </div>
  );
};

export default HomePage;

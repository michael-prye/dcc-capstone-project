import React from "react";
import { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import CreateTripForm from "../../components/CreateTripForm/CreateTripForm";
import axios from "axios";

const HomePage = () => {

  const [user, token] = useAuth();
  
  





  return (
    <div className="container">
      <h1>Home Page for {user.username}!</h1>

      <CreateTripForm/>
      
     
    </div>
  );
};

export default HomePage;

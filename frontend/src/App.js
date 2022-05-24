// General Imports
import { Routes, Route } from "react-router-dom";
import "./App.css";
import { useContext, useState, useEffect } from "react";
import axios from "axios";
import AuthContext from "./context/AuthContext";




// Pages Imports
import HomePage from "./pages/HomePage/HomePage";
import LoginPage from "./pages/LoginPage/LoginPage";
import RegisterPage from "./pages/RegisterPage/RegisterPage";
import ProfilePage from "./pages/ProfilePage/ProfilePage";

// Component Imports
import Navbar from "./components/NavBar/NavBar";
import Footer from "./components/Footer/Footer";

// Util Imports
import PrivateRoute from "./utils/PrivateRoute";

function App() {

  const { user,token } = useContext(AuthContext);
  const [trips, setTrips] = useState();

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
    <div>
      <Navbar trips={trips}/>
      <Routes>
        <Route path="/" element={<PrivateRoute><HomePage /></PrivateRoute>}/>
        <Route path="/profile" element={<PrivateRoute><ProfilePage /></PrivateRoute>}/>
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;

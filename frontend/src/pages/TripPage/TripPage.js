import React, {Component, useEffect, useState, useContext } from 'react';
import { Autocomplete, GoogleMap, LoadScript,  } from '@react-google-maps/api';
import axios from 'axios';
import { useSearchParams } from 'react-router-dom';
import AuthContext from '../../context/AuthContext';
import './TripPage.css'
import { Col, Container, Row } from 'react-bootstrap';
import StopDetails from '../../components/StopDetails/StopDetails';
import MapDirections from '../../components/MapDirections/MapDirections';
import Checklist from '../../components/Checklist/Checklist';
import Luggage from '../../components/Luggage/Luggage';

const TripPage = () => {

    const [searchParams] = useSearchParams();
    const tripId = searchParams.get('t')
    const { user,token } = useContext(AuthContext);
    const [trip, setTrip] = useState([]);
    const [stops, setStops] = useState([]);
    const [detialChoice, setDetialChoice] = useState('map');



    useEffect(()=>{
        getTrip();
        getStops();
        //console.log('TRIP: ',trip.name)
    },[])

    async function getTrip(){
        let response = await axios.
        get(`http://127.0.0.1:8000/api/trip/?id=${tripId}`,
        {
            headers:{
                Authorization: "Bearer " + token,
            },
        }).then((response)=>{
            console.log('TRIPS response data: ',response.data)
            setTrip(response.data)
            
        }).catch((error)=>{
            console.log('ERROR: ',error)
        });}
    async function getStops(){
        let response = await axios.get(`http://127.0.0.1:8000/api/stop/`,
        {
            headers:{
                Authorization: "Bearer " + token,
            },
        }).then((response)=>{
            console.log('STOPS response data: ',response.data)
            setStops(response.data)
            
        }).catch((error)=>{
            console.log('ERROR: ',error)
        });}

        let tripDetails;
        switch (detialChoice){
            case 'checklist':
                tripDetails = <Checklist tripId = {trip[0].id}/>
                break;
            case 'map':
                tripDetails = <MapDirections stops={stops}/>
                break;
            case 'luggage':
                tripDetails = <Luggage tripId = {trip[0].id}/>
                break;
            default:
                console.log('Not a valid choice');
        }
    

    return ( 
        <div>
        <Container>
            <Row>
            {trip[0]  &&(
                <div>
                <h3>{trip[0].name}</h3>
                <h6>{trip[0].description}</h6>
                </div>                
            )}
            </Row>
        <Row>
            <button className={
                detialChoice=== 'checklist' ? 'tab--active':'tab--inactive'            }
            onClick={()=> setDetialChoice('checklist')}>
                Checklist
            </button>
            <button className={
                detialChoice === 'map' ? 'tab--active':'tab--inactive'}
                onClick={()=>setDetialChoice('map')}>
                    Map
                </button>
            <button className={
                detialChoice === 'luggage' ? 'tab--active':'tab--inactive'}
                onClick={()=>setDetialChoice('luggage')}>
                    luggage
                </button>
        </Row>
        <Row>
        {tripDetails}
        </Row>
        
        
        </Container>
        </div>
     );
}
 
export default TripPage;

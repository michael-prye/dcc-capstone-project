import { Component, useEffect, useState } from "react";
import { GoogleMap, LoadScript, DirectionsService } from "@react-google-maps/api";
import useAuth from "../../hooks/useAuth";
import { googleMapsApiKey } from "../../localkey";
import { DirectionsRenderer } from '@react-google-maps/api';
import { Container, Row } from "react-bootstrap";
import StopDetails from "../StopDetails/StopDetails";
import { useSearchParams } from 'react-router-dom';
import axios from "axios";
import CreateStopForm from "../CreateStopForm/CreateStopForm";

const MapDirections = (props) => {

    const [user,token] = useAuth();
    const [searchParams] = useSearchParams();
    const tripId = searchParams.get('t')
    const [library]  = useState(['places']);
    const restrictions = {country: 'us',}
    const [state, setState] = useState({response: null, travelMode: 'DRIVING',origin: {lat:'',lng: ''}, destination: {lat:'' ,lng:''},waypoints:''})
    const [stops, setStops] = useState([]);
    let filteredOrigin = [];
    let filteredDestination = [];
    let filteredWaypoints = [];
    
    useEffect(()=>{
        getStops();    
    },[tripId])

    function refresh(){
        stops.map((stop, i, {length})=>{
            if (i ===0){
                filteredOrigin.push(stop)
            }
            else if(length -1 === i){
                filteredDestination.push(stop)
            }
            else{
                filteredWaypoints.push({location:{lat: parseFloat(stop.lat),lng: parseFloat(stop.lng)}})
            }
        })
        console.log('STOPS: ', stops)
        console.log('Origin: ',filteredOrigin)
        console.log('destination: ',filteredDestination)
        if (filteredWaypoints.length ===0){
            setState({...state,
                origin: {lat: parseFloat(filteredOrigin[0].lat) , lng: parseFloat(filteredOrigin[0].lng)},
                destination: {lat: parseFloat(filteredDestination[0].lat), lng: parseFloat(filteredDestination[0].lng)}})
        }else{
            setState({...state,
                origin: {lat: parseFloat(filteredOrigin[0].lat), lng: parseFloat(filteredOrigin[0].lng)},
                destination: {lat: parseFloat(filteredDestination[0].lat), lng: parseFloat(filteredDestination[0].lng)},
                waypoints:filteredWaypoints})
        }
       
        console.log('STATE: ', state)

    }
    async function getStops(){
        let response = await axios.get(`http://127.0.0.1:8000/api/stop/?trip=${tripId}`,
        {
            headers:{
                Authorization: "Bearer " + token,
            },
        }).then((response)=>{
            setStops(response.data)
            console.log('GOT STOPS: ', response.status, response.data)
            
        }).catch((error)=>{
            console.log('ERROR: ',error)
        });}
    


    function  directionsCallback(response){
        console.log(response);
        if (response !== null){
            if(response.status ==='OK'){
                setState({response: response})
            }
        }else{console.log('response: ', response)}
    }
       
    return ( 
        <Container>
            <button onClick={refresh}>refresh</button>
     
        <LoadScript
        googleMapsApiKey={googleMapsApiKey}
        libraries={library}>
            <GoogleMap
            id="directions-map"
            mapContainerStyle={{height: '400px', width: '500px'}}
            zoom={2}
            center={{lat: 35, lng: -99}}>
                {state.destination !==''&& state.origin !== ''&&(
                    <DirectionsService
                    options={{destination: state.destination, origin: state.origin, travelMode: state.travelMode, waypoints: state.waypoints
                    }}
                    callback={directionsCallback}
                    onLoad={directionsService => {
                        console.log('DirectionsService onLoad directionsService: ', directionsService);
                        
                      }}
                      onUnmount={directionsService => {
                        console.log('DirectionsService onUnmount directionsService: ', directionsService)
                      }}/>
                )}
                {state.response !== null &&(
                    <DirectionsRenderer
                    options={{directions: state.response}}
                    onLoad={directionsRenderer => {
                        console.log('DirectionsRenderer onLoad directionsRenderer: ', directionsRenderer)
                      }}
                      onUnmount={directionsRenderer => {
                        console.log('DirectionsRenderer onUnmount directionsRenderer: ', directionsRenderer)
                      }}/>
                )}
            </GoogleMap>

                    {stops.map((stop, index)=>{
                        return(<StopDetails stop={stop} getStops={getStops}/>)
                    })}
    

        </LoadScript>
        
        </Container> 
    );
}
 
export default MapDirections;

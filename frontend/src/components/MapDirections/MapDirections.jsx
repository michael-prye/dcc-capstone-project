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

    // refresh gets stops from backend and sorts them into origin, destination and waypoints to update the state to display the route on the map
    function refresh(){
        stops.map((stop)=>{
            if (stop.start === true){
                filteredOrigin.push(stop)
            }
            else if(stop.end ===true){
                filteredDestination.push(stop)
            }
            else{
                filteredWaypoints.push([{location:{lat:stop.lat,lng:stop.lng}}])
            }
        })
        console.log('STOPS: ', stops)
        console.log('Origin: ',filteredOrigin)
        console.log('destination: ',filteredDestination)
        console.log(filteredOrigin)
        if (filteredWaypoints.length ===0){
            setState({...state,
                origin: {lat: parseFloat(filteredOrigin[0].lat) , lng: parseFloat(filteredOrigin[0].lng)},
                destination: {lat: parseFloat(filteredDestination[0].lat), lng: parseFloat(filteredDestination[0].lng)}})
        }else{
            setState({...state,
                origin: {lat: filteredOrigin[0].lat, lng: filteredOrigin[0].lng},
                destination: {lat: filteredDestination[0].lat, lng: filteredDestination[0].lng},
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
            console.log('STOPS response data: ',response.data)
            setStops(response.data)
            
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
                    options={{destination: state.destination, origin: state.origin, travelMode: state.travelMode
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
            {(stops.length !==0) ? (
                <>
                    {stops.map((stop, index)=>{
                        return(<StopDetails stop={stop} stops={stops}/>)
                    })}
                    </>

            ):(
                <CreateStopForm state={state} setState={setState} getStops={getStops}/>
               
                

            )}
    

        </LoadScript>
        
        </Container> 
    );
}
 
export default MapDirections;

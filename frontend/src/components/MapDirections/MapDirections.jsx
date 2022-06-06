import { Component, useEffect, useState } from "react";
import { GoogleMap, LoadScript, DirectionsService } from "@react-google-maps/api";
import useAuth from "../../hooks/useAuth";
import { googleMapsApiKey } from "../../localkey";
import { DirectionsRenderer } from '@react-google-maps/api';
import { Container, Row } from "react-bootstrap";
import TripDetails from "../TripDetails/TripDetails";
import { useSearchParams } from 'react-router-dom';
import axios from "axios";
import CreateStopForm from "../CreateStopForm/CreateStopForm";
import StopDetails from "../StopDetails/StopDetails";

const MapDirections = (props) => {

    const [user,token] = useAuth();
    const [searchParams] = useSearchParams();
    const tripId = searchParams.get('t')
    const [library]  = useState(['places']);
    const restrictions = {country: 'us',}
    const [state, setState] = useState({response: null, travelMode: 'DRIVING',origin: {lat:0,lng: 0}, destination: {lat:0 ,lng:0},waypoints:[]})
    const [stops, setStops] = useState([]);
    let filteredOrigin = [];
    let filteredDestination = [];
    let filteredWaypoints = [];
    const [stopDetails,setStopDetails] = useState();
    const [callbackRun, setCallbackRun] = useState(false)
    const [selectedRoute, setSelectedRoute] = useState('route');
    
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

        if (filteredWaypoints.length ===0){
            setState({...state,
                origin: {lat: parseFloat(filteredOrigin[0].lat) , lng: parseFloat(filteredOrigin[0].lng)},
                destination: {lat: parseFloat(filteredDestination[0].lat), lng: parseFloat(filteredDestination[0].lng)},
                waypoints:[]})
                setCallbackRun(true)
        }else{
            setState({...state,
                origin: {lat: parseFloat(filteredOrigin[0].lat), lng: parseFloat(filteredOrigin[0].lng)},
                destination: {lat: parseFloat(filteredDestination[0].lat), lng: parseFloat(filteredDestination[0].lng)},
                waypoints:filteredWaypoints})
                setCallbackRun(true)
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
        if (response !== null && callbackRun === true){
            if(response.status ==='OK'){
                setState({...state, response:response})
                setCallbackRun(false)
                console.log('callback ran')
            }
        }else{console.log('response: ', response)}
    }
       
    function handleSetStop(i){
        let arr = [stops[i-1],stops[i]]
        setStopDetails(arr);
        setSelectedRoute('stop')
    
    }


    return ( 
        <div>
            
           
            

            <button onClick={refresh}>refresh</button>
        <LoadScript
        googleMapsApiKey={googleMapsApiKey}
        libraries={library}>
            <Row>
            <GoogleMap
            id="directions-map"
            mapContainerStyle={{height: '400px', width: '900px'}}
            zoom={2}
            center={{lat: 35, lng: -99}}>
                {state.destination.lat !==0 && state.origin.lat !== 0 &&(
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
                {state.response !== null &&
                    <DirectionsRenderer
                    options={{directions: state.response}}
                    onLoad={directionsRenderer => {
                        console.log('DirectionsRenderer onLoad directionsRenderer: ', directionsRenderer)
                      }}
                      onUnmount={directionsRenderer => {
                        console.log('DirectionsRenderer onUnmount directionsRenderer: ', directionsRenderer)
                      }}/>
                }
            </GoogleMap>
            </Row>
            <Row>
                <button onClick={()=>setSelectedRoute('route')}>TRIP</button>
                {stops.map((stop,i,length)=>{
                    return(
                        <>
                        {i>0 &&
                        <button onClick={()=>{handleSetStop(i)}}>day {i}</button>}
                        </>)
                })}

            </Row>

                {selectedRoute === 'route'?(
                    <>
                    {stops.map((stop, i, {length})=>{
                        return(<TripDetails stop={stop} getStops={getStops} i={i} length={length}/>)
                    })}
                    </>

                ):(
                    <StopDetails stops={stopDetails} state={state} setState={setState} setCallbackRun={setCallbackRun}/>

                )}
                    
                    
    

        </LoadScript>
        </div>
        

    );
}
 
export default MapDirections;

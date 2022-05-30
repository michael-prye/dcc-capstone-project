import { Component, useEffect, useState } from "react";
import { GoogleMap, LoadScript, DirectionsService } from "@react-google-maps/api";
import useAuth from "../../hooks/useAuth";
import { googleMapsApiKey } from "../../localkey";
import { DirectionsRenderer } from '@react-google-maps/api';
import { Container, Row } from "react-bootstrap";
import StopDetails from "../StopDetails/StopDetails";

const MapDirections = (props) => {

    const [user,token] = useAuth();
    const [library]  = useState(['places']);
    const restrictions = {country: 'us',}
    const [tripStart, setTripStart] = props.stops.filter(stop => stop.start === true)
    const [tripEnd, setTripEnd] = useState(props.stops.filter(stop => stop.end === false))
    const [state, setState] = useState({response: null, travelMode: 'DRIVING',origin: {lat: 40.0466447000,lng: -84.1816949000}, destination: {lat:25.7616798000 ,lng:-80.1917902000}})

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
        <Row>
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
                        console.log('DirectionsService onLoad directionsService: ', directionsService)
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
        </LoadScript>
        </Row>
        {props.stops.map((stop, index)=>{
            return(<StopDetails stop={stop}index ={index}/>)
        })}
        </Container> 
    );
}
 
export default MapDirections;
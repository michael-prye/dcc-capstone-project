import { Component, useEffect, useState } from "react";
import { Autocomplete } from "@react-google-maps/api";
import { useSearchParams } from "react-router-dom";
import axios from "axios";
import useAuth from "../../hooks/useAuth";
import { Container } from "react-bootstrap";



const AddStopForm = (props) => {

    const [user,token] = useAuth();
    const [searchParams] = useSearchParams();
    const tripId = searchParams.get('t')
    const restrictions = {country: 'us',}
    const [autocomplete, setAutocomplete] = useState(null);

    async function addStart(place){
        let response = await axios.post(
            `http://127.0.0.1:8000/api/stop/?trip=${tripId}`,
            {
              address: place.formatted_address,
              lat: place.geometry.location.lat(),
              lng: place.geometry.location.lng(),
              day: props.day + 1,
              start: false,
              end: false,
            },
            {
              headers: {
                Authorization: "Bearer " + token,
              },
            })
        .then((response)=>{
            console.log('addSTART:', response.status)
        })}

        function onLoad(autocomplete){
            console.log('Autocomplete: ', autocomplete);
            setAutocomplete(autocomplete);}
        
        function onPlaceChanged(){
            if (autocomplete !== null){
                console.log(autocomplete)
                console.log(autocomplete.getPlace());
                var place = autocomplete.getPlace();
                props.setWaypts(prev =>[...prev])
                props.setWaypts([...props.waypts, {location: {lat:place.geometry.location.lat(), lng: place.geometry.location.lng()}}])
            }else{
                console.log('Autocomplete is not loaded yet!')
            }}
    
    

    return ( 
    <Container>
        <Autocomplete
    onLoad={onLoad}
    onPlaceChanged={onPlaceChanged}
    restrictions = {restrictions}            >
    <input
    type='text'
    placeholder='add point'
    />
    </Autocomplete>
    <button onClick={()=>console.log(props.waypts)}>test</button>
    </Container> 
    );
}
 
export default AddStopForm;
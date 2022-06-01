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
    let formatedStops = [props.stops]


   

        function onLoad(autocomplete){
            console.log('Autocomplete: ', autocomplete);
            setAutocomplete(autocomplete);}
        
        function onPlaceChanged(){ // when selecting a new stop trying to splice into the a formated array that will be sent to the backend to update all stops? 
            if (autocomplete !== null){
                console.log(autocomplete.getPlace());
                var place = autocomplete.getPlace();
                console.log('STOPS: ', props.stops)
                console.log('formatedstops: ', formatedStops)
                var spliceIndex = formatedStops.findIndex(findSpliceIndex)
                console.log(spliceIndex)
                const obj={
                    id: 0,
                    address:place.formatted_address,
                    lat: place.geometry.location.lat(),
                    lng: place.geometry.location.lng(),
                    day: props.stop.day + 1,
                    start: false,
                    end: false}
                formatedStops.push(obj)
                
                console.log('FORMATED STOPS after splice: ', formatedStops)
                
            }else{
                console.log('Autocomplete is not loaded yet!')
            }}
        function findSpliceIndex(stop){
            return stop.id =props.stop.id
        }
    
    

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
    <button onClick={()=>console.log(props.waypts)}>save</button>
    </Container> 
    );
}
 
export default AddStopForm;

// async function addStart(place){
//     let response = await axios.post(
//         `http://127.0.0.1:8000/api/stop/?trip=${tripId}`,
//         {
//           address: place.formatted_address,
//           lat: place.geometry.location.lat(),
//           lng: place.geometry.location.lng(),
//           day: props.day + 1,
//           start: false,
//           end: false,
//         },
//         {
//           headers: {
//             Authorization: "Bearer " + token,
//           },
//         })
//     .then((response)=>{
//         console.log('addSTART:', response.status)
//     })}
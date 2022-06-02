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
    let formatedStop =[];
    const [addResponse, setAddResponse] = useState();

    useEffect(()=>{
        props.getStops();
    },[addResponse])
    

    function onLoad(autocomplete){
            console.log('Autocomplete: ', autocomplete);
            setAutocomplete(autocomplete);}
        
    function onPlaceChanged(){ // when selecting a new stop trying to splice into the a formated array that will be sent to the backend to update all stops? 
        if (autocomplete !== null){
            console.log(autocomplete.getPlace());
            var place = autocomplete.getPlace();
            const obj={
                address:place.formatted_address,
                lat: place.geometry.location.lat(),
                lng: place.geometry.location.lng(),
                stop_number: props.stop.stop_number + 10,
                trip_id: tripId,
            }
            formatedStop.push(obj);
            console.log("formatedStop: ", formatedStop)


            }else{
                console.log('Autocomplete is not loaded yet!')
            }}
    async function addStop(){
        let response = await axios.post(
            `http://127.0.0.1:8000/api/stop/?trip=${tripId}`,formatedStop,
            {
            headers: {
                Authorization: "Bearer " + token,
            },
            })
        .then((response)=>{
            console.log('addSop:', response.status)
            setAddResponse(response.data)
        })}
    function handleSave(){
        addStop();
        props.getStops();
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
    <button onClick={()=> {addStop(); props.getStops()}}>save</button>
    </Container> 
    );
}
 
export default AddStopForm;

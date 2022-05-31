import { Component, useEffect, useState } from "react";
import { Autocomplete } from "@react-google-maps/api";
import { useSearchParams } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import axios from "axios";



const CreateStopForm = (props) => {

    const [user,token] = useAuth();
    const [searchParams] = useSearchParams();
    const tripId = searchParams.get('t')
    const restrictions = {country: 'us',}
    const [autocompleteStart, setAutocompleteStart] = useState(null);
    const [autocompleteEnd, setAutocompleteEnd] = useState(null);

    async function addStart(place){
        let response = await axios.post(
            `http://127.0.0.1:8000/api/stop/?trip=${tripId}`,
            {
              address: place.formatted_address,
              lat: place.geometry.location.lat(),
              lng: place.geometry.location.lng(),
              day: 1,
              start: true,
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
    async function addEnd(place){
        let response = await axios.post(
            `http://127.0.0.1:8000/api/stop/?trip=${tripId}`,
            {
                address: place.formatted_address,
                lat: place.geometry.location.lat(),
                lng: place.geometry.location.lng(),
                day: 1,
                start: false,
                end: true,
            },
            {
                headers: {
                Authorization: "Bearer " + token,
                },
                })
            .then((response)=>{
                console.log('addEnd:', response.status)
            })}


    function onLoadStart(autocomplete){
        console.log('Autocomplete: ', autocomplete);
        setAutocompleteStart(autocomplete);
    }
    function onLoadEnd(autocomplete){
        console.log('Autocomplete: ', autocomplete);
        setAutocompleteEnd(autocomplete);
    }
    function onPlaceChangedStart(){
        if (autocompleteStart !== null){
            console.log(autocompleteStart)
            console.log(autocompleteStart.getPlace());
            var place = autocompleteStart.getPlace();
            props.setState({...props.state, origin: {lat: place.geometry.location.lat(), lng: place.geometry.location.lng()}})
            addStart(place);
        }else{
            console.log('Autocomplete is not loaded yet!')
        }}
    function onPlaceChangedEnd(){
        if (autocompleteEnd !== null){
            console.log(autocompleteEnd)
            console.log(autocompleteEnd.getPlace());
            var place = autocompleteEnd.getPlace();
            props.setState({...props.state, destination: {lat: place.geometry.location.lat(), lng: place.geometry.location.lng()}})
            addEnd(place);

        }else{
            console.log('Autocomplete is not loaded yet!')
        }}

        function handleSave(){

        }


    return ( 
        <>
    <Autocomplete
    onLoad={onLoadStart}
    onPlaceChanged={onPlaceChangedStart}
    restrictions = {restrictions}            >
    <input
    type='text'
    placeholder='Starting Point'
    />
    </Autocomplete>
    <Autocomplete
    onLoad={onLoadEnd}
    onPlaceChanged={onPlaceChangedEnd}
    restrictions = {restrictions}            >
    <input
    type='text'
    placeholder='End Point'
    />
    </Autocomplete>
        <button onClick={()=>props.getStops()}>TEST</button>
    
        </> 
    );
}
 
export default CreateStopForm;
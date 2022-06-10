import React, {useEffect, useState } from 'react';
import { Autocomplete, GoogleMap, LoadScript,  } from '@react-google-maps/api';
import axios from 'axios';
import { googleMapsApiKey } from '../../localkey';
import useAuth from '../../hooks/useAuth';
import { Container, Row } from 'react-bootstrap';
import { useNavigate } from "react-router-dom";

import Toast from 'react-bootstrap/Toast'

const CreateTripForm = (props) => {
    const navigate = useNavigate();
    const [user,token] = useAuth();
    const [library]  = useState(['places']);
    const restrictions = {country: 'us',}
    const [autocompleteStart, setAutocompleteStart] = useState(null);
    const [autocompleteEnd, setAutocompleteEnd] = useState(null);
    const [tripName, setTripName] = useState(`My Trip`)
    const [tripDescription, setTripDescription] = useState('test')
    const [show,setShow] = useState(false)
    const [showAlert, setShowAlert] = useState(false)
    const handleClose = ()=> setShow(false);
    let formatedStops = [];
    const [tripId,setTripId] =useState();
   
    useEffect(()=>{
      props.getTrips();
    },[])
  
    
    
    function handleShow(){
      setShow(true);
      createTrip();
    }
    function onLoad(autocomplete){
        console.log('Autocomplete: ', autocomplete);
        setAutocompleteStart(autocomplete);
    }
    function onLoadTest(autocomplete){
        console.log('Autocomplete: ', autocomplete);
        setAutocompleteEnd(autocomplete);
    }
    function onPlaceChangedStart(){
        if (autocompleteStart !== null){
            console.log(autocompleteStart.getPlace());
            var place = autocompleteStart.getPlace();
            if (place.formatted_address !== undefined){
              console.log('Selected proper address')
              const startObj ={
                lat: place.geometry.location.lat(),
                lng: place.geometry.location.lng(),
                address: place.formatted_address,
                stop_number: 0,
                trip_id: tripId,
              }
              formatedStops.push(startObj)
              console.log(formatedStops)
            }else{setShowAlert(true)}            
        }else{
            console.log('Autocomplete is not loaded yet!')
        }}
    function onPlaceChangedEnd(){
        if (autocompleteEnd !== null){
            console.log(autocompleteEnd)
            console.log(autocompleteEnd.getPlace());
            var place = autocompleteEnd.getPlace();
            if (place.formatted_address !== undefined){
              console.log('Selected proper address')
              const EndObj ={
                lat: place.geometry.location.lat(),
                lng: place.geometry.location.lng(),
                address: place.formatted_address,
                stop_number: 10,
                trip_id: tripId,
              }
              formatedStops.push(EndObj)
              console.log(formatedStops)
            }else{setShowAlert(true)}            
        }else{
            console.log('Autocomplete is not loaded yet!')
            setShowAlert(true)
        }}
    async function createTrip(){
        let response = await axios.post(
            `http://127.0.0.1:8000/api/trip/`,
            {
              name: `${tripName} ${props.trips.length + 1}`,
              description: tripDescription,
            },
            {
              headers: {
                Authorization: "Bearer " + token,
              },
            });
          try{
            setTripId(response.data.id)
            console.log('CREATED TRIP')
            await axios.post(`http://127.0.0.1:8000/api/checklist/?trip=${response.data.id}`,
        {
            name: 'My Checklist'
        },
        {
            headers: {
                Authorization: "Bearer " + token,
              },
        })}
          catch (e) {
            console.log('ERROR: ',e.response.data);
          }}
    
    async function addStops(){
      let response = await axios.post(
        `http://127.0.0.1:8000/api/stop/?trip=${tripId}`,formatedStops,
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }).then((response)=>{
          console.log('ADDSTOPS STATUS: ',response.status)
        }).catch((response)=>{
          console.log('ERROR: ',response)
        })
    }

     
    function handleSave(e){
        e.preventDefault();
        addStops();
        navigate(`/trip?t=${tripId}`)
        }
    
    return ( 

      <Container>
        

        <button onClick={handleShow}>WHERE WOULD YOU LIKE TO GO?</button>
        {show  &&
        <div>
        <Row>
        <button onClick={handleClose}>close</button>
        </Row>
        <Row>
        <LoadScript
googleMapsApiKey= {googleMapsApiKey}
libraries={library}>
    <Autocomplete
    onLoad={onLoad}
    onPlaceChanged={onPlaceChangedStart}
    restrictions = {restrictions}>
        <input
        type='text'
        placeholder='Starting Point'
        />
    </Autocomplete>
    <Toast show={showAlert} onClose={()=> setShowAlert(false)}><Toast.Header closeButton></Toast.Header><p>ERROR invalid address. Select a propper address</p></Toast >
    <Autocomplete
    onLoad={onLoadTest}
    onPlaceChanged={onPlaceChangedEnd}
    restrictions = {restrictions}            >
        <input
        type='text'
        placeholder='End Point'
        />
    </Autocomplete>
</LoadScript>

        </Row>
        <button onClick={handleSave}>SAVE</button>
        </div>
                
        }
       
        
        
        </Container>



    );
}
 
export default CreateTripForm;

{/* <LoadScript
googleMapsApiKey= {googleMapsApiKey}
libraries={library}>
    <Autocomplete
    onLoad={onLoad}
    onPlaceChanged={onPlaceChangedStart}
    restrictions = {restrictions}            >
        <input
        type='text'
        placeholder='Starting Point'
        />
    </Autocomplete>
    <Autocomplete
    onLoad={onLoadTest}
    onPlaceChanged={onPlaceChangedEnd}
    restrictions = {restrictions}            >
        <input
        type='text'
        placeholder='End Point'
        />
    </Autocomplete>
</LoadScript>

try {
  await axios.post(
    `http://127.0.0.1:8000/api/stop/?trip=${response.data.id}`,
    {
      address: start.address,
      lat: start.lat,
      lng: start.lng,
      day: 1,
      start: true,
      end: false,
    },
    {
      headers: {
        Authorization: "Bearer " + token,
      },
    }
  );
} catch (e) {
  console.log(e.response.data);
}
try {
    
  await axios
    .post(
      `http://127.0.0.1:8000/api/stop/?trip=${response.data.id}`,
      {
        address: end.address,
        lat: end.lat,
        lng: end.lng,
        day: 1,
        start: false,
        end: true,
      },
      {
        headers: {
          Authorization: "Bearer " + token,
        },
      }
    )
    .then((response) => {
      console.log("add end stop");
      console.log(response.data);
    });
} catch (e) {
  console.log(e.response.data);
} */}
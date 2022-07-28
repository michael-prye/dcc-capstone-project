import React, {useEffect, useState } from 'react';
import { Autocomplete, GoogleMap, LoadScript,  } from '@react-google-maps/api';
import axios from 'axios';
import { googleMapsApiKey } from '../../localkey';
import useAuth from '../../hooks/useAuth';
import { Col, Container, Row } from 'react-bootstrap';
import { useNavigate } from "react-router-dom";
import './CreateTripForm.css'
import { Dialog, DialogActions, DialogTitle } from "@mui/material";
import Toast from 'react-bootstrap/Toast'

const CreateTripForm = (props) => {
    const navigate = useNavigate();
    const [user,token] = useAuth();
    const [library]  = useState(['places']);
    const restrictions = {country: 'us',}
    const [autocompleteStart, setAutocompleteStart] = useState(null);
    const [autocompleteEnd, setAutocompleteEnd] = useState(null);
    const [tripName, setTripName] = useState(`My Trip`)
    const [tripDescription, setTripDescription] = useState('Description')
    const [show,setShow] = useState(false)
    const [showAlert, setShowAlert] = useState(false)
    const handleClose = ()=> setShow(false);
    let formatedStops = [];
    const [tripId,setTripId] =useState();

   
    useEffect(()=>{
     
    },[])
  
    
    
    function handleShow(){
      setShow(true);
      
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
                trip_id: 0,
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
                trip_id: 0,
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
          }try{
            await axios.post(
              `http://127.0.0.1:8000/api/stop/?trip=${response.data.id}`,formatedStops,
              {
                headers: {
                  Authorization: "Bearer " + token,
                },
              }).then((response)=>{console.log('ADDSTOPS STATUS: ',response.status); navigate(`/trip?t=${response.data[0].trip.id}`);})
          }catch(e){console.log(e)}}
    
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
        <div>
        <button className='create-trip' onClick={handleShow}><h2>WHERE WOULD YOU LIKE TO GO?</h2></button>
        {show  &&
        <div>
        <Row>
        <LoadScript
googleMapsApiKey= {googleMapsApiKey}
libraries={library}>
    <Col>
    <Autocomplete
    onLoad={onLoad}
    onPlaceChanged={onPlaceChangedStart}
    restrictions = {restrictions}>
        <input className='trip-input'
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
        className='trip-input'
        type='text'
        placeholder='End Point'
        />
    </Autocomplete>
    </Col>
</LoadScript>

        </Row>
        <Row bsPrefix='trip-button-row'><Col>
        <button className='trip-button' onClick={createTrip}>SAVE</button></Col>
       <Col> <button className='trip-button' onClick={handleClose}>CLOSE</button></Col>
        </Row>
        </div>
                
        }
        </div>
       
        
    );
}
 
export default CreateTripForm;

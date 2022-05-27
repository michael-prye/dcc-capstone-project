import React, {Component, useEffect, useState, useContext } from 'react';
import { Autocomplete, GoogleMap, LoadScript,  } from '@react-google-maps/api';
import axios from 'axios';
import { useSearchParams } from 'react-router-dom';
import { googleMapsApiKey } from '../../localkey';
import useAuth from '../../hooks/useAuth';
const CreateTripForm = (props) => {

    const [user,token] = useAuth();
    const [start,setStart] = useState({address: '',lat: 0, lng: 0})
    const [end,setEnd] = useState({address: '',lat: 0, lng: 0})
    const [library]  = useState(['places']);
    const restrictions = {country: 'us',}
    const [autocompleteStart, setAutocompleteStart] = useState(null);
    const [autocompleteEnd, setAutocompleteEnd] = useState(null);
    const [tripName, setTripName] = useState('')
    const [tripDescription, setTripDescription] = useState('')
    const [tripId, setTripId] = useState();


    function handleSubmit(e){
        e.preventDefault();
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
            console.log(autocompleteStart)
            console.log(autocompleteStart.getPlace());
            var place = autocompleteStart.getPlace();
            setStart({address: place.formatted_address, lat: place.geometry.location.lat(), lng: place.geometry.location.lng()})
        }else{
            console.log('Autocomplete is not loaded yet!')
        }}
    function onPlaceChangedEnd(){
        if (autocompleteEnd !== null){
            console.log(autocompleteEnd)
            console.log(autocompleteEnd.getPlace());
            var place = autocompleteEnd.getPlace();
            setEnd({address: place.formatted_address, lat: place.geometry.location.lat(), lng: place.geometry.location.lng()})
        }else{
            console.log('Autocomplete is not loaded yet!')
        }}

    async function addStop(data, id,start,){
        if (start === 'start'){
            
            await axios.post(`http://127.0.0.1:8000/api/stop/?trip=${id}`,
            {
                address: data.address,
                lat: data.lat,
                lng: data.lng,
                day: 1,
                start: true,
                end: false,
            },{
                headers:{
                    Authorization: "Bearer " + token,
                }
            }).then((response)=>{
                console.log('add starting stop')
                console.log(response.data)
            })
        }
        else{
            
            await axios.post(`http://127.0.0.1:8000/api/stop/?trip=${id}`,
            {
                address: data.address,
                lat: data.lat,
                lng: data.lng,
                day: 1,
                start: false,
                end: true,
            },{
                headers:{
                    Authorization: "Bearer " + token,
                }
            }).then((response)=>{
                console.log('add end stop')
                console.log(response.data)
            })}}


    async function createTrip(){
        
        let response =await axios.post(`http://127.0.0.1:8000/api/trip/`,
        {
            name: tripName,
            description: tripDescription
        },{
            headers:{
                Authorization: "Bearer " + token,
            }
        }).then((response)=>{
            setTripId(response.data.id)
            console.log('create trip')
        })}
     
    function handleSave(e){
        createTrip();
        addStop(start,tripId,'start') // creating starting stop for the new trip
        addStop(end,tripId,'end') // creating end stop for the new trip
        e.preventDefault();
        }
    



    return ( 
        <div>
        <form>
        <input
        type='text'
        placeholder='Name of trip'
        value={tripName}
        onChange={(e)=> setTripName(e.target.value)}/>
        <input
        type='text'
        placeholder='description'
        value={tripDescription}
        onChange={(e)=> setTripDescription(e.target.value)}/>
        <LoadScript
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
        <li>{start.address}</li>
        <li>{start.lat}</li>
        <li>{start.lng}</li>
        <li>{end.address}</li>
        <li>{end.lat}</li>
        <li>{end.lng}</li>
      <button onClick={handleSave}>CREATE TRIP</button>
      </form>
      </div>

    );
}
 
export default CreateTripForm;


// class MyMapWithAutocomplete extends Component{
//     constructor (props){
//         super(props)
//         this.autocomplete = null
//         this.onLoad = this.onLoad.bind(this)
//         this.onPlaceChanged = this.onPlaceChanged.bind(this)
//     }
//     componentDidMount(){
//         this.onLoad();
//     }
//     onLoad(autocomplete){
//         console.log('Autocomplete: ', autocomplete)
//         this.autocomplete = autocomplete
//     }

    
//     onPlaceChanged(){
//         if (this.autocomplete !== null){
//             console.log(this.autocomplete.getPlace());
//             var place = this.autocomplete.getPlace();
//             console.log(place.geometry.location.lat());
//         }else{
//             console.log('Autocomplete is not loaded yet!')
//         }
//     }
// };
// var testMap = new MyMapWithAutocomplete();
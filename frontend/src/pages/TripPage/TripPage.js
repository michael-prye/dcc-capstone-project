import React, {Component, useEffect, useState, useContext } from 'react';
import { Autocomplete, GoogleMap, LoadScript,  } from '@react-google-maps/api';
import axios from 'axios';
import { useSearchParams } from 'react-router-dom';
import AuthContext from '../../context/AuthContext';
import './TripPage.css'
import { Col, Container, Row } from 'react-bootstrap';
import StopDetails from '../../components/StopDetails/StopDetails';

const TripPage = () => {

    const [searchParams] = useSearchParams();
    const tripId = searchParams.get('t')
    const { user,token } = useContext(AuthContext);
    const [trip, setTrip] = useState([]);
    const [stops, setStops] = useState([]);

    class MyMapWithAutocomplete extends Component{
        constructor (props){
            super(props)
            this.autocomplete = null
            this.onLoad = this.onLoad.bind(this)
            this.onPlaceChanged = this.onPlaceChanged.bind(this)
        }
        onLoad(autocomplete){
            console.log('Autocomplete: ', autocomplete)
            this.autocomplete = autocomplete
        }
        onPlaceChanged(){
            if (this.autocomplete !== null){
                console.log(this.autocomplete.getPlace())
            }else{
                console.log('Autocomplete is not loaded yet!')
            }
        }
    };
    var testMap = new MyMapWithAutocomplete();


    useEffect(()=>{
        getTrip();
        getStops();
        //console.log('TRIP: ',trip.name)
    },[])

    async function getTrip(){
        let response = await axios.
        get(`http://127.0.0.1:8000/api/trip/?id=${tripId}`,
        {
            headers:{
                Authorization: "Bearer " + token,
            },
        }).then((response)=>{
            console.log('TRIPS response data: ',response.data)
            setTrip(response.data)
            
        }).catch((error)=>{
            console.log('ERROR: ',error)
        });}
    async function getStops(){
        let response = await axios.get(`http://127.0.0.1:8000/api/stop/`,
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
    

    return ( 
        <div>
        <section>
            {trip[0]  &&(
                <section>
                <h3>{trip[0].name}</h3>
                <h6>{trip[0].description}</h6>
                </section>
            )}
        </section>
        <section className='temp-map-box'>
            <>
            </>
        </section>
        {stops.map((stop, index)=>{
            return(<StopDetails stop={stop}index ={index}/>)
        })}
        </div>
     );
}
 
export default TripPage;






// libraries="places"

{/* <LoadScript
        googleMapsApiKey= {googleMapsApiKey}
        libraries={["places"]}
        >
        
            <Autocomplete
            onLoad={testMap.onLoad}
            onPlaceChanged={testMap.onPlaceChanged}
            restrictions={['us']}>
                <input
                type='text'
                placeholder='search'
                style={{
                    boxSizing: `border-box`,
                    border: `1px solid transparent`,
                    width: `240px`,
                    height: `32px`,
                    padding: `0 12px`,
                    borderRadius: `3px`,
                    boxShadow: `0 2px 6px rgba(0, 0, 0, 0.3)`,
                    fontSize: `14px`,
                    outline: `none`,
                    textOverflow: `ellipses`,
                    position: "absolute",
                    left: "50%",
                    marginLeft: "-120px"
                  }}
                />
            </Autocomplete>
        
      </LoadScript> */}
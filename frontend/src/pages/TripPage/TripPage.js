import React, {Component, useEffect, useState } from 'react';
import { Autocomplete, GoogleMap, LoadScript,  } from '@react-google-maps/api';
import { googleMapsApiKey } from '../../localKey';

//40.046649191309385, -84.18169640973143



const TripPage = () => {

    const containerStyle = {
        width: '400px',
        height: '400px'
      };
      
      const center = {
        lat: 40.0379325481874,
        lng: -84.21688854124567 
      };

      const [marker, setMarker] = useState({lat: 40.046649191309385,lng: -84.18169640973143})
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


    return ( 
        <div>
            <LoadScript
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
        
      </LoadScript>
        <p>This is my TRIP</p>
        <p>{marker.lat}</p>
        <p>{marker.lng}</p>
        </div>
     );
}
 
export default TripPage;






// libraries="places"
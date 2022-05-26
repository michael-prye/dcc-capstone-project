import React, {Component, useEffect, useState, useContext } from 'react';
import { Autocomplete, GoogleMap, LoadScript,  } from '@react-google-maps/api';
import axios from 'axios';
import { useSearchParams } from 'react-router-dom';
import { googleMapsApiKey } from '../../localkey';




const CreateTripForm = (props) => {
    const [addressStart, setAddressStart] = useState();
    const  [librarie]  = useState(['places']);
    const restrictions = {
        country: 'us',
    }

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
                console.log(this.autocomplete.getPlace());
                var place = this.autocomplete.getPlace()
                console.log(place.geometry.location.lat())
            }else{
                console.log('Autocomplete is not loaded yet!')
            }
        }
    };
    var testMap = new MyMapWithAutocomplete();
    function handleSubmit(e){
        e.preventDefault();
    }

    return ( 
        <div>
    
        <LoadScript
        googleMapsApiKey= {googleMapsApiKey}
        libraries={librarie}>
            <Autocomplete
            onLoad={testMap.onLoad}
            onPlaceChanged={testMap.onPlaceChanged}
            restrictions = {restrictions}
            >
                <input
                type='text'
                value={addressStart}
                placeholder='Starting Point'
                
               
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
      <h2>{addressStart}</h2>
      </div>

    );
}
 
export default CreateTripForm;

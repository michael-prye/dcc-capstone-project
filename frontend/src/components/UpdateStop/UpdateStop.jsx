import { useEffect, useState } from "react";
import { Autocomplete } from "@react-google-maps/api";
import axios from "axios";
import useAuth from "../../hooks/useAuth";

const UpdateStop = (props) => {
    const [user,token] = useAuth();
    const [autocomplete, setAutocomplete] = useState(null);
    const restrictions = {country: 'us',}
    const [putResponse, setPutResponse] = useState();
    let formatedStop ={};

    useEffect(()=>{
        props.getStops();
        
    },[putResponse])


function onLoad(autocomplete){
        console.log('Autocomplete: ', autocomplete);
        setAutocomplete(autocomplete);}
    
function onPlaceChanged(){ 
    if (autocomplete !== null){
        console.log(autocomplete.getPlace());
        var place = autocomplete.getPlace();
        formatedStop={
            address:place.formatted_address,
            lat: place.geometry.location.lat(),
            lng: place.geometry.location.lng(),
        }
        console.log("formatedStop: ", formatedStop)
        }else{
            console.log('Autocomplete is not loaded yet!')
        }}
async function updateStop(){
    let response = await axios.put(
        `http://127.0.0.1:8000/api/stop/?id=${props.id}`, formatedStop,
        {
            headers: {
                Authorization: "Bearer " + token,
            },
            }
    )
    .then((response)=>{
        console.log('Update Stop', response.data,)
        setPutResponse(response.data)
    }).catch((error)=>{
        console.log('PUT ERROR: ', error.request)
        console.log(response.data)
    })}



    return ( 
        <>
        <Autocomplete
        onLoad={onLoad}
        onPlaceChanged={onPlaceChanged}
        restrictions = {restrictions}            >
        <input
        type='text'
        placeholder='add point'
    />
        </Autocomplete>
        <button onClick={()=> {updateStop();props.setChangeButton(false)}}>SAVE</button>
        </>
     );
}
 
export default UpdateStop;
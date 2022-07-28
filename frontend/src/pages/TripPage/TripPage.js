import React, {Component, useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { useSearchParams } from 'react-router-dom';
import AuthContext from '../../context/AuthContext';
import './TripPage.css'
import { Col, Container, Row } from 'react-bootstrap';
import TripDetails from '../../components/TripDetails/TripDetails';
import MapDirections from '../../components/MapDirections/MapDirections';
import Checklist from '../../components/Checklist/Checklist';
import Luggage from '../../components/Luggage/Luggage';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
const TripPage = () => {

    const [searchParams] = useSearchParams();
    const tripId = searchParams.get('t')
    const { user,token } = useContext(AuthContext);
    const [trip, setTrip] = useState([]);
    const [detialChoice, setDetialChoice] = useState('map');
    const [editTrip, setEditTrip] = useState(true)
    const [name, setName] = useState();
    const [description, setDescription] = useState();

    function handleEditTrip(){
        if(editTrip){
            setEditTrip(false)
        }
        else{
            setEditTrip(true)
        }
    }



    useEffect(()=>{
        getTrip();
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
    

        let tripDetails;
        switch (detialChoice){
            case 'checklist':
                tripDetails = <Checklist tripId = {trip[0].id}/>
                break;
            case 'map':
                tripDetails = <MapDirections/>
                break;
            case 'luggage':
                tripDetails = <Luggage tripId = {trip[0].id}/>
                break;
            default:
                console.log('Not a valid choice');
        }
        async function updateTrip(){
            const body ={
                name: name,
                description: description,
            }
            let response = await axios.put(`http://127.0.0.1:8000/api/trip/?id=${tripId}`,body,
            {
                headers: {
                    Authorization: "Bearer " + token,
                },
                }).then((response)=>{
                    console.log(response.data);
                    getTrip();
                    setEditTrip(true);

                })
        }

    return ( 
        
        <Container bsPrefix='trip-page-body'>
            <Row bsPrefix='trip-info'>
            {editTrip? (
                <>
                {trip[0]  &&(
                    <div className='trip-info-border'>
                    <EditOutlinedIcon onClick={handleEditTrip} fontSize='small'/>
    
                    <h3>{trip[0].name}</h3>
                    <h6>{trip[0].description}</h6>
                    </div>                
                )}
                </>

            ):(
                <div className='trip-info-border'>
                <Col><input className='update-trip-input' onChange={(e)=> setName(e.target.value)}placeholder={trip[0].name}/>
                <input className='update-trip-input' onChange={(e)=> setDescription(e.target.value)} placeholder={trip[0].description}/>
                </Col><Col bsPrefix='update-trip-col'><button className='update-button' onClick={updateTrip}>save</button>
                <button className='update-button' onClick={handleEditTrip}>cancle</button>
                </Col>
                </div>
            )}
            
            </Row>
        <Row bsPrefix='trip-tabs'>
        <button className={
                detialChoice === 'map' ? 'tab--active':'tab--inactive'}
                onClick={()=>setDetialChoice('map')}>
                    Map
                </button>
            <button className={
                detialChoice=== 'checklist' ? 'tab--active':'tab--inactive'            }
            onClick={()=> setDetialChoice('checklist')}>
                Checklist
            </button>
            
            <button className={
                detialChoice === 'luggage' ? 'tab--active':'tab--inactive'}
                onClick={()=>setDetialChoice('luggage')}>
                    luggage
                </button>
        </Row>
        {tripDetails} 
        </Container>
      
     );
}
 
export default TripPage;

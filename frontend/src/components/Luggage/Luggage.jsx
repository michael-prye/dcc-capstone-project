import React, {useEffect, useState} from "react";
import axios from "axios";
import useAuth from "../../hooks/useAuth";
import LuggageItems from "./LuggageItems/LuggageItems";
import "./Luggage.css"
import ClearIcon from '@mui/icons-material/Clear';
import { Col, Container, Row } from 'react-bootstrap';




const Luggage = (props) => {
    const [user,token] = useAuth();
    const [luggage, setLuggage] = useState([]);
    const [luggageName, setLuggageName] = useState();

    useEffect(()=>{
        getLuggage();
    },[])

    async function getLuggage(){
        let response = await axios.get(
            `http://127.0.0.1:8000/api/luggage/?trip=${props.tripId}`,
            {
                headers: {
                    Authorization: "Bearer " + token,
                  },
            }
        ).then((response)=>{
            console.log('GetLuggage: ', response.status, response.data)
            setLuggage(response.data)
        })
    }
    async function addLuggage(){
        let response = await axios.post(
            `http://127.0.0.1:8000/api/luggage/?trip=${props.tripId}`,{
                name: luggageName,
            },
            {
                headers: {
                    Authorization: "Bearer " + token,
                  },
            }            
        )
        console.log('addLuggage: ', response.data, response.status)
        getLuggage();
        setLuggageName('')
    }
    async function deleteLuggage(id){
        let response = await axios.delete(
            `http://127.0.0.1:8000/api/luggage/?luggage=${id}`,
            {
                headers: {
                    Authorization: "Bearer " + token,
                  },
            }   
        )
        console.log('deleteLuggage', response.data, response.status)
        getLuggage();
    }

    
    return ( 
        <div className="luggage">
            <div className="luggage-header">
            <h2>Luggage</h2>
            </div>
            <div className="user-input">
            <input className="luggage-input" type="text"
            placeholder="luggage"
            value={luggageName}
            onChange={(e)=>setLuggageName(e.target.value)} />
            <button className="luggage-button" onClick={()=>{addLuggage()}}>ADD</button>
            </div>
            
            {luggage.map((l)=>{
                return(
                    <div className="lu">
                    <Row bsPrefix="luggage-list">
                    <h3>{l.name}</h3>
                    <ClearIcon onClick={()=>{deleteLuggage(l.id)}}/>
                    </Row>
                    <LuggageItems id = {l.id}/>
                    </div>
                )
            })}

        </div> 
    );
}
 
export default Luggage;
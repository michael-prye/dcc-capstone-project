import React, {useEffect, useState} from "react";
import axios from "axios";
import useAuth from "../../hooks/useAuth";
import LuggageItems from "./LuggageItems/LuggageItems";



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
        <div>
            <input type="text"
            placeholder="luggage"
            value={luggageName}
            onChange={(e)=>setLuggageName(e.target.value)} />
            <button onClick={()=>{addLuggage()}}>ADD</button>
            {luggage.map((l)=>{
                return(
                    <div>
                    
                    <p>{l.name}</p>
                    <button onClick={()=>{deleteLuggage(l.id)}}>DELETE Luggage</button>
                    <LuggageItems id = {l.id}/>
                    </div>
                )
            })}

        </div> 
    );
}
 
export default Luggage;
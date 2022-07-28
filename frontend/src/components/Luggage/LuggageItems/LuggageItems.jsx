import React, {useEffect, useState} from "react";
import axios from "axios";
import useAuth from "../../../hooks/useAuth";
import "./LuggageItems.css"
import ClearIcon from '@mui/icons-material/Clear';




const LuggageItems = (props) => {
    const [user, token] = useAuth();
    const [luggageItems, setLuggageItems] = useState([]);
    const [luggageItemName, setLuggageItemName] = useState();

    useEffect(()=>{
        getLuggageItems();
    },[props.id])
    
    async function getLuggageItems(){
        let response = await axios.get(
            `http://127.0.0.1:8000/api/luggage-item/?luggage=${props.id}`,
            {
                headers: {
                    Authorization: "Bearer " + token,
                  }, 
            }
        ).then((response) => {
            console.log('getLuggageItems: ', response.status, response.data)
            setLuggageItems(response.data)
            setLuggageItemName('')
        })
    }
    async function addLuggageItem(){
        let response = await axios.post(
            `http://127.0.0.1:8000/api/luggage-item/?luggage=${props.id}`,
            {
                name: luggageItemName,
            },
            {
                headers: {
                    Authorization: "Bearer " + token,
                  },
            }                  
        )
        console.log('addLuggageItems: ', response.data, response.status)
        getLuggageItems();
    }
    async function deleteLuggageItem(id){
        let response = await axios.delete(
            `http://127.0.0.1:8000/api/luggage-item/?item=${id}`,
            {
                headers: {
                    Authorization: "Bearer " + token,
                  },
            }   
        )
        console.log('deleteLuggageItem: ', response.data, response.status)
        getLuggageItems();
    }



    return ( 
        <div>
            <input className="item-input" type="text"
            placeholder="Luggage Item"
            value={luggageItemName}
            onChange={(e)=>setLuggageItemName(e.target.value)} />
            <button className="item-button" onClick={()=>{addLuggageItem()}}>ADD</button>
            {luggageItems.map((item)=>{
                return(
                    <div className="item-list">
                        <h5>{item.name}</h5>
                        <ClearIcon fontSize="small" onClick={()=>{deleteLuggageItem(item.id)}}/>
                    </div>
                )
            })}
        </div>
     );
}
 
export default LuggageItems;
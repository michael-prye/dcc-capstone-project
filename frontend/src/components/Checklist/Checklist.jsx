import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSearchParams } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import { Row,Container, Col } from "react-bootstrap";
import "./Checklist.css"
import ClearIcon from '@mui/icons-material/Clear';



const Checklist = (props) => {
    const [user,token] = useAuth();
    const [listItems, setListItems] = useState([]);
    const [itemName, setItemName] = useState();
    const [checkList, setChecklist] = useState([]);

    useEffect(()=>{
        getChecklist();
    },[])

    async function getChecklist(){
                let response = await axios.get(
            `http://127.0.0.1:8000/api/checklist/?list=${props.tripId}`,
            {
                headers: {
                    Authorization: "Bearer " + token,
                  },
            })
            console.log('CHECKLIST DATA: ', response.data)
            setChecklist(response.data)
            try{

                await axios.get(`http://127.0.0.1:8000/api/list-item/?list=${response.data[0].id}`,
                {
                    headers: {
                        Authorization: "Bearer " + token,
                        },
                }).then((response)=>{
                        console.log('Checklist items data: ', response.data)
                        setListItems(response.data)
                        setItemName('')
                    })
            }catch(e){
                console.log(e.response.data)}
        }
    async function addItem(){
        let response = await axios.post(
            `http://127.0.0.1:8000/api/list-item/?list=${checkList[0].id}`,
            {
                name: itemName
            },
            {
                headers: {
                    Authorization: "Bearer " + token,
                  },
            })
            console.log('Add item request status', response.status)
            getChecklist();
    }
    async function deleteItem(id){
        let response = await axios.delete(`http://127.0.0.1:8000/api/list-item/?item=${id}`,
        {
            headers: {
                Authorization: "Bearer " + token,
              },
        });
        console.log(response.status)
        getChecklist(); 
    }
        



    return (
        <div className="checklist">
        
           
            <Col><h2>CHECKLIST</h2></Col>
            
        <Row>
        
            <input type="text"
            className="list-input"
            placeholder="Item"
            value={itemName}
            onChange={(e)=>setItemName(e.target.value)} />
            <button className="list-button" onClick={()=>{addItem();getChecklist();}}>ADD</button>
        
        </Row>
        
        
        {listItems.map((item)=>{
            return(
                <Row bsPrefix="delete-item">
                <p>{item.name}</p>
                <ClearIcon onClick={()=>{deleteItem(item.id); getChecklist();}}></ClearIcon>
                </Row>
                
            )
        })}
     
        </div>
    );
}
 
export default Checklist;

// async function addItem(){
//     await axios.post(`http://127.0.0.1:8000/api/list-item/?list=${checkList.id}`,
//     {
//         name: itemName
//     },
//     {
//         headers: {
//             Authorization: "Bearer " + token,
//           },
//     }).then((response)=>{
//         console.log(response.data)
//     })
// }
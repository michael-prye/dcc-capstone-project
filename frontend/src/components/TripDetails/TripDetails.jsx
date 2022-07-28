import { Col, Container, Row } from "react-bootstrap";
import { useEffect, useState } from "react";
import "./TripDetails.css"
import AddStopForm from "../AddStopForm/AddStopForm";
import UpdateStop from "../UpdateStop/UpdateStop";
import { Snackbar, Alert, Dialog, DialogTitle } from "@mui/material";
import axios from "axios";
import useAuth from "../../hooks/useAuth";
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import ClearIcon from '@mui/icons-material/Clear';
import AddLocationIcon from '@mui/icons-material/AddLocation';




const TripDetails = (props) => {
    const [addButton, setAddButton]=useState(false)
    const [changeButton, setChangeButton] = useState(false)
    const [deleteError,setDeleteError] = useState(false)
    const [verifyDelete, setVerifyDelete] = useState(false)
    const [user,token] = useAuth();
    const [deleteResponse, setdeleteResponse] = useState();

    useEffect(()=>{
        setAddButton(false)
    },[deleteResponse])


    function handleAdd(event){
        event.stopPropagation();
        if(!addButton){
            setAddButton(true);
        }
        else{
            setAddButton(false);
        }

    }




    function handleDelete(event){
        if (props.length -1 === props.i){
            setDeleteError(true)
        }
        else{
            
            deleteStop();
        }
    }


    async function deleteStop(){
        let response = await axios.delete(
            `http://127.0.0.1:8000/api/stop/?id=${props.stop.id}`,
            {
                headers: {
                    Authorization: "Bearer " + token,
                },
                }
        ).then((response)=>{
            console.log(response.status)
            setdeleteResponse(response.data)
            props.getStops();


        })
    }

    return ( 
       <div>
           
            <Row bsPrefix="trip-details">
                {changeButton?
                <>
                <UpdateStop getStops={props.getStops} id={props.stop.id} setChangeButton={setChangeButton}/>
                </>  
            :
            <>

            <p className="trip-detail">{String.fromCharCode((props.i + 1) +64)}.</p>
            <p className="trip-detail">{props.stop.address}</p>
            {props.stop.stop_number === 0?(
                <button className="trip-button" onClick={()=>setChangeButton(true)}>CHANGE</button>
            ):(
                <>
                <Snackbar open={deleteError} autoHideDuration={1000} onClose={()=>setDeleteError(false)}>
                    <Alert onClose={()=>setDeleteError(false)} severity='error' sx={{width: '100%'}}>
                        Cant't Delete need at least a starting and end point
                    </Alert>
                </Snackbar>
                <button className="trip-button" onClick={()=>{handleDelete();}}>DELETE</button>

                </>
            )}
            </>
            }
            </Row>
            <Row>
           
                {props.length -1 === props.i &&
                    <div>
                    <button className="trip-button" onClick={handleAdd}>ADD</button>
                    {addButton=== true &&
                    <AddStopForm stop = {props.stop} getStops={props.getStops} /> }
                    </div>
                    
                }
            </Row>
            
            </div>
        

     );
}
 
export default TripDetails;
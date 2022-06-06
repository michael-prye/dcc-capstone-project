import { Col, Container, Row } from "react-bootstrap";
import { useState } from "react";
import "./StopDetails.css"
import AddStopForm from "../AddStopForm/AddStopForm";
import UpdateStop from "../UpdateStop/UpdateStop";


const StopDetails = (props) => {
    const [addButton, setAddButton]=useState(false)
    const [changeButton, setChangeButton] = useState(false)

    return ( 
       <div>
            <Row>
                {changeButton?
                <>
                <UpdateStop getStops={props.getStops} id={props.stop.id} setChangeButton={setChangeButton}/>
                </>  
            :
            <>
            {props.stop.address}
            {props.stop.stop_number === 0?(
                <button onClick={()=>setChangeButton(true)}>CHANGE</button>
            ):(
                <button>DELETE</button>
            )}
            </>
            }
                
                
            </Row>
           
                {props.length -1 === props.i &&
                    <div>
                    <button onClick={function(e){setAddButton(true); }}>ADD</button>
                    {addButton=== true &&
                    <AddStopForm stop = {props.stop} getStops={props.getStops} /> }
                    </div>
                    
                }
            
            </div>
        

     );
}
 
export default StopDetails;
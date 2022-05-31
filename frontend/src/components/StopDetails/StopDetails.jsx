import { Col, Container, Row } from "react-bootstrap";
import { useState } from "react";
import "./StopDetails.css"
import AddStopForm from "../AddStopForm/AddStopForm";


const StopDetails = (props) => {
    const [toggleAdd, setToggleAdd] = useState(false);
    const [waypts, setWaypts] = useState([]);
    const [addButton, setAddButton]=useState(false)


    function handleAdd(){
        if (toggleAdd){
            setToggleAdd(false);
        }else{
            setToggleAdd(true)
        }

    }




    return ( 
        <Container>
            <Row>
                <Col>{props.index +1}</Col>
                <Col>{props.stop.address}</Col>
                {props.stop.start === true || props.stop.end === true?(
                    <Col><button>CHANGE</button></Col>
                ):(
                    <Col><button>DELETE</button></Col>
                )}
            </Row>
            <Row>
                {props.stop.end !== true &&
                    <div>
                    <button onClick={()=>setAddButton(true)}>ADD</button>
                    {addButton=== true &&
                    <AddStopForm day = {props.stop.day} waypts={waypts} setWaypts={setWaypts}/> }
                    </div>
                    
                }
            </Row>
        </Container>

     );
}
 
export default StopDetails;
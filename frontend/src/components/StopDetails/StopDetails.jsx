import { Col, Container, Row } from "react-bootstrap";
import AddStopForm from "../AddStopForm/AddStopForm";
import { useState } from "react";
import "./StopDetails.css"


const StopDetails = (props) => {
    const [toggleAdd, setToggleAdd] = useState(false);


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
                <Col><button onClick={handleAdd}>ADD</button></Col>
                {toggleAdd === true &&
                <AddStopForm id = {props.stop.id}/>}
            </Row>
        </Container>

     );
}
 
export default StopDetails;
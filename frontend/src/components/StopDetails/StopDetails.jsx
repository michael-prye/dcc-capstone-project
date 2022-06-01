import { Col, Container, Row } from "react-bootstrap";
import { useState } from "react";
import "./StopDetails.css"
import AddStopForm from "../AddStopForm/AddStopForm";


const StopDetails = (props) => {
    const [addButton, setAddButton]=useState(false)





    return ( 
        <Container>
            <Row>

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
                    <button onClick={function(e){setAddButton(true); console.log(props.stops)}}>ADD</button>
                    {addButton=== true &&
                    <AddStopForm stop = {props.stop} stops={props.stops} /> }
                    </div>
                    
                }
            </Row>
        </Container>

     );
}
 
export default StopDetails;
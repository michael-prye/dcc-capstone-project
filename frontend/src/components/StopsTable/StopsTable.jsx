import { Container, Row, Col } from "react-bootstrap";
import "./StopsTable.css"

const StopsTable = (props) => {
    return ( 
        <Container>
            
            {props.stops.map((stop, index)=>{
                    return(
                    <div>
                    <Row>
                    <Col>{index+1}</Col>
                    <Col>{stop.address}</Col>
                    {stop.start === true || stop.end === true?(
                        <Col><button>Change</button></Col>

                    ):(
                        <Col><button>DELETE</button></Col>

                    )}
                    
                    </Row>
                    <Row>
                        <Col><button>ADD</button></Col>
                    </Row>
                    </div>)


                })}
            
        </Container>
     );
}
 
export default StopsTable;
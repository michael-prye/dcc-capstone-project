import { useState } from "react";
import { Container, Row } from "react-bootstrap";
import AddStop from "../../utils/AddStop";



const AddStopForm = (props) => {
    const [name, setName] = useState();
    const [description, setDescription] = useState();
    const [address, setAddress] = useState();
    
    function handleClick(){
        AddStop(name,description,address,props.id);

    }
    

    return ( 
    <Container>
        <Row>
            <input
            type='text'
            placeholder="Name"
            value = {name}
            />
            <input
            type='text'
            placeholder="description"
            value = {description}
            />
            <input
            type='text'
            placeholder="address"
            value = {address}
            />
            <button onClick={handleClick}>SAVE</button>
        </Row>
    </Container> 
    );
}
 
export default AddStopForm;
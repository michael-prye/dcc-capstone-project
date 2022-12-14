import React, { useState } from "react";
import Datetime from 'react-datetime';
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import "./GetMotorcycleForm.css"
import axios from "axios";
import useAuth from "../../hooks/useAuth";
import "react-datetime/css/react-datetime.css";



const GetMotorcycleForm = (props) => {
    const [user,token] = useAuth();
    const [buttonToggled, setButtonToggled] = useState(false);
    const [yearInput, setYearInput] = useState();
    const [makeInput, setMakeInput] = useState();
    const [modelInput, setModelInput] = useState();


    let inputPros = {
        className: 'custom-input',
        placeholder: 'Year'
    }

    async function addMotorcycle(){
        
        await axios.post(`http://127.0.0.1:8000/api/motorcycle/`,
        {
            year: yearInput,
            make: makeInput,
            model: modelInput,
        },
        {
            headers:{
                Authorization: "Bearer " + token,
            },
        }).then(response =>{
            props.getMotorcycles();
            setButtonToggled(false)
            setMakeInput('');
            setModelInput('')

        } )
    }
    
    function handleSubmit(e){
        e.preventDefault();   
    }


    function handleClick(){
        addMotorcycle();
    }
    function handleAdd(){
        setButtonToggled(!buttonToggled);
    }


    return (
        <Container fluid>
        <button className="add-button" onClick={handleAdd}>ADD MOTORCYCLE</button>
        {buttonToggled && (
            <form onSubmit={handleSubmit}>
            <Row bsPrefix="form-row">
                <Col>
            <Datetime
                
                timeFormat={false}
                dateFormat="YYYY"
                onChange={(e)=> setYearInput(e.year())}
                closeOnSelect={true}
                inputProps={inputPros}
                
            />
            </Col>
            <Col>
            <input
            type="text"
            value={makeInput}
            placeholder="Make"
            onChange={(e) => setMakeInput(e.target.value)}
            className="custom-input"
            />
            </Col>
            <Col>
            <input
            type="text"
            value={modelInput}
            placeholder="Model"
            onChange={(e) => setModelInput(e.target.value)}
            className="custom-input"
            />
            </Col>
           <Col><button type="submit" className="save-button" onClick={handleClick}>SAVE</button></Col>
            </Row>


        </form>

        )}
        </Container>
    );
}
 
export default GetMotorcycleForm;
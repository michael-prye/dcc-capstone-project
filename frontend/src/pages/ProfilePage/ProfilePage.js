import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import GetMotorcycleForm from '../../components/GetMotorcycleForm/GetMotorcycleForm';
import MotorcycleCard from '../../components/MotorcycleCard/MotorcycleCard';
import useAuth from '../../hooks/useAuth';
import './ProfilePage.css'
import CreateTripForm from '../../components/CreateTripForm/CreateTripForm';




const ProfilePage = () => { 
    
    const [user,token] = useAuth();
    const [motorcycles, setMotorcycles] = useState();

    useEffect(()=> {
        getMotorcycles();
    },[]);

    async function getMotorcycles(){
        let response = await axios.get('http://127.0.0.1:8000/api/motorcycle/',
        {
            headers: {
                Authorization: "Bearer " + token,
            },
        })
        .then((response) =>{
            setMotorcycles(response.data)
        })
        .catch((error)=>{
            console.log(error.response)
        });
    }


    return (
        <div>
        <Container>
            <Row bsPrefix='custom-row'>
            {motorcycles && (
                <>
                {motorcycles.map((motorcycle)=>{
                return(
                    <Col><MotorcycleCard motorcycle={motorcycle}/></Col>
                )
            })}
                </>)}
            </Row>
            </Container>
            
            <GetMotorcycleForm getMotorcycles={getMotorcycles}/>
            <CreateTripForm/>
            </div>

           
            
       
    );
}
 
export default ProfilePage;

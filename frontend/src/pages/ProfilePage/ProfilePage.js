import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import GetMotorcycleForm from '../../components/GetMotorcycleForm/GetMotorcycleForm';
import useAuth from '../../hooks/useAuth';
import './ProfilePage.css'
import Carousel from 'react-multi-carousel';
import ClearIcon from '@mui/icons-material/Clear';
import { Dialog, DialogActions, DialogTitle } from "@mui/material";





const ProfilePage = () => { 
    
    const [user,token] = useAuth();
    const [motorcycles, setMotorcycles] = useState();
    const [showDeleteDialog, setShowDeleteDialog] = useState(false);
    const [deletedMotorcycle, setDeletedMotorcycle] = useState();
    const handleClose = () =>{setShowDeleteDialog(false)}
    const responsive = {
        desktop: {
            breakpoint: { max: 3000, min: 10 },
            items: 5,
          },}

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
    async function deleteMotorcycle(){
        await axios.delete(`http://127.0.0.1:8000/api/motorcycle/?id=${deletedMotorcycle.id}`,
        {
            headers: {
              Authorization: "Bearer " + token,
            },
          }).then((response)=>
          {
            console.log('DELETE motorcycle ', response.status )
            getMotorcycles();
            handleClose();
          })
    }


    return (
        <div>
        
            
        <div className='moto-carousel'>
            {motorcycles && (
                
                <Carousel itemClass='moto-card' centerMode={true} autoPlay={false} responsive={responsive} shouldResetAutoplay={false}>
                {motorcycles.map((motorcycle)=>{
                return(
                    <div>
            <button className="delete-button"onClick={()=>{setDeletedMotorcycle(motorcycle);setShowDeleteDialog(true)}}>
            <ClearIcon fontSize="small"/></button>
            
            <h4>Make: {motorcycle.make}</h4>
            <h4>Model: {motorcycle.model}</h4>
            <h4>Year: {motorcycle.year}</h4>
        </div>
                )
            })}
                </Carousel>)}
                </div>
            
            
            
            
            
            <GetMotorcycleForm getMotorcycles={getMotorcycles}/>
            <Dialog
            open={showDeleteDialog}
            onClose={handleClose}>
            <DialogTitle>Do you want to delete this motorcycle?</DialogTitle>
            <DialogActions>
            <button onClick={deleteMotorcycle}>YES</button>
            <button onClick={handleClose}>NO</button>
        </DialogActions>
      </Dialog>
            
            </div>

           
            
       
    );
}
 
export default ProfilePage;

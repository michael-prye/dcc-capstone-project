import React, { useEffect } from 'react';
import StarIcon from '@mui/icons-material/Star';
import StarHalfIcon from '@mui/icons-material/StarHalf';
import StarOutlineIcon from '@mui/icons-material/StarOutline';
import Carousel from "react-multi-carousel";
import { Col, Row } from "react-bootstrap";
import "react-multi-carousel/lib/styles.css";




const RestaurantCard = (props) => {

    useEffect(()=>{
    },[])

    function getStarRating(rate){
        if (rate === '3'){
            return(<Col>
                <StarIcon/>
                <StarIcon/>
                <StarIcon/>
                <StarOutlineIcon/>
                <StarOutlineIcon/>
                </Col>)
        }else if (rate ==='3.5'){
            return(<Col>
                <StarIcon/>
                <StarIcon/>
                <StarIcon/>
                <StarHalfIcon/>
                <StarOutlineIcon/>           
                </Col>)
        }
        else if (rate ==='4.0'){
            return(<Col>
                <StarIcon/>
                <StarIcon/>
                <StarIcon/>
                <StarIcon/>
                <StarOutlineIcon/>           
                </Col>)
        }
        else if (rate ==='4.5'){
            return(<Col>
                <StarIcon/>
                <StarIcon/>
                <StarIcon/>
                <StarIcon/>
                <StarHalfIcon/>       
                </Col>)
        }
        else if (rate ==='5.0'){
            return(<Col>
                <StarIcon/>
                <StarIcon/>
                <StarIcon/>
                <StarIcon/>
                <StarIcon/>
         
                </Col>)
        }
    }



    return ( <>
    
        
        <img src={props.restaurant.photo.images.small.url} alt="" />
        {getStarRating(props.restaurant.rating)}
        <h3>{props.restaurant.name}</h3>
        <h6>{props.restaurant.address}</h6>

        </>
     );
}
 
export default RestaurantCard;
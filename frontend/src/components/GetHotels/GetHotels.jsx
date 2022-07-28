import axios from "axios";
import React, { useEffect,useState } from "react";
import "react-multi-carousel/lib/styles.css";
import { Col, Row } from "react-bootstrap";
import StarIcon from '@mui/icons-material/Star';
import StarHalfIcon from '@mui/icons-material/StarHalf';
import StarOutlineIcon from '@mui/icons-material/StarOutline';
import Carousel from "react-multi-carousel";
import "./GetHotels.css"




const GetHotels = (props) => {

    var today = new Date();
    var checkIn = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
    var checkout = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+(today.getDate()+1);
    const [hotelData, setHotelData] = useState([]);
    const [hotelTogle, setHotelTogle] = useState(false);
    const responsive = {
        desktop: {
            breakpoint: { max: 3000, min: 10 },
            items: 3,
          },
        }
    function handleHotelTogle(){
        if (hotelTogle === true){
            setHotelTogle(false)
        }
        else{
            setHotelTogle(true)
        }
    }

    useEffect(()=>{
        getHotels();
    },[])
    async function getHotels(){
        
        const geoOptions = {
            method: 'GET',
            url: 'https://priceline-com-provider.p.rapidapi.com/v1/hotels/locations-by-geo',
            params: {longitude: `${props.stops[1].lng}`,latitude: `${props.stops[1].lat}`},
            headers: {
                'X-RapidAPI-Host': 'priceline-com-provider.p.rapidapi.com',
                'X-RapidAPI-Key': 'd466a51d92msh636b7041ef292e2p1a8916jsnedb8001f5e6d'
              }};

        let response = await axios.request(geoOptions);
        try {
            const hotelOptions = {
                method: 'GET',
                url: 'https://priceline-com-provider.p.rapidapi.com/v1/hotels/search',
                params: {
                    sort_order: 'HDR',
                    location_id: `${response.data.matchedCity.cityID}`,
                    date_checkout: `${checkout}`,
                    date_checkin: `${checkIn}`,
                    star_rating_ids: '3.0,3.5,4.0,4.5,5.0',
                    rooms_number: '1'
            },
            headers: {
                'X-RapidAPI-Host': 'priceline-com-provider.p.rapidapi.com',
                'X-RapidAPI-Key': 'd466a51d92msh636b7041ef292e2p1a8916jsnedb8001f5e6d'
              }
            }
            await axios.request(hotelOptions).then((response)=>{
                console.log('hotel data: ', response.data.hotels[0].pclnId);
                const data = response.data.hotels.filter(hotel=> hotel.pclnId === undefined );
                console.log('filtered hotel data: ',data);
                setHotelData(data);
    
            })}            
         catch (e) {
            console.log('error: ',e.response.data)
            
        }}

        function getStarRating(rate){
            if (rate === 3){
                return(<Col>
                    <StarIcon/>
                    <StarIcon/>
                    <StarIcon/>
                    <StarOutlineIcon/>
                    <StarOutlineIcon/>
                    </Col>)
            }else if (rate ===3.5){
                return(<Col>
                   <StarIcon/>
                <StarIcon/>
                <StarIcon/>
                <StarHalfIcon/>
                <StarOutlineIcon/>           
                    </Col>)
            }
            else if (rate ===4.0){
                return(<Col>
                <StarIcon/>
                <StarIcon/>
                <StarIcon/>
                <StarIcon/>
                <StarOutlineIcon/>          
                    </Col>)
            }
            else if (rate ===4.5){
                return(<Col>
                     <StarIcon/>
                <StarIcon/>
                <StarIcon/>
                <StarIcon/>
                <StarHalfIcon/>              
                    </Col>)
            }
            else if (rate ===5){
                return(<Col>
                <StarIcon/>
                <StarIcon/>
                <StarIcon/>
                <StarIcon/>
                <StarIcon/>           
                    </Col>)
            }
        }


    return ( 
        <Row bsPrefix="hotels">
        <button className="hotel-button" onClick={handleHotelTogle}>HOTELS</button>
        {hotelTogle=== true &&(
            <Carousel responsive={responsive} shouldResetAutoplay={false} infinite={true}>
            {hotelData.map((hotel)=>{
                return(
                   
                <div>
                <img src={hotel.thumbnailUrl} alt="" />
                <h6>{getStarRating(hotel.starRating)}</h6>
                <h3>{hotel.name}</h3>
                <h6>{hotel.location.address.addressLine1}</h6>
                
                </div>
              
                )

            })}

            
            
</Carousel>
           )
        }
        </Row>
        
     );
}
 
export default GetHotels;
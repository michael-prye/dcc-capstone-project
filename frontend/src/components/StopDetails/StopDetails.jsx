import axios from "axios";
import { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import WeatherCard from "../WeatherCard/WeatherCard";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import GetHotels from "../GetHotels/GetHotels";
import RestaurantCard from "../RestaurantCard/RestaurantCard";
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';
import "./StopDetails.css"







const StopDetails = (props) => {

    const [weather,setWeather] = useState([]);
    const [restaurantData, setRestaurantData] = useState([]);
    const [restaurantTogle, setRestaurantTogle] = useState(false);
    const [weatherTogle, setWeatherTogle] = useState(false)
    const responsive = {
        desktop: {
            breakpoint: { max: 3000, min: 10 },
            items: 3,
          },
    }
    
    
    useEffect(()=>{
        updateMap();
        getWeather();
         getRestaurants();
        
    },[props.stops])

    function handleRestaurantTogle(){
        if (restaurantTogle === true){
            setRestaurantTogle(false)
        }
        else{
            setRestaurantTogle(true)
        }
    }
    function handleWeatherTogle(){
        if (weatherTogle === true){
            setWeatherTogle(false)
        }
        else{
            setWeatherTogle(true)
        }
    }
    

    async function getWeather(){
        let data = [];
        let options = {
            method: 'get',
            url: 'https://weatherapi-com.p.rapidapi.com/forecast.json',
            params: {q: `${props.stops[0].lat},${props.stops[0].lng}`, days: '1'},
            headers: {
            'X-RapidAPI-Host': 'weatherapi-com.p.rapidapi.com',
            'X-RapidAPI-Key': 'd466a51d92msh636b7041ef292e2p1a8916jsnedb8001f5e6d'}
        };
        let responseOne = await axios.request(options).then((response)=>{
            data.push(response.data)
        })
        options = {
            method: 'get',
            url: 'https://weatherapi-com.p.rapidapi.com/forecast.json',
            params: {q: `${props.stops[1].lat},${props.stops[1].lng}`, days: '1'},
            headers: {
            'X-RapidAPI-Host': 'weatherapi-com.p.rapidapi.com',
            'X-RapidAPI-Key': 'd466a51d92msh636b7041ef292e2p1a8916jsnedb8001f5e6d'}
        };
        let responseTwo = await axios.request(options).then((response)=>{
            data.push(response.data)
        })
        console.log('final DATA: ', data)
        setWeather(data)
        console.log(weather)
    }

    function updateMap(){
        props.setState({...props.state,
           origin: {lat: parseFloat(props.stops[0].lat), lng: parseFloat(props.stops[0].lng) },
           destination:{lat: parseFloat(props.stops[1].lat), lng: parseFloat(props.stops[1].lng)},
           waypoints:[]})
           props.setCallbackRun(true)
    }

    
        async function getRestaurants(){
            const options = {
                method: 'GET',
                url: 'https://travel-advisor.p.rapidapi.com/restaurants/list-by-latlng',
                params:{
                    latitude: `${props.stops[1].lat}`,
                    longitude: `${props.stops[1].lng}`,
                    limit: '30',
                    currency: 'USD',
                    distance: '5',
                    open_now: 'false',
                    lunit: 'km',
                    lang: 'en_US'
                },
                headers: {
                    'X-RapidAPI-Key': 'd466a51d92msh636b7041ef292e2p1a8916jsnedb8001f5e6d',
                    'X-RapidAPI-Host': 'travel-advisor.p.rapidapi.com'
                  }
            }
    
            let response = await axios.request(options).then((response)=>{
                const data = response.data.data.filter(restaurant=> restaurant.name !== undefined );
                const testData = data.filter(i=> i.photo !== undefined );
                console.log('restaurant data: ',testData)
                setRestaurantData(testData);
            })
                
        }

    return ( 
        <>
        <Row bsPrefix="stops">
            <h3>{props.stops[0].address}</h3><ArrowRightAltIcon/>
            <h3>{props.stops[1].address}</h3>
        </Row>
        <Row>
        <button className="stop-details" onClick={handleWeatherTogle}>Weather</button>
        <Row bsPrefix="weather">
        
        {weatherTogle === true&& (
            <>
            {weather.map((weather)=>{
                return(<WeatherCard weather={weather}/>)
            })}
            </>
        )}
        
        </Row>
        <button className="stop-details" onClick={handleRestaurantTogle}>restaurants</button>
        <Row bsPrefix="restaurants">
        
        
        {restaurantTogle === true && (
           
            <Carousel responsive={responsive} shouldResetAutoplay={false} infinite={true}
            centerMode={true}>
            {restaurantData.map((restaurant)=>{
                return(
                    <RestaurantCard restaurant={restaurant}/>
                )
            })}
        </Carousel>
        

        )}
        </Row>
        
        <GetHotels stops= {props.stops}/>
        </Row>
        
        
        </>

     );
}
 
export default StopDetails;


import axios from "axios";
import { useEffect, useState } from "react";
import { Row } from "react-bootstrap";
import WeatherCard from "../WeatherCard/WeatherCard";


const StopDetails = (props) => {

    const [weather,setWeather] = useState([]);

    useEffect(()=>{
        updateMap();
        getWeather();
    },[props.stops])

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





    return ( 
        <>
        {props.stops.map((stop)=>{
            return(<p>{stop.address}</p>)
        })}
        <Row>
        {weather.map((weather)=>{
            return(<WeatherCard weather={weather}/>)
        })}
        </Row>
        </>

     );
}
 
export default StopDetails;
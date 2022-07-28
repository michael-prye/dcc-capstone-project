import { Card, CardContent, CardHeader, CardMedia } from "@mui/material";
import { useEffect } from "react";
import { Col } from "react-bootstrap";


const WeatherCard = (props) => {
    useEffect(()=>{
        console.log('weather card: ',props.weather)
    },[])
    return ( 
    
        <>
        <Col>
        <Card raised={true} sx={{background:'#f65151', color: '#fef4f4'}}>
            <CardHeader title={props.weather.location.name}>
                {props.weather.location.name}
            </CardHeader>
            
            <CardContent>
                <img src={props.weather.current.condition.icon}/>
                <p>TEMP: {props.weather.current.temp_f}</p>
                <p>wind mph: {props.weather.current.wind_mph}</p>
                <p>Chance of rain: {props.weather.forecast.forecastday[0].day.daily_chance_of_rain}%</p>
            </CardContent>
        </Card>
        </Col>
        </>
     );
}
 
export default WeatherCard;
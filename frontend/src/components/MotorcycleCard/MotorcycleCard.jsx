import { Card } from "react-bootstrap";
import "./MotorcycleCard.css"

const MotorcycleCard = (props) => {
    return ( 
        <div className="moto-card">
            <h4>Make: {props.motorcycle.make}</h4>
            <h4>Model: {props.motorcycle.model}</h4>
            <h4>Year: {props.motorcycle.year}</h4>
        </div>
     );
}
 
export default MotorcycleCard;
import { Card } from "react-bootstrap";

const MotorcycleCard = (props) => {
    return ( 
        <Card>
            <Card.Text>Make: {props.motorcycle.make}</Card.Text>
            <Card.Text>Model: {props.motorcycle.model}</Card.Text>
            <Card.Text>Year: {props.motorcycle.year}</Card.Text>
        </Card>
     );
}
 
export default MotorcycleCard;
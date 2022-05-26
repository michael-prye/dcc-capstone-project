import axios from "axios";
import { useState } from "react";
import { useContext } from "react";
import AuthContext from "../context/AuthContext";

const AddStop = (name, description, address, id) => {
    const [status, setStatus] = useState();
    const { user,token } = useContext(AuthContext);

    async function addStop(){
        let response = await axios.post(`http://127.0.0.1:8000/api/stop/?trip=${id}`,
        {
            name: name,
            description: description,
            latitude: 0,
            longitude: 0,
            day: 0,
            address: address

        },
        {
            headers: {
                Authorization: "Bearer " + token,
              },
        }).then((response)=>{
            setStatus(response.data)
        });
    }




    return (status);
}
 
export default AddStop;
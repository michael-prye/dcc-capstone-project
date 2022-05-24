import React, { useState, useEffect } from "react";
import axios from "axios";
import {MotorcycleKey} from "../localKeys.js"

const useMotorcyckeMake =function () {
    const [makeResults, setMakeResults] = useState(null);
    const apiKey = MotorcycleKey

    const options = {
        method: 'get',
        url: 'https://motorcycle-specs-database.p.rapidapi.com/make',
        headers: {
          'X-RapidAPI-Host': 'motorcycle-specs-database.p.rapidapi.com',
          'X-RapidAPI-Key': MotorcycleKey
    }};

    useEffect(() => {
        async function getMotorcycleMakes(){
            let response = await axios.request(options);
            setMakeResults(response.data);

        }
        getMotorcycleMakes();
    },[])
    
    return [makeResults];
}
 
export default useMotorcyckeMake;
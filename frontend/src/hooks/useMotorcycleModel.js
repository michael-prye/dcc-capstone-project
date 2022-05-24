import React, { useState, useEffect } from "react";
import axios from "axios";
import {MotorcycleKey} from "../localKeys.js"

const useMotorcyckeModel =function (make,year) {
    const [modelResults, sestmodelResults] = useState(null);

    const options = {
        method: 'get',
        url: `https://motorcycle-specs-database.p.rapidapi.com/model/make-id/${make}/${year}`,
        headers: {
          'X-RapidAPI-Host': 'motorcycle-specs-database.p.rapidapi.com',
          'X-RapidAPI-Key': MotorcycleKey
    }};

    useEffect(() => {
        async function getMotorcycleModel(){
            console.log(`Make${make} YEAR${year}`)
            let response = await axios.request(options);
            sestmodelResults(response.data);
        }
        getMotorcycleModel();
    },[])
    console.log(modelResults)
    return [modelResults];
}
 
export default useMotorcyckeModel;
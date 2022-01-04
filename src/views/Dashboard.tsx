import axios from "axios";
import React, { useEffect, useState } from "react";
import Header from './../components/Header';

const Dashboard = () => {
    const [temperatureData, setTemperatureData] = useState([]);

    useEffect(() => {
        getData();
    }, []);

    const getData = async () => {
        const url = 'https://raspberry-pi-sensor-api.azurewebsites.net/temperature'
        await axios.get(url)
        .then((response) => {
            setTemperatureData(response.data);
        })
        .catch(error => {
            console.log(error);
        })
    }

    const logToConsole = () => {
        console.log(temperatureData);   
    }
    
    return (
        <>
            <Header />
            <button onClick={logToConsole}>Log data to console</button>
            {temperatureData ? (
                <h2>data: {temperatureData.map((item: string | null, index) => (
                    <p key={index}>{item?.toString()}</p>
                ))}
                </h2>
            ) :
            (
                <p>data:</p>
            )}
        </>
    )
}

export default Dashboard;
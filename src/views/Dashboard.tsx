import axios from "axios";
import React, { useEffect, useState } from "react";
import LineChart from "../components/LineChart";
import ITemperatureReadings from "../models/ITemperatureReadings";
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

    const dummyData: ITemperatureReadings = {
        TemperatureReadings: [
            {
                ReadingDate: new Date('2021-12-17T00:00:00'),
                TemperatureC: 19,
                TemperatureF: 45
            },
            {
                ReadingDate: new Date('2021-12-17T00:00:00'),
                TemperatureC: 24,
                TemperatureF: 51
            },
            {
                ReadingDate: new Date('2021-12-17T00:00:00'),
                TemperatureC: 22,
                TemperatureF: 47
            },
            {
                ReadingDate: new Date('2021-12-17T00:00:00'),
                TemperatureC: 18,
                TemperatureF: 42
            },
            {
                ReadingDate: new Date('2021-12-17T00:00:00'),
                TemperatureC: 13,
                TemperatureF: 30
            },
            {
                ReadingDate: new Date('2021-12-17T00:00:00'),
                TemperatureC: 15,
                TemperatureF: 35
            },
        ]
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
            <div className="line-chart">
                <LineChart />
            </div>
        </>
    )
}

export default Dashboard;
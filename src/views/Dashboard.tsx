import axios from "axios";
import React, { useEffect, useState } from "react";
import LineChart from "../components/LineChart";
import ITemperatureReading from "../interfaces/ITemperatureReading";
import Header from './../components/Header';
import IMappedReading from "../interfaces/IMappedReading";
import IFinalMappedReadingArray from "../interfaces/IFinalMappedReadingArray";

const Dashboard = () => {
    const [temperatureData, setTemperatureData] = useState([]);

    useEffect(() => {
        getData();
    }, []);

    const logToConsole = () => {
        console.log(temperatureData);
    }   

    const getData = async () => {
        // const url = 'https://raspberry-pi-sensor-api.azurewebsites.net/temperature'
        const url = "https://localhost:7009/temperature";
        await axios.get(url)
        .then((response) => {
            setTemperatureData(response.data);
        })
        .catch(error => {
            console.log(error);
        })
    }

    let dataArray: IMappedReading[] = [];
    let array: IFinalMappedReadingArray[] = [];

    const mapIndividualReadings = () => {
        if (temperatureData.length >= 1) {
            temperatureData.map((reading: ITemperatureReading) => {
                const mappedReading = {
                    x: reading.readingDate.toString(),
                    y: reading.temperatureC,
                };
                dataArray.push(mappedReading);
            });
        }
        
    }

    const mapAllReadings = () => {
        let celciusReadings = {
            id: "TemperatureC",
            color: "hsl(99, 70%, 50%)",
            data: dataArray,
        };
        let fahrenheitReadings = {
            id: "TemperatureF",
            color: "hsl(345, 70%, 50%)",
            data: dataArray,
        };
        array.push(celciusReadings, fahrenheitReadings);
    };

    if (temperatureData.length) {
        mapIndividualReadings();
        mapAllReadings();
    }
    
    return (
        <>
            <Header />
            <button onClick={logToConsole}>Log data to console</button>
            {temperatureData.length ? (
            <>
                <h2>data:</h2>
                {temperatureData.map((item: ITemperatureReading, index) => (
                <h3 key={index}>{item?.readingDate}</h3>
                ))}
            </>
            ) : (
            <p>data:</p>
            )}
            
            {array.length >= 1 && (
                <div className="line-chart">
                    <LineChart data={array}/>
                </div>
            )}
        </>
    );
}

export default Dashboard;
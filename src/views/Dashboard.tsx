import axios from "axios";
import React, { useEffect, useState } from "react";
import LineChart from "../components/LineChart";
import ITemperatureReading from "../interfaces/ITemperatureReading";
import Header from './../components/Header';
import IMappedReading from "../interfaces/IMappedReading";
import IFormattedChartData from "../interfaces/IFormattedChartData";

const Dashboard = () => {
    const [temperatureData, setTemperatureData] = useState([]);
    let mappedReadings: IMappedReading[] = [];
    let formattedChartData: IFormattedChartData[] = [];

    useEffect(() => {
        getData();
    }, []);

    const getData = async () => {
        const url = "https://raspberry-pi-sensor-api.azurewebsites.net/temperature";
        try {
            const result = await axios.get(url);
            setTemperatureData(result.data);
        } catch (e) {
            console.log("error", e);
        }
    };

    const mapIndividualReadings = () => {
        if (temperatureData.length >= 1) {
            temperatureData.forEach((reading: ITemperatureReading) => {
                try {
                const mappedReading = {
                    x: new Date(reading.readingDate).toLocaleString(),
                    y: reading.temperatureC,
                };
                mappedReadings.push(mappedReading);
                } catch (e) {
                console.log("There was an error mapping your reading", e);
                }
            });
        }
    };

    const mapAllReadings = () => {
        let celciusReadings = {
            id: "TemperatureC",
            color: "hsl(99, 70%, 50%)",
            data: mappedReadings,
        };
        let fahrenheitReadings = {
            id: "TemperatureF",
            color: "hsl(345, 70%, 50%)",
            data: mappedReadings,
        };
        formattedChartData.push(celciusReadings, fahrenheitReadings);
    };

    // const data = [
    //     {
    //         id: "TemperatureC",
    //         color: "hsl(99, 70%, 50%)",
    //         data: [
    //         { x: "12/29/2021, 4:37:04 PM", y: 17 },
    //         { x: "12/29/2021, 4:40:51 PM", y: 25 },
    //         { x: "2/11/2022, 5:16:22 PM", y: 13 },
    //         { x: "2/18/2022, 3:46:31 PM", y: 21 },
    //         { x: "2/18/2022, 5:08:00 PM", y: 23 },
    //         ],
    //     },
    //     {
    //         id: "TemperatureF",
    //         color: "hsl(345, 70%, 50%)",
    //         data: [
    //         { x: "12/29/2021, 4:37:04 PM", y: 17 },
    //         { x: "12/29/2021, 4:40:51 PM", y: 25 },
    //         { x: "2/11/2022, 5:16:22 PM", y: 13 },
    //         { x: "2/18/2022, 3:46:31 PM", y: 21 },
    //         { x: "2/18/2022, 5:08:00 PM", y: 23 },
    //         ],
    //     },
    // ];

    if (temperatureData.length > 1) {
        mapIndividualReadings();
        mapAllReadings();
    } 
    
    return (
        <>
            <Header />
            {formattedChartData.length && (
                <div className="line-chart">
                    <LineChart data={formattedChartData}/>
                </div>
            )}
        </>
    );
}

export default Dashboard;
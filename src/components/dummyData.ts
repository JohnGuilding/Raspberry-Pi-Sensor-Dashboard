import ITemperatureReadings from "../models/ITemperatureReadings";

export const dummyData: ITemperatureReadings = {
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
import mongoose from "mongoose";

const Data = new mongoose.Schema({
    current: { type: Number },
    highestT: { type: Array },
    lowestT: { type: Array },
});

export default mongoose.model('Data', Data)


/* {
    "latitude": 52.52,
    "longitude": 13.419998,
    "generationtime_ms": 0.054001808166503906,
    "utc_offset_seconds": 0,
    "timezone": "GMT",
    "timezone_abbreviation": "GMT",
    "elevation": 38,
    "current_units": {
        "time": "iso8601",
        "interval": "seconds",
        "temperature_2m": "°C"
    },
    "current": {
        "time": "2024-04-10T11:45",
        "interval": 900,
        "temperature_2m": 14.2
    },
    "daily_units": {
        "time": "iso8601",
        "temperature_2m_max": "°C",
        "temperature_2m_min": "°C"
    },
    "daily": {
        "time": [
            "2024-04-10",
            "2024-04-11",
            "2024-04-12",
            "2024-04-13",
            "2024-04-14",
            "2024-04-15",
            "2024-04-16"
        ],
        "temperature_2m_max": [
            15.1,
            16.5,
            19.6,
            22.2,
            16.4,
            12.4,
            11
        ],
        "temperature_2m_min": [
            8.9,
            7.1,
            10.3,
            13.4,
            9.6,
            7.1,
            4.9
        ]
    }
} */
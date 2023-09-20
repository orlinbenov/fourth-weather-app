import './App.css';
import React, { useEffect, useState } from "react";
import { Dimmer, Loader } from 'semantic-ui-react';
import Weather from '../Weather/Weather';
import Forecast from '../Forecast/Forecast';
import cities from '../../store/city.list.json'
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

export default function App() {
    const [lat, setLat] = useState(null);
    const [long, setLong] = useState(null);
    const [weatherData, setWeatherData] = useState([]);
    const [forecast, setForecast] = useState([]);
    const [error, setError] = useState(null);

    const mappedCities = cities.map(city => {
        return {
            coord: {
                lon: city.coord.lon,
                lat: city.coord.lat
            },
            country: city.country,
            name: city.name
        }
    })

    useEffect(() => {
        navigator.geolocation.getCurrentPosition(function(position) {
            setLat(position.coords.latitude);
            setLong(position.coords.longitude);
        }, function(error) {
            // let's load Sofia initially and then the usr can select another city from the combo box
            setLat(42.69751);
            setLong(23.32415);
        });

        if (lat !== null && long !== null) {
            getCityWeatherData(lat, long)
        }
        // eslint-disable-next-line
    }, [lat,long,error])

    function getCityWeatherData(lat, long) {
        getWeather(lat, long)
            .then(weather => {
                setWeatherData(weather);
                setError(null);
            })
            .catch(err => {
                setError(err.message);
            });

        getForecast(lat, long)
            .then(data => {
                setForecast(data);
                setError(null);
            })
            .catch(err => {
                setError(err.message);
            });
    }

    function handleResponse(response) {
        if (response.ok) {
            return response.json();
        } else {
            throw new Error("Something went wrong!");
        }
    }

    function getWeather(lat, long) {
        return fetch(
            `${process.env.REACT_APP_API_URL}/weather/?lat=${lat}&lon=${long}&units=metric&APPID=${process.env.REACT_APP_API_KEY}`
        )
            .then(res => handleResponse(res))
            .then(weather => {
                if (Object.entries(weather).length) {
                    return weather;
                }
            });
    }

    function getForecast(lat, long) {
        return fetch(
            `${process.env.REACT_APP_API_URL}/forecast/?lat=${lat}&lon=${long}&units=metric&APPID=${process.env.REACT_APP_API_KEY}`
        )
            .then(res => handleResponse(res))
            .then(forecastData => {
                if (Object.entries(forecastData).length) {
                    return forecastData.list
                        .filter(forecast => forecast.dt_txt.match(/09:00:00/));
                }
            });
    }

    return (
        <div className="App">
            {(typeof weatherData.main != 'undefined') ? (
                <div>
                    <Autocomplete
                        disablePortal
                        id="city-select"
                        className="combo-select"
                        onChange={(event, newValue) => {
                            if (newValue) {
                                getCityWeatherData(newValue.coord.lat, newValue.coord.lon)
                            }
                        }}
                        options={mappedCities}
                        sx={{ width: 320 }}
                        getOptionLabel={(option) => `${option.name} | ${option.country}`}
                        renderInput={(params) => <TextField {...params} label="Search..." />}
                    />

                    <Weather weatherData={weatherData}/>
                    <Forecast forecast={forecast}/>
                </div>
            ): (
                <div>
                    <Dimmer active>
                        <Loader>Loading..</Loader>
                    </Dimmer>
                </div>
            )}
        </div>
    );
}

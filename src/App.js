import './App.css';
import React, { useEffect, useState } from "react";
import { Dimmer, Loader } from 'semantic-ui-react';
import Weather from './components/Weather/Weather';
import Forecast from './components/Forecast/Forecast';
import TextField from '@mui/material/TextField';

export default function App() {
    const [weatherData, setWeatherData] = useState([]);
    const [forecast, setForecast] = useState([]);
    const [error, setError] = useState(null);

    const loadForecast = () => {
        navigator.geolocation.getCurrentPosition(function(position) {
            getCityWeatherData(position.coords.latitude, position.coords.longitude)
        }, function(error) {
            getCityWeatherData(42.69751, 23.32415)
        });
    }

    useEffect(() => {
        loadForecast();
    }, [])

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


    const debounce = (func, delay) => {
        let timeoutId;

        return (...args) => {
            clearTimeout(timeoutId);

            timeoutId = setTimeout(() => {
                func.apply(this, args);
            }, delay);
        };
    };

    const getCitySearch = (q) => {
        return fetch(
            `${process.env.REACT_APP_API_URL}/forecast?q=${q.target.value}&units=metric&appid=${process.env.REACT_APP_API_KEY}`
        )
            .then(res => handleResponse(res))
            .then(results => {
                if (Object.entries(results).length) {
                    setWeatherData(results.list[0])
                    setForecast(results.list.filter(forecast => forecast.dt_txt.match(/09:00:00/)));
                }
            })
            .catch(err => {
                console.warn(err)
            })
    };

    const debouncedSearch = debounce(getCitySearch, 500);

    function getWeather(lat, long) {
        return fetch(
            `${process.env.REACT_APP_API_URL}/weather/?lat=${lat}&lon=${long}&units=metric&appid=${process.env.REACT_APP_API_KEY}`
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
            `${process.env.REACT_APP_API_URL}/forecast/?lat=${lat}&lon=${long}&units=metric&appid=${process.env.REACT_APP_API_KEY}`
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
                    <TextField onChange={(e) => { debouncedSearch(e) }} />

                    <Weather weatherData={weatherData}/>
                    <Forecast forecast={forecast}/>
                </div>
            ): (
                <div>
                    <Dimmer active>
                        {error ? <div>{error}</div> : <Loader>Loading..</Loader>}
                    </Dimmer>
                </div>
            )}
        </div>
    );
}

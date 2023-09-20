import React from "react";
import moment from 'moment';
import './Forecast.css';
import {
    faCloud,
    faBolt,
    faCloudRain,
    faCloudShowersHeavy,
    faSnowflake,
    faSun,
    faSmog,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const styles = {
    boldFont: {
        fontWeight: 'bold'
    },
    rowStyle: {
        padding: 8,
        display: 'flex',
        justifyContent: 'space-between',
        color: 'whitesmoke'
    },
    listWrapper: {
        paddingBottom: 32
    }
}

export default function Forecast(props) {
    const { forecast } = props;

    const fiveDaysForecast = forecast.map((item, index) => {
        let weatherIcon;

        switch(item.weather[0].main) {
            case 'Thunderstorm':
                weatherIcon = <FontAwesomeIcon icon={faBolt} />;
                break;
            case 'Drizzle':
                weatherIcon = <FontAwesomeIcon icon={faCloudRain} />;
                break;
            case 'Rain':
                weatherIcon = <FontAwesomeIcon icon={faCloudShowersHeavy} />;
                break;
            case 'Snow':
                weatherIcon = <FontAwesomeIcon icon={faSnowflake} />;
                break;
            case 'Clear':
                weatherIcon = <FontAwesomeIcon icon={faSun} />;
                break;
            case 'Clouds':
                weatherIcon = <FontAwesomeIcon icon={faCloud} />;
                break;
            default:
                weatherIcon = <FontAwesomeIcon icon={faSmog} />;
        }

        return (
            <div key={index} className={`back-standard back-${item.weather[0].main.toLowerCase()}`}>
                <div className="overlay"></div>
                <div className="forecast-wrapper">
                    <div className="forecast">
                        <div className="flex-forecast">
                            <div className="week-day">{moment(item.dt_txt).format("dddd")}</div>

                            {weatherIcon}

                            <div>{Math.round(item.main.temp)} &deg;C</div>
                        </div>
                    </div>
                    <div style={styles.rowStyle}><div style={styles.boldFont}>Description:</div> {item.weather[0].main}</div>
                    <div style={styles.rowStyle}><div style={styles.boldFont}>Humidity:</div> {item.main.humidity} %</div>
                    <div style={styles.rowStyle}><div style={styles.boldFont}>Day:</div> {moment(item.dt*1000).format('dddd')}</div>
                    <div style={styles.rowStyle}><div style={styles.boldFont}>Date:</div> {moment(item.dt*1000).format('LL')}</div>
                </div>
            </div>
        )
    })

    return(
        <div style={styles.listWrapper}>
            {fiveDaysForecast}
        </div>
    );
}

import React from 'react';
import { Card } from 'semantic-ui-react';
import moment from 'moment';

const styles = {
    boldFont: {
        fontWeight: 'bold'
    },
    rowStyle: {
        padding: 8,
        display: 'flex',
        justifyContent: 'space-between'
    }
}

const WeatherCard = ({weatherData}) => (
    <Card className="weather-card">
        <Card.Content>
            <Card.Header>City Name: {weatherData.name}</Card.Header>
            <div style={styles.rowStyle}><div style={styles.boldFont}>Temprature:</div> {weatherData.main.temp} &deg;C</div>
            <div style={styles.rowStyle}><div style={styles.boldFont}>Sunrise:</div> {new Date(weatherData.sys.sunrise * 1000).toLocaleTimeString('en-IN')}</div>
            <div style={styles.rowStyle}><div style={styles.boldFont}>Sunset:</div> {new Date(weatherData.sys.sunset * 1000).toLocaleTimeString('en-IN')}</div>
            <div style={styles.rowStyle}><div style={styles.boldFont}>Description:</div> {weatherData.weather[0].main}</div>
            <div style={styles.rowStyle}><div style={styles.boldFont}>Humidity:</div> {weatherData.main.humidity} %</div>
            <div style={styles.rowStyle}><div style={styles.boldFont}>Day:</div> {moment().format('dddd')}</div>
            <div style={styles.rowStyle}><div style={styles.boldFont}>Date:</div> {moment().format('LL')}</div>
        </Card.Content>
    </Card>
)

export default WeatherCard;

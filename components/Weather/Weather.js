import { StyleSheet, Text, View } from 'react-native';
import moment from 'moment';

const WeatherCard = ({weatherData}) => (
    <View style={styles.card}>
        <View style={styles.headerStyle}><Text style={styles.headerTextStyle}>City Name: {weatherData.name}</Text></View>
        <View style={styles.rowStyle}><Text style={styles.boldFont}>Temprature:</Text><Text>{weatherData.main.temp} °C</Text></View>
        <View style={styles.rowStyle}><Text style={styles.boldFont}>Sunrise:</Text><Text>{new Date(weatherData.sys.sunrise * 1000).toLocaleTimeString('en-IN')}</Text></View>
        <View style={styles.rowStyle}><Text style={styles.boldFont}>Sunset:</Text><Text>{new Date(weatherData.sys.sunset * 1000).toLocaleTimeString('en-IN')}</Text></View>
        <View style={styles.rowStyle}><Text style={styles.boldFont}>Description:</Text><Text>{weatherData.weather[0].main}</Text></View>
        <View style={styles.rowStyle}><Text style={styles.boldFont}>Humidity:</Text><Text>{weatherData.main.humidity} %</Text></View>
        <View style={styles.rowStyle}><Text style={styles.boldFont}>Day:</Text><Text>{moment().format('dddd')}</Text></View>
        <View style={styles.rowStyle}><Text style={styles.boldFont}>Date:</Text><Text>{moment().format('LL')}</Text></View>
    </View>
)

const styles = StyleSheet.create({
    card: {
        display: 'flex',
        width: '100%',
        borderWidth: 1,
        borderColor: '#d4d4d5',
        borderRadius: 16,
        marginBottom: 32
    },
    headerStyle: {
        backgroundColor: '#01579b',
        padding: 16,
        alignItems: 'center',
        borderTopLeftRadius: 16,
        borderTopRightRadius: 16,
    },
    headerTextStyle: {
        fontSize: 18,
        color: 'whitesmoke'
    },
    boldFont: {
        fontWeight: 'bold'
    },
    rowStyle: {
        padding: 8,
        display: 'flex',
        justifyContent: 'space-between',
        flexDirection: 'row'
    }
})

export default WeatherCard;
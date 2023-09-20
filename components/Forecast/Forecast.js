import { StyleSheet, Text, View, Image } from 'react-native';
import moment from 'moment';

const styles = StyleSheet.create({
    boldFont: {
        fontWeight: 'bold'
    },
    whiteColor: {
        color: 'whitesmoke'
    },
    rowStyle: {
        padding: 8,
        display: 'flex',
        justifyContent: 'space-between',
        color: 'whitesmoke',
        flexDirection: 'row'
    },
    listWrapper: {
        paddingBottom: 32
    },
    wrapper: {
        borderRadius: 16,
        overflow: 'hidden',
        marginBottom: 16
    },
    header: {
        backgroundColor: '#01579b',
        padding: 10,
        marginBottom: 10,
        justifyContent: 'space-between',
        flexDirection: 'row',
        borderTopLeftRadius: 16,
        borderTopRightRadius: 16
    },
    headerFontStyle: {
        color: 'whitesmoke',
        fontSize: 18
    },
    overlay: {
        backgroundColor: 'rgba(0,0,0,0.7)',
        width: '100%',
        height: '100%',
        top: 0,
        left: 0,
        position: 'absolute',
        zIndex: 4
    },
    mainBody: {
        zIndex: 5,
        position: 'relative',
        paddingBottom: 5
    },
    img: {
        position: 'absolute',
        width: '100%',
        height: '100%',
        top: 0,
        left: 0,
        borderTopLeftRadius: 16,
        borderTopRightRadius: 16,
        zIndex: 3
    }
})

export default function Forecast(props) {
    const fiveDaysForecast = props.forecast.map((item, index) => {
        let imgBack = null;

        if (item.weather[0].main === 'Thunderstorm') {
            imgBack = <Image style={styles.img} source={require('../../assets/storm.png')} />
        } else if (item.weather[0].main === 'Drizzle' || item.weather[0].main === 'Rain') {
            imgBack = <Image style={styles.img} source={require('../../assets/rain.png')} />
        } else if (item.weather[0].main === 'Snow') {
            imgBack = <Image style={styles.img} source={require('../../assets/snow.png')} />
        } else if (item.weather[0].main === 'Clear') {
            imgBack = <Image style={styles.img} source={require('../../assets/sun.png')} />
        } else if (item.weather[0].main === 'Clouds') {
            imgBack = <Image style={styles.img} source={require('../../assets/clouds.png')} />
        } else {
            imgBack = <Image style={styles.img} source={require('../../assets/fog.png')} />
        }

        return (
            <View key={index} style={styles.wrapper}>
                {imgBack}
                <View style={styles.overlay}></View>
                <View style={styles.mainBody}>
                    <View style={styles.header}>
                        <Text style={styles.headerFontStyle}>{moment(item.dt_txt).format("dddd")}</Text><Text style={styles.headerFontStyle}>{Math.round(item.main.temp)} &deg;C</Text>
                    </View>
                    <View style={styles.rowStyle}><Text style={[styles.boldFont, styles.whiteColor]}>Description:</Text><Text style={styles.whiteColor}>{item.weather[0].main}</Text></View>
                    <View style={styles.rowStyle}><Text style={[styles.boldFont, styles.whiteColor]}>Humidity:</Text><Text style={styles.whiteColor}>{item.main.humidity} %</Text></View>
                    <View style={styles.rowStyle}><Text style={[styles.boldFont, styles.whiteColor]}>Day:</Text><Text style={styles.whiteColor}>{moment(item.dt*1000).format('dddd')}</Text></View>
                    <View style={styles.rowStyle}><Text style={[styles.boldFont, styles.whiteColor]}>Date:</Text><Text style={styles.whiteColor}>{moment(item.dt*1000).format('LL')}</Text></View>
                </View>
            </View>
        )
    })

    return(
        <View style={styles.listWrapper}>
            {fiveDaysForecast}
        </View>
    );
}

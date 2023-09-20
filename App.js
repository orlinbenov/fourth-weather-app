import React, { useEffect, useState } from 'react';
import { StyleSheet, View, ActivityIndicator, ScrollView, Alert, RefreshControl } from 'react-native';
import * as Location from 'expo-location';
import { StatusBar } from 'expo-status-bar';
import Weather from './components/Weather/Weather';
import Forecast from './components/Forecast/Forecast';
import Header from "./components/Header/Header";
import cities from './store/city.list.json';
import {
  SafeAreaView,
  SafeAreaProvider,
} from 'react-native-safe-area-context';

export default function App() {
    const [weatherData, setWeatherData] = useState(null);
    const [forecastData, setForecastData] = useState(null);
    const [refreshing, setRefreshing] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);

    const mappedCities = cities.map(city => {
        return {
            coord: {
                lon: city.coord.lon,
                lat: city.coord.lat
            },
            id: city.id,
            title: `${city.name} (${city.country})`
        }
    });

    const loadForecast = async () => {
        setRefreshing(true);

        const { status } = await Location.requestForegroundPermissionsAsync();

        if (status !== 'granted') {
            Alert.alert('Permission to access location was denied');
        }

        let location = await Location.getCurrentPositionAsync({enableHighAccuracy: true});

        loadWeather(location.coords.latitude, location.coords.longitude);
        getForecast(location.coords.latitude, location.coords.longitude);

        setRefreshing(false);
    }

    async function loadWeather(lat, lon) {
        const response = await fetch( `https://api.openweathermap.org/data/2.5/weather/?APPID=96ccc852f62e2218af4c7876c66fa808&units=metric&lat=${lat}&lon=${lon}`);
        const data = await response.json();

        if(!response.ok) {
            Alert.alert(`Error retrieving weather data: ${data.message}`); 
        } else {
            setWeatherData(data);
        }
    }

    async function getForecast(lat, lon) {
        const response = await fetch( `https://api.openweathermap.org/data/2.5/forecast/?APPID=96ccc852f62e2218af4c7876c66fa808&units=metric&lat=${lat}&lon=${lon}`);

        const data = await response.json();

        if(!response.ok) {
            Alert.alert(`Error retrieving weather data: ${data.message}`); 
        } else {
            if (Object.entries(data).length) {
                const filtered = data.list.filter(item => {
                    return (item.dt_txt.indexOf('09:00:00') > -1);
                  });

                setForecastData(filtered);
            }
        }
    }

    useEffect(() => {
        loadForecast();
    }, [])

    if (!weatherData && !forecastData) {
        return <SafeAreaView style={styles.loading}>
        <ActivityIndicator size="large" />
        </SafeAreaView>;
    }

    return (
        <SafeAreaProvider>
            <SafeAreaView style={styles.container}>
                <StatusBar style='auto' />
                <Header />

                <ScrollView
                style={{ flex: 1 }}
                 nestedScrollEnabled
                 keyboardDismissMode="on-drag"
                 keyboardShouldPersistTaps="handled"
                 contentInsetAdjustmentBehavior="automatic"
                    refreshControl={
                        <RefreshControl 
                        onRefresh={loadForecast} 
                        refreshing={refreshing}
                        />}
                >

                    <Weather weatherData={weatherData} />
                    {forecastData && forecastData.length ? <Forecast forecast={forecastData} /> : null}
                </ScrollView>
            </SafeAreaView>
        </SafeAreaProvider>
    );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#FFFBF6',
      paddingLeft: 16,
      paddingRight: 16
      
    },
    loading: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    }
});
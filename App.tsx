import React, {useState} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import GetLocation from 'react-native-get-location';
import MapLibreGL, {Logger} from '@maplibre/maplibre-react-native';
import Geolocation from '@react-native-community/geolocation';

// Will be null for most users (only Mapbox authenticates this way).
// Required on Android. See Android installation notes.

MapLibreGL.setAccessToken(null);
const MAPTILER_API_KEY = 'f7o9viz24aowHK4B26RH';

// edit logging messages
Logger.setLogCallback(log => {
  const {message} = log;
  if (
    message.match('Request failed due to a permanent error: Canceled') ||
    message.match('Request failed due to a permanent error: Socket Closed')
  ) {
    return true;
  }
  return false;
});

function App() {
  const [mapLocation, setMapLocation] = useState({
    lat: 0,
    long: 0,
  });

  GetLocation.getCurrentPosition({
    enableHighAccuracy: true,
    timeout: 60000,
  })
    .then(location => {
      setMapLocation({
        ...mapLocation,
        lat: location.latitude,
        long: location.longitude,
      });
      // console.log(location.latitude);
      // latitude = location.latitude;
      // longitude = location.longitude
    })
    .catch(error => {
      const {code, message} = error;
      console.warn(code, message);
    });

  return (
    <View style={styles.page}>
      <MapLibreGL.MapView
        style={styles.map}
        logoEnabled={false}
        styleURL={`https://api.maptiler.com/maps/bright/style.json?key=${MAPTILER_API_KEY}`}
        onPress={feature =>
          console.log('Coords:', feature.geometry.coordinates)
        }>
        <MapLibreGL.Camera
          zoomLevel={15}
          centerCoordinate={[mapLocation.long, mapLocation.lat]}
          pitch={10}
        />
        <MapLibreGL.UserLocation visible={true} />
        {/* <MapLibreGL.PointAnnotation
          coordinate={[longitude, latitude]}
          id="mark"
          title="this is a point annotation"
          draggable={true}>
          <Icon size={14} reverse type="ionicon" name="home-outline" />
        </MapLibreGL.PointAnnotation> */}
      </MapLibreGL.MapView>
    </View>
  );
}

export default App;
const styles = StyleSheet.create({
  page: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  map: {
    flex: 1,
    alignSelf: 'stretch',
  },
  touchableContainer: {borderColor: 'black', borderWidth: 1.0, width: 60},
  touchable: {
    backgroundColor: 'blue',
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  touchableText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

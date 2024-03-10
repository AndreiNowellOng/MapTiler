import React, {Component} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import MapLibreGL, {
  Light,
  MapView,
  MarkerView,
} from '@maplibre/maplibre-react-native';

// Will be null for most users (only Mapbox authenticates this way).
// Required on Android. See Android installation notes.
MapLibreGL.setAccessToken(null);
const MAPTILER_API_KEY = 'f7o9viz24aowHK4B26RH';


export default function App() {
  return (
    <View style={styles.page}>
      <MapLibreGL.MapView
        style={styles.map}
        logoEnabled={false}
        styleURL={`https://api.maptiler.com/maps/streets-v2/style.json?key=${MAPTILER_API_KEY}`}
        styleJSON={`https://api.maptiler.com/maps/streets-v2/256/tiles.json?key=${MAPTILER_API_KEY}`}>
          
        <MapLibreGL.Camera
          zoomLevel={15}
          centerCoordinate={[121.06827, 14.66433]}
          pitch={10}
        />
        <MapLibreGL.PointAnnotation 
          coordinate={[121.06827, 14.66433]}
          id="mark"
          title='this is a point annotation'
          draggable={true}
          ></MapLibreGL.PointAnnotation>
      </MapLibreGL.MapView>
    </View>
  );
}


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
});X
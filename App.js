import React from 'react';
import { StyleSheet, View, Alert } from 'react-native';
import FetchLocation from './components/FetchLocation';
import MapView from 'react-native-maps';

export default class App extends React.Component {
 constructor(props){
   super(props)
   this.state = {
     location: null, 
     lat: null, 
     long: null, 
     showAlert: false, 
     showMap: false
    }
 }
  getLo = () => {
    navigator.geolocation.getCurrentPosition((data) => this.displayLocation(data.coords.latitude, data.coords.longitude, false))
  }

  displayLocation = (lat, long, show_alert) => {
  
   const link = "https://maps.googleapis.com/maps/api/geocode/json?latlng=" + lat + "," +long + "&key=" + process.env.apiKey

    fetch(link)
      .then(response => response.json())
      .then(responseJSON => this.setState({
        location: responseJSON.results[0].formatted_address, 
        showAlert: show_alert, 
        showMap: true, 
        lat: lat, 
        long: long
       })
     );  
    };  

  render() {
    if(!this.state.showMap){
      return (
        <View style={styles.container}>
          <FetchLocation onGetLocation={this.getLo} />
        </View>
       )
    }
    if(this.state.showAlert){
      Alert.alert("You have clicked on " + this.state.location)
    }
    return (
        <MapView
        style={{flex: 1}}
        region={{
          latitude: this.state.lat,
          longitude: this.state.long,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421
        }}
        showsUserLocation={true}
        mapType="mutedStandard"
        onPress={(d) => {
       this.displayLocation(d.nativeEvent.coordinate.latitude, d.nativeEvent.coordinate.longitude, true)
        }}
      />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

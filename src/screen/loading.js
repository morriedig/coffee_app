import React from 'react';
import {View, Text} from 'react-native';
import MapView, { Marker } from 'react-native-maps';


export default class loading extends React.Component{
  constructor(props){
    super(props);
    this.state = {region: { latitude: 25.105497, longitude: 121.597366,latitudeDelta: 0.0922,
      longitudeDelta: 0.0421 }, markers: [ { latlng: { latitude: 25.105497, longitude: 121.597366 }, title: "it's marker"  },
      { latlng: { latitude: 25.117497, longitude: 121.597366 }, title: "it's marker"  }

      ] };
  }

  componentDidMount(){
    this.getCoffeeDate();
    this.getUserLoaction();
  }

  getUserLoaction(){
    console.log("------");
    try {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          console.log("success", position);
          const region = {
            latitude: 25.045942364156254,
            longitude: 121.5150063484887,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421
          };
          this.setState({region: region});
        },
        (error) => {
          //TODO: better design
          switch (error.code) {
            case 1:
              if (Platform.OS === "ios") {
                Alert.alert("", "Para ubicar tu locación habilita permiso para la aplicación en Ajustes - Privacidad - Localización");
              } else {
                Alert.alert("", "Para ubicar tu locación habilita permiso para la aplicación en Ajustes - Apps - ExampleApp - Localización");
              }
              break;
            default:
              Alert.alert("", "Error al detectar tu locación");
          }
        }
      );
    } catch(e) {
      alert(e.message || "");
    }
    console.log("position", this.state.region);
    console.log("-----------------------")
  }

  getCoffeeDate(){
    fetch("http://localhost:3000/api/v1/coffees")
      .then( function(response){
        console.log(response);
        response.json();
      })
      .then(function(data){
        console.log(data);
      })
  }

  render(){
    return(
      <View>
        <Text>loading！！！！！</Text>
        <MapView style={{ height: 500, width: 500}}
            region={this.state.region}
            // onRegionChange={this.onRegionChange}
          >
            {this.state.markers.map(marker => (
              <Marker
                coordinate={marker.latlng}
                title={marker.title}
                // description={marker.description}
              />
            ))}
          </MapView>
       <Text>loading！！！！！</Text>
      </View>
    )
  }

}
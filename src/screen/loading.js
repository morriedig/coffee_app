import React from 'react';
import {View, Text} from 'react-native';
import MapView, { Marker } from 'react-native-maps';


export default class loading extends React.Component{
  constructor(props){
    super(props);
    this.state = {region: { latitude: 25.105497, longitude: 121.597366,latitudeDelta: 0.0421 ,
      longitudeDelta: 0.0421 }, markers: [ { latlng: { latitude: 25.105497, longitude: 121.597366 }, title: "it's marker"  },
      { latlng: { latitude: 25.117497, longitude: 121.597366 }, title: "it's marker"  }

      ] };
  }

  componentDidMount(){
    this.getUserLoaction();
    // this.getCoffeeDate();
    this.sendPosition();
  }

  getUserLoaction(){
    try {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          // alert(position.coords.latitude);
          // alert(position.coords.longitude);
          console.log("success", position);
          const region = {
            latitude: 25.105497,
            longitude: 121.597366,
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
  }

  getCoffeeDate(){
    fetch("http://localhost:3000/api/v1/coffees")
      .then(function(response){
        return response.json();        
      })
      .then(function(data){
        console.log(data);
        alert(data.data[0].latitude);
        alert(data.data[0].longitude)
      })
  }

  sendPosition(){
    postData('http://localhost:3000/api/v1/coffees', {position: this.state.region})
      .then(function(data){
        return data
        // this.setMarkers(data.data)
        // alert(this.state.markers[0].latitude)
      }) // JSON from `response.json()` call
      .then((data)=> { // 這邊必須讓 function 指向全域
        markers = []
        data.data.forEach(function(coffee){
          var tem_coffee = { latlng: { latitude: coffee.latitude, longitude: coffee.longitude }, title: coffee.name }
          markers.push(tem_coffee)
        })
        this.setState({markers: markers});
      })
      .catch(error => console.error(error))

    function postData(url, data) {
      // Default options are marked with *
      return fetch(url, {
        body: JSON.stringify(data), // must match 'Content-Type' header
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        credentials: 'same-origin', // include, same-origin, *omit
        headers: {
          'user-agent': 'Mozilla/4.0 MDN Example',
          'content-type': 'application/json'
        },
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        mode: 'cors', // no-cors, cors, *same-origin
        redirect: 'follow', // manual, *follow, error
        referrer: 'no-referrer', // *client, no-referrer
      })
      .then(response => response.json()) // 輸出成 json
    }
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
                // onPress = { navigator}
              />
            ))}
        </MapView>
        <Text>loading！！！！！</Text>
      </View>
    )
  }

}
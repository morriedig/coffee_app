import React from 'react';
import {View, Text} from 'react-native';



export default class loading extends React.Component{
  constructor(props){
    super(props);
  }

  componentDidMount(){
    this.getCoffeeDate();
  }

  getCoffeeDate(){
    fetch("https://www.findcoffeeshop.online/").then( function(response){console.log(response); response.json();})
    .then(function(data){
      // console.log(data);
    })
  }

  render(){
    return(
      <View>
        <Text>loading</Text>
      </View>
    )
  }

}
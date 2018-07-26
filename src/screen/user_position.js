import React from 'react';



export default class loading extends React.Component{
  constructor(props){
    super(props);
  }

  componentDidMount(){
    this.getCoffeeDate();
  }

  getCoffeeDate(){
    fetch("http://localhost:3000/").then(function(response){
      return response.json();
    }).then(function(data){
      console.log(data);
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
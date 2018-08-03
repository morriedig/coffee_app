import React from 'react';



export default class loading extends React.Component{
  constructor(props){
    super(props);
  }

  componentDidMount(){
    this.getCoffeeDate();
  }

  getCoffeeDate(){
    fetch("http://localhost:3000/api/v1/coffees").then(function(response){
      console.log("+++++++++++++++++=");
      return response.json();
    }).then(function(data){
      console.log(data);
      console.log("++++++++++-----------------+++++++=");
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
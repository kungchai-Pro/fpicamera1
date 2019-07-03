import React, { Component } from 'react';
import { AppRegistry, StyleSheet, Text,
     TouchableOpacity, View, Image, Alert,TextInput} from 'react-native';

const INITIAL_STATE = {
    list: []
  };

export default class TestArray extends React.Component{

    constructor(props) {
        super(props);
    
        this.state ={
            value: '',
            list: [1, 2, 3],
           INITIAL_STATE
        } 
      }

      onClearArray=()=>{
        this.setState({ list: [] });
      };
    
      onResetArray=()=>{
        this.setState({ ...INITIAL_STATE });
      };

      onAddArray=()=>{
        const list = this.state.list.push(this.state.value);
      };
      
      onChangeValue = (text) => {
        this.setState({ value:text });
      };

       getCurrentTime() {
        // Get the current 'global' time from an API
        
          // randomly decide if the date is retrieved or not
        

      }

    Datatest=()=>{ 

      return fetch('https://facebook.github.io/react-native/')
      .then((response) => response.json())
      .then((responseJson) => {
          // if(Math.random() >= 0.5) resolve('BabelCoder!')
          // else reject(new Error('Less than 0.5!'))
        return responseJson.movies;
      })
      .catch((error) => {
        console.error(error);
      });

      }
      
    
  

render(){
  var date = new Date().getDate(); //Current Date
  var month = new Date().getMonth() + 1; //Current Month
  var year = new Date().getFullYear(); //Current Year
  var hours = new Date().getHours(); //Current Hours
  var min = new Date().getMinutes(); //Current Minutes
  var sec = new Date().getSeconds(); //Current Seconds
   const imagetime=date+''+month+''+year+'_'+hours+''+min+''+sec;
    return(
        <View>
        {
            this.state.list.map(item => (
            <Text key={item}>{item}</Text>
          ))
        }

        <View>
          <Text>{imagetime}</Text>
          </View>
        <TextInput
        onChangeText={this.onChangeValue}
        value={this.state.value}
        />

    <TouchableOpacity onPress={this.onClearArray}>
         <Text> Clear Array </Text>
        </TouchableOpacity>

        <TouchableOpacity  onPress={this.onResetArray}>
          <Text>Reset Array</Text>
        </TouchableOpacity>

        <TouchableOpacity  onPress={this.onAddArray}>
          <Text>Add Array</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={this.Datatest}>
          <Text>ทดสอบ</Text>
          </TouchableOpacity>

    </View>
    )
}

}
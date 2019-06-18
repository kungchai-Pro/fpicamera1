import React, { Component } from 'react';
import { AppRegistry, StyleSheet, Text,
     TouchableOpacity, View, Image, Alert,TextInput} from 'react-native';

const INITIAL_STATE = {
    list: [1, 2, 3],
  };

export default class TestArray extends React.Component{

    constructor(props) {
        super(props);
    
        this.state ={
            value: '',
            list: ['a', 'b', 'c'],
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

render(){
    return(
        <View>
        {
            this.state.list.map(item => (
            <Text key={item}>{item}</Text>
          ))
        }
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

    </View>
    )
}

}
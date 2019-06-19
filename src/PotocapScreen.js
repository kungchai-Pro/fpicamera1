import React, { Component } from 'react';
import { AppRegistry, StyleSheet, Text, TouchableOpacity, View, Image, Alert, AsyncStorage } from 'react-native';
import { classBody } from '@babel/types';
import { TextInput } from 'react-native-gesture-handler';

export default class PotocapScreen extends React.Component {
    static navigationOptions = {
        header: null,
    };
    constructor(props) {
        super(props)
        this.state = {
            dataContainer: null,
            dataSeal: null,
            databookin: null
        }
    }
    componentDidMount() { 
        // for get  AsyncStorage
        AsyncStorage.multiGet(['Container', 'seal', 'booking'], (err, stores) => {
            stores.map((result, i, store) => {
                let dataContainer = store[0][1];
                let dataSeal = store[1][1];
                let databookin = store[2][1];
                console.log(dataContainer, dataSeal, databookin)
            })

        })

        AsyncStorage.multiGet(['dataimage'], (err, stores) => {
            stores.map((result, i, store) => {
                let dataTypeimage = store[i][1];    
                console.log(dataTypeimage,i)
            })

        })  

    }
    functioncapPoto(data){
        const { navigate } = this.props.navigation;
            navigate('Cameras',{dataType:data});
    }
    //for delet AsyncStorage
    removedata(Type) {
        AsyncStorage.multiRemove(['Container', 'seal', 'booking'], (err) => {
            console.log('Local storage user info removed!');
        });

        AsyncStorage.multiRemove(['dataimage'], (err) => {
            console.log('Local storage user info removed!');
        });

        // const { navigate } = this.props.navigation;
        // navigate('Potocap',{dataType:Type})

    }

    render() {
        return (
            <View style={{ flex: 1 }}>
                <View style={{ flex: 1, backgroundColor: '#009688' }}>

                    <TouchableOpacity style={{ flex: 1, backgroundColor: '#26a69a' }}
                        onPress={() =>this.functioncapPoto("1")}>
                        <Text>ถ่ายด้านหน้า</Text>
                    </TouchableOpacity>
                </View>
                <View style={{ flex: 1 }}>
                    <TouchableOpacity style={{ flex: 1, backgroundColor: '#4db6ac' }}
                        onPress={() => this.functioncapPoto("2")}>
                        <Text>ถ่ายด้านหลัง</Text>
                    </TouchableOpacity>
                </View>
                <View style={{ flex: 1, backgroundColor: '#80cbc4' }}>
                <TouchableOpacity style={{ flex: 1, backgroundColor: '#4db6ac' }}
                        onPress={() => this.functioncapPoto("3")}>
                          <Text>ถ่ายด้านขวา</Text>
                    </TouchableOpacity>
                </View>
                <View style={{ flex: 1, backgroundColor: '#b2dfdb' }}>
                <TouchableOpacity style={{ flex: 1, backgroundColor: '#4db6ac' }}
                        onPress={() => this.functioncapPoto("4")}>
                          <Text>ถ่ายด้านซ้าย</Text>
                    </TouchableOpacity>
                </View>
                <View style={{ flex: 1, backgroundColor: '#e0f2f1' }}>
                <TouchableOpacity style={{ flex: 1 }}
                onPress={()=>this.removedata(1)}
                >
                    <Text>
                        บันทึก
                        </Text>
                        </TouchableOpacity>
                </View>
            </View>
        );
    }
}
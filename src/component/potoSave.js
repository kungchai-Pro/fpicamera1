
import React, { Component } from 'react';
import { AppRegistry, StyleSheet, Text, TouchableOpacity, View, Image, Alert,AsyncStorage } from 'react-native';
import {
    Container, Header, Title, Content, Button, Icon, Card, CardItem, Item, Label, Input, ListItem,
    Body, Left, Right, IconNB, Form, Spinner, Thumbnail
} from "native-base";

class potoSave extends React.Component {
    static navigationOptions = {
        header: null,
    };
    constructor(prop) {
        super(prop)
        this.state = {
            Imagedata: '',
            datasand: "Loading . . .",
            loading: false,
        }
    }
        functionSetdataImage(){
            const data_params = this.props.navigation.state.params;
            // alert(data_params.typeimage+'-'+data_params.ImagePoto)
            let datalist={
                typeimage:data_params.typeimage,
                ImagePoto:data_params.ImagePoto
            }

            let multi_set_Potosave = [
                ['dataimage', JSON.stringify(datalist)],
              ];
            
              AsyncStorage.multiSet(multi_set_Potosave, (err) => {
                AsyncStorage.multiGet(['dataimage'], (err, stores) => {
                    stores.map((result, i, store) => {
                      let key = store[i][0];
                      console.log(key,i);
                    });
                  });
            })

            const { navigate } = this.props.navigation;
            navigate('Potocap');
      
    }

    render() {
        var data_params = this.props.navigation.state.params;
        const { goBack } = this.props.navigation;
        return (
            <Container>
                <View style={{height:50,width:null,justifyContent:'center'}}>
                    <Text>ภาพ {data_params.typeimage}</Text>
                    </View>
                <View style={{ flex: 1 ,marginTop:2}}>
                    <Image source={{ uri: data_params.ImagePoto }} style={{ height: 200, width: null, flex: 1 }} />
                    <View style={{flexDirection: 'row',alignItems:'center',width:null,height:50,justifyContent: 'center',margin:2}}>
                    <Button light style={{margin:5}} onPress={()=>this.functionSetdataImage()}><Text> บันทึก </Text></Button>
                    <Button light style={{margin:5}} onPress={()=>goBack(null)}><Text> ยกเลิก </Text></Button>
                    </View>
                </View>
            </Container>
        );
    }
}
export default potoSave
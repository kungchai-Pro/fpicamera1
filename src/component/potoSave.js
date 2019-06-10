
import React, { Component } from 'react';
import { AppRegistry, StyleSheet, Text, TouchableOpacity, View, Image, Alert } from 'react-native';
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

    render() {
        var data_params = this.props.navigation.state.params;
        return (
            <Container>
                <View style={{height:50,width:null,justifyContent:'center'}}>
                    <Text>ภาพ {data_params.typeimage}</Text>
                    </View>
                <View style={{ flex: 1 ,marginTop:2}}>
                    {/* <Text> {data_params.ImagePoto}</Text> */}
                    {/* <Image source={{ uri:data_params.ImagePoto}}/> */}
                    <Image source={{ uri: data_params.ImagePoto }} style={{ height: 200, width: null, flex: 1 }} />
                    <View style={{flexDirection: 'row',alignItems:'center',width:null,height:50,justifyContent: 'center',margin:2}}>
                    <Button light style={{margin:5}}><Text> บันทึก </Text></Button>
                    <Button light style={{margin:5}}><Text> ยกเลิก </Text></Button>
                    </View>
                </View>
            </Container>
        );
    }
}
export default potoSave
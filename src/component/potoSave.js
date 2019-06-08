
import React, { Component } from 'react';
import { AppRegistry, StyleSheet, Text, TouchableOpacity, View, Image, Alert } from 'react-native';
import {
    Container, Header, Title, Content, Button, Icon, Card, CardItem, Item, Label, Input, ListItem,
    Body, Left, Right, IconNB, Form, Spinner, Thumbnail
} from "native-base";

class potoSave extends React.Component {
    render() {
        var data_params = this.props.navigation.state.params;
        return (
            <Container>
             <View style={{flex:1}}>
                    <Text> {data_params.ImagePoto}</Text>
                    {/* <Image source={{ uri:data_params.ImagePoto}}/> */}
                    <Image source={{ uri: data_params.ImagePoto }} style={{ height: 200, width: null, flex: 1 }} />
                    <Text>บันทึก</Text>
                    <Text>ยังเลิก</Text>
                </View>
            </Container>
        );
    }
}
export default potoSave
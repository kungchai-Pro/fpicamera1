import React, { Component } from 'react';
import {
    AppRegistry, StyleSheet, Text, TouchableOpacity,
    View, Image, Alert, Async, TextInput
} from 'react-native';
import {
    Container, Header, Left, Body, Right, Button, Icon, Title,
    CardItem, Card, Content, Input, Item, Radio, Thumbnail
} from 'native-base';
import AsyncStorage from '@react-native-community/async-storage';

export default class HomeScreen extends React.Component {
    static navigationOptions = {
        header: null,
    };

    constructor(props) {
        super(props)
        this.state = {
            Textcontainer: null,
            TextSeal: null,
            Textbooking: null
        }
    }
    functionDataset() {
  // for set  AsyncStorage
        AsyncStorage.multiSet([
            ["Container", this.state.Textcontainer,],
            ["seal", this.state.TextSeal],
            ["booking", this.state.Textbooking]
        ])
       
        const { navigate } = this.props.navigation;
        navigate('Potocap')

    }


    render() {

        return (
            <Container>
                <Header style={{ backgroundColor: '#00796b' }}>
                    <Body>
                        <Title style={{ color: '#e3f2fd' }}>ตู้เข้า - ตู้ออก</Title>
                    </Body>
                    <Right>
                        <Button transparent>
                            <Title style={{ color: '#e3f2fd' }}>FPI In</Title>
                        </Button>
                    </Right>
                </Header>
                <Content>
                    <Card>
                        <CardItem header>
                            <Text style={{ fontSize: 14, color: '#1565c0', margin: 1 }}>วัน/เวลา เข้า-ออก  2019-06-01</Text>
                        </CardItem>
                        <CardItem>
                            <Body>
                                <Item rounded>
                                    <Input style={{ fontSize: 14 }}
                                        onChangeText={(Text) => this.setState({ Textcontainer: Text })}
                                        value={this.state.text}
                                        placeholder='หมายเลข Container ' />
                                </Item>
                                <Item style={{ backgroundColor: '#e0f7fa', margin: 1 }}>
                                </Item>

                                <Item rounded>
                                    <Input style={{ fontSize: 14 }}
                                        onChangeText={(Text) => this.setState({ TextSeal: Text })}
                                        placeholder='หมายเลข seal' />
                                </Item>
                                <Item style={{ backgroundColor: '#e0f7fa', margin: 1 }}>
                                </Item>

                                <Item rounded>
                                    <Input style={{ fontSize: 14 }}
                                        onChangeText={(Text) => this.setState({ Textbooking: Text })}
                                        placeholder='หมายเลข Booking' />
                                </Item>
                                <Item style={{ backgroundColor: '#e0f7fa', margin: 1 }}>
                                </Item>
                            </Body>
                        </CardItem>
                    </Card>
                    <Button block info onPress={() => this.functionDataset()}>
                        <Text>ถ่ายรูป</Text>
                    </Button>
                </Content>
            </Container>
        );
    }
}
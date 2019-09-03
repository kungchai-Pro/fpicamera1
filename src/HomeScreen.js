import React, { Component } from 'react';
import {
    AppRegistry, StyleSheet, Text, TouchableOpacity,
    View, Image, Alert, Async, TextInput, NetInfo, FlatList, ScrollView
} from 'react-native';
import {
    Container, Header, Left, Body, Right, Button, Title,
    CardItem, Card, Content, Input, Item, Radio, Form, Picker, Thumbnail
} from 'native-base';
import AsyncStorage from '@react-native-community/async-storage';
import Icon from 'react-native-vector-icons/Entypo';

import { Urlimage } from './component/confingURL';
export default class HomeScreen extends React.Component {
    static navigationOptions = {
        header: null,
    };

    constructor(props) {
        super(props)
        this.state = {
            Textcontainer: null,
            TextSeal: null,
            Textbooking: null,
            datanow: null,
            InOut: "IN",
            isLoadings: true,
            dataurl: Urlimage()

        }
    }
     componentDidMount() {

        let imagetimeLocal = new Date().toLocaleDateString();
        let times = new Date().toLocaleTimeString('TH', {
            hour12: false,
            hour: "numeric",
            minute: "numeric"
        });
        let datetimes = imagetimeLocal + ' ' + times
        console.disableYellowBox = true;
        var date = new Date().getDate();
        var month = new Date().getMonth() + 1;
        var year = new Date().getFullYear();
        var hours = new Date().getHours(); //Current Hours
        var min = new Date().getMinutes(); //Current Minutes
        var sec = new Date().getSeconds(); //Current Seconds
        var datanowdate = date + '-' + month + '-' + year + ':' + hours + ':' + min;

        setTimeout(() => {
            this.setState({
                datanow: datetimes,
                isLoadings: false,
            })
        }, 1000)
    }

    functionDataset() {
        //     alert(this.state.InOut);
        // AsyncStorage.multiSet([
        //     ["Container", this.state.Textcontainer],
        //     ["seal", this.state.TextSeal],
        //     ["booking", this.state.Textbooking],
        //     ["InOut", this.state.InOut]
        // ])

        this.setState({
            Textcontainer: null,
            TextSeal: null,
            Textbooking: null,
        }, function () {
            const { navigate } = this.props.navigation;
            navigate('Potocap',{
                Container:this.state.Textcontainer,
                seal:this.state.TextSeal,
                booking:this.state.Textbooking,
                InOut:this.state.InOut
                              })
        }

        )

    }

    onValueChange(value) {
        this.setState({
            InOut: value
        });
    }

    render() {
        if (this.state.isLoadings == true) {
            return (
                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#ffff' }}>
                    <View style={{ width: 200, height: 200, borderRadius: 10, backgroundColor: '#ffff', alignItems: 'center', justifyContent: 'center' }}>
                        <Image source={require('./image/delivery-truck.png')} style={{ resizeMode: 'contain', width: 50, height: 50 }} />
                    </View>
                </View>
            );
        }
        else if (this.state.isLoadings == false) {
            const { navigate } = this.props.navigation;

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
                            <CardItem header style={{ backgroundColor: '#8eacbb' }}>
                                <Text style={{ fontSize: 14, color: '#ffffff', margin: 1 }}>วันเวลา {this.state.datanow}</Text>
                                <Right>
                                    <Button success>
                                        <Icon name='clipboard' style={{ fontSize: 20, color: '#ffffff', padding: 10, margin: 5 }} onPress={() => navigate('Edit')} />
                                    </Button>
                                </Right>
                            </CardItem>

                            <Item >
                                <Text style={{ fontSize: 16, margin: 2 }}>สถานะ เข้า/ออก</Text>
                            </Item>
                            <Form>
                                <Picker
                                    mode="dropdown"
                                    iosIcon={<Icon name="arrow-down" />}
                                    headerBackButtonText="Baaack!"
                                    selectedValue={this.state.InOut}
                                    onValueChange={this.onValueChange.bind(this)}
                                >
                                    <Picker.Item label="เข้า" value="IN" />
                                    <Picker.Item label="ออก" value="OUT" />
                                </Picker>
                            </Form>
                        </Card>

                        <TouchableOpacity style={{
                            alignItems: 'center', justifyContent: 'center',
                            backgroundColor: '#607d8b', borderRadius: 20, marginLeft: 10, marginRight: 10
                        }}
                            onPress={() => this.functionDataset()}  >
                            <Text style={{ color: '#ffffff', fontSize: 16, margin: 10, padding: 5 }}>
                                ถ่ายรูป
                        </Text>
                        </TouchableOpacity>
                    </Content>
                </Container>
            );
        }
    }
}
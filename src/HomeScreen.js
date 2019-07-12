import React, { Component } from 'react';
import {
    AppRegistry, StyleSheet, Text, TouchableOpacity,
    View, Image, Alert, Async, TextInput,NetInfo
} from 'react-native';
import {
    Container, Header, Left, Body, Right, Button, Icon, Title,
    CardItem, Card, Content, Input, Item, Radio, Form, Picker
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
            Textbooking: null,
            datanow: null,
            InOut: "In",
            isLoadings: true,
        }
    }

    componentDidMount() {


        // NetInfo.getConnectionInfo().then((connectionInfo) => {
        //     // this.setState({isConnected: connectionInfo.type !== 'none'})
        //     if(connectionInfo.type == 'none'){
        //     //  Alert.alert(connectionInfo.type);
        //     Alert.alert('ไม่ได้เชื่อม INTERNET');
        //     return;
        //     }
            
        // });
        let imagetimeLocal =  new Date().toLocaleDateString();
        let times=new Date().toLocaleTimeString('TH', { hour12: false, 
            hour: "numeric", 
            minute: "numeric"});
            let datetimes=imagetimeLocal+' '+times
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
                isLoadings:false,
            })
               }, 1000)
    }


    functionDataset() {
        // for set  AsyncStorage
        if ((this.state.Textcontainer == null) || (this.state.TextSeal == null) || (this.state.Textbooking == null)) {
            Alert.alert('กรุณาตรวจสอบข้อมูล')
        }
        else {
            AsyncStorage.multiSet([
                ["Container", this.state.Textcontainer],
                ["seal", this.state.TextSeal],
                ["booking", this.state.Textbooking],
                ["InOut", this.state.InOut]
            ])
            this.setState({
                Textcontainer: null,
                TextSeal: null,
                Textbooking: null,
            }, function () {
                const { navigate } = this.props.navigation;
                navigate('Potocap')
            }
            )


        }
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
                    {/* <Spinner color='blue' /> */}
                    <View style={{ width: 200, height: 200, borderRadius: 10, backgroundColor: '#ffff', alignItems: 'center', justifyContent: 'center' }}>
                    <Image source={require('./image/iconfinder_5_940992.png')} style={{resizeMode:'contain',width:50,height:50}}/>
                        <Text style={{ margin: 5, color: '#1faa00' }}>Load  . . . </Text>
                    </View>
                </View>
            );
        }
        else if (this.state.isLoadings == false) {
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
                            </CardItem>
                            <CardItem>
                                <Body>
                                    <Item rounded>
                                        <Input style={{ fontSize: 14 }}
                                            onChangeText={(Text) => this.setState({ Textcontainer: Text })}
                                            value={this.state.Textcontainer}
                                            placeholder='หมายเลข Container ' />
                                    </Item>
                                    <Item style={{ backgroundColor: '#e0f7fa', margin: 1 }}>
                                    </Item>

                                    <Item rounded>
                                        <Input style={{ fontSize: 14 }}
                                            onChangeText={(Text) => this.setState({ TextSeal: Text })}
                                            value={this.state.TextSeal}
                                            placeholder='หมายเลข seal' />
                                    </Item>
                                    <Item style={{ backgroundColor: '#e0f7fa', margin: 1 }}>
                                    </Item>

                                    <Item rounded>
                                        <Input style={{ fontSize: 14 }}
                                            onChangeText={(Text) => this.setState({ Textbooking: Text })}
                                            value={this.state.Textbooking}
                                            placeholder='หมายเลข Booking' />
                                    </Item>
                                    <Item style={{ backgroundColor: '#e0f7fa', margin: 1 }}>
                                    </Item>
                                </Body>
                            </CardItem>
                            <Form>
                                <Picker
                                    mode="dropdown"
                                    iosIcon={<Icon name="arrow-down" />}
                                    headerBackButtonText="Baaack!"
                                    selectedValue={this.state.InOut}
                                    onValueChange={this.onValueChange.bind(this)}
                                >
                                    <Picker.Item label="เข้า" value="In" />
                                    <Picker.Item label="ออก" value="Out" />
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
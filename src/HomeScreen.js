import React, { Component } from 'react';
import { AppRegistry, StyleSheet, Text, TouchableOpacity, View, Image, Alert } from 'react-native';
import {
    Container, Header, Left, Body, Right, Button, Icon, Title,
    CardItem, Card, Content, Input, Item, Radio, Thumbnail
} from 'native-base';

export default class HomeScreen extends React.Component {
    static navigationOptions = {
        header: null,
      };
        
    cameraconfirm(data){
        const {navigate} = this.props.navigation;

            switch(data){
                case '1':
                   navigate('Cameras',{dataType:'1'});
                   break;
                case '2':
                        navigate('Cameras',{dataType:'2'});
                        break;
                case '3':
                        navigate('Cameras',{dataType:'3'});
                        break;
                 case '4':
                        navigate('Cameras',{dataType:'4'});  
                        break;
            }
    }

    render() {
        return (
            <Container style={{backgroundColor:'#e5ffff'}}>
                <Header style={{ backgroundColor: '#e8eaf6' }}>
                    <Body>
                        <Title style={{ color: '#0288d1' }}>ตู้เข้า - ตู้ออก</Title>
                    </Body>
                    <Right>
                        <Button transparent>
                            <Title style={{ color: '#0288d1' }}>FPI In</Title>
                        </Button>
                    </Right>
                </Header>
                <Content>
                    <Card>
                        <CardItem header>
                            <Text style={{ fontSize: 14, color: '#00897b' }}>Fortune application</Text>
                        </CardItem>
                        <CardItem>
                            <Right style={{ flex: 1 }}>
                                <Item rounded>
                                    <Input style={{ fontSize: 14 }} placeholder='หมายเลขตู้' />
                                </Item>
                                <Item style={{ backgroundColor: '#e0f7fa', margin: 1 }}>
                                    <Text style={{ fontSize: 14, color: '#1565c0', margin: 1 }}>วัน/เวลา เข้า-ออก  2019-06-01</Text>
                                </Item>
                            </Right>
                        </CardItem>
                    </Card>
                    <Item>
                        <Right style={{ marginRight:10}}>
                            <View style={{ marginRight: 5 ,flexDirection: 'row'}}>
                                <Text style={{ margin: 5 }}>เข้า</Text>
                                <Radio color={"#f0ad4e"} selectedColor={"#5cb85c"} selected={false} />

                                <Text style={{ margin: 5 }}>ออก</Text>
                                <Radio color={"#f0ad4e"} selectedColor={"#5cb85c"} selected={false} />
                            </View>
                        </Right>
                    </Item>

                    <View style={{ flexDirection: 'row', backgroundColor: '#e5ffff', flex: 1, margin: 10 }}>
                        <Body style={{ margin: 10 }}>
                            <Text>ถ่ายด้านหน้า</Text>
                            <TouchableOpacity onPress={()=>this.cameraconfirm('1')}>
                            <Image source={require('./image/iconcamera.png')}/>
                            </TouchableOpacity>
                        </Body >

                        <Body style={{ margin: 10 }}>
                            <Text>ถ่ายด้านหลัง</Text>
                            <TouchableOpacity onPress={()=>this.cameraconfirm('2')}>
                            <Image source={require('./image/iconcamera.png')}/>
                            </TouchableOpacity>
                        </Body>
                    </View>

                    <View style={{ flexDirection: 'row', backgroundColor: '#e5ffff', flex: 1, margin: 10 }}>
                        <Body style={{ margin: 10 }}>
                            <Text>ถ่ายด้านซ้าย</Text>
                            <TouchableOpacity onPress={()=>this.cameraconfirm('3')}>
                            <Image source={require('./image/iconcamera.png')}/>
                            </TouchableOpacity>
                        </Body>
                        <Body style={{ margin: 10 }}>
                            <Text>ถ่ายด้ายขวา</Text>
                            <TouchableOpacity onPress={()=>this.cameraconfirm('4')}>
                            <Image source={require('./image/iconcamera.png')}/>
                            </TouchableOpacity>
                        </Body>
                    </View>
                    <Button full success>
            <Text>Send</Text>
          </Button>
                </Content>
            </Container>
        );
    }
}
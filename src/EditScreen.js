import React, { Component } from 'react';
import {StyleSheet, Text,
  View, Image, Alert, FlatList, 
} from 'react-native';
import {
  Container, Header, Left, Body, Right, Button, Title,
 Content, List, ListItem, Thumbnail
} from 'native-base';

import { Get_Listcontainer, DeleteContainer } from './component/potoSave';
import { Urlimage } from './component/confingURL';

export default class EditScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      datalis: [],
      basic: true,
      fetching_from_server: false,
      timePassed: null,
      isLoadings: true,
      loading: false,
      reloaddataList:false
    }
  }
  componentDidMount() {
    console.disableYellowBox = true;
    var dataurl = Urlimage();

    Get_Listcontainer().then((data) => {
      console.log(data);
      this.setState({
        datalis: data,
        Urlimages: dataurl,
        isLoadings: false
      })
    })
  }

  ListView = (idcons) => {

    const { navigate } = this.props.navigation;
    navigate('ContainerDetail', { Idcon: idcons });

  }

  DeletData = (IDdata) => {
    Alert.alert(
      'ลบข้อมูล',
      'คุณต้องการลบข้อมูล ใช้ หรือ ไม่ ',
      [
        {
          text: 'OK',
          onPress: () => { DeleteContainer(IDdata).then((dataresult) => { this.componentDidMount() }) },
          style: 'Ok',
        },
        { text: 'Cancel', onPress: () => console.log('OK Pressed') },
      ],
      { cancelable: false },
    );
  }
  Reloaddata() {
    this.setState({
      reloaddataList: true
    })

    setTimeout(() => {
      this.setState({
        reloaddataList: false
      }, function () {
        this.componentDidMount();
      })
    }, 1500);
  }
  render() {
    const { navigate } = this.props.navigation;
    if (this.state.isLoadings == true) {
      return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#ffff' }}>
          <View style={{ width: 200, height: 200, borderRadius: 10, backgroundColor: '#ffff', alignItems: 'center', justifyContent: 'center' }}>
            <Image source={require('./image/delivery-truck.png')} style={{ resizeMode: 'contain', width: 50, height: 50 }} />
            <Text style={{ margin: 5, color: '#1faa00' }}>Load  . . . </Text>
          </View>
        </View>
      );
    }
    else {
      return (
        <Container>
          <Header style={{ backgroundColor: '#00796b' }}>
            <Button transparent onPress={() => navigate('Home')}>
              <Title style={{ color: '#e3f2fd' }}>หน้าหลัก</Title>
            </Button>
            <Right>
              <Body>
                <Title style={{ color: '#e3f2fd' }} onPress={() => this.Reloaddata()}>Reload. </Title>
              </Body>
            </Right>
          </Header>
          <View style={{alignItems:'center',backgroundColor:'#bbdefb'}}>
          { this.state.reloaddataList==true ? <Text style={{margin:5,color:'#FF6E33'}}>Loading  . . . . </Text>:<Text></Text>}
          </View>
          <Content>
            <FlatList
              data={this.state.datalis}
              renderItem={({ item }) =>
                <List key={item.id_No} >
                  <ListItem thumbnail style={item.containerNO == null || item.containerNO == '' ? { backgroundColor: '#ffd180' } : ''}>
                    <Left>
                      <Thumbnail square source={{ uri: this.state.Urlimages + '' + item.potoImage }} />
                    </Left>
                    <Body>
                      <Text style={styles.fontzin14}>To {item.datetime}</Text>
                      <Text style={styles.fontzin12}>.No {item.containerNO}</Text>
                      <Text style={styles.fontzin12}>Status {item.typeinput}</Text>
                    </Body>
                    <Right>
                      <Button transparent onPress={() => this.ListView(item.id_No)}>
                        <Text style={{ color: '#0091ea', fontSize: 14 }}>
                          ดูข้อมูล
                            </Text>
                      </Button>
                      <Button
                        transparent onPress={() => this.DeletData(item.id_No)}>
                        <Text style={{ color: '#ff6d00', fontSize: 14 }}>
                          ลบข้อมูล
                            </Text>
                      </Button>
                    </Right>
                  </ListItem>
                </List>}
            />

          </Content>
        </Container>
      );
    }
  }

}
const styles = StyleSheet.create({
  fontzin12: {
    fontSize: 12,
    color: '#1e88e5',
    marginLeft: 10
  },

  fontzin14: {
    fontSize: 14,
    color: '#424242'
  },
  fontzin16: {
    fontSize: 16,
    color: '#424242'
  },
  fontzin18: {
    fontSize: 18,
    color: '#5d4037'
  },
  fontzin20: {
    fontSize: 18,
    color: '#757575'
  }
});


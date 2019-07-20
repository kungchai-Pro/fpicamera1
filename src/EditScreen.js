import React, { Component } from 'react';
import {
    AppRegistry, StyleSheet, Text, TouchableOpacity,
    View, Image, Alert, Async, TextInput, NetInfo,FlatList,RefreshControl,ActivityIndicator
} from 'react-native';
import Loading from'./Loader';

import {
    Container, Header, Left, Body, Right, Button, Title,
    CardItem, Card, Content, Input, Item, Radio, Form,List,ListItem,Thumbnail
} from 'native-base';
import AsyncStorage from '@react-native-community/async-storage';
import Icon from 'react-native-vector-icons/Entypo';
import{Get_Listcontainer,DeleteContainer}from'./component/potoSave';
import { Urlimage } from './component/confingURL';
 
class EditScreen extends Component {

    static navigationOptions = {
        title: 'แก้ไขข้อมูล',
    };

    constructor(props) {
        super(props);
        this.state = {
            datalis:[],
            basic: true,
            fetching_from_server:false,
            timePassed:null,
            isLoadings:true,
            loading:false
        }
    }


    async componentDidMount() {
        console.disableYellowBox = true;
        // OneSignal.inFocusDisplaying(2)
         var dataurl = Urlimage();
        // this.setState({
        //     Urlimages: dataurl,
        // })
        setTimeout(() => {this.setState({timePassed: true})}, 100);
        console.log(this.state.timePassed)
        Get_Listcontainer().then((data) => {
            console.log(data);
            this.setState({
              datalis: data,
              Urlimages: dataurl,
              isLoadings:false
            })
          })
    }

  ListView=(containerNO)=>{
 
     const { navigate } = this.props.navigation;
       navigate('ContainerDetail',{Idcon:containerNO});

    }

    DeletData=(IDdata)=>{
      this.setState({
        loading:true
      })

      DeleteContainer(IDdata).then((dataresult)=>{
    console.log(dataresult);
      })

      setTimeout(() => { 
        this.setState({
          loading:false,
        });

        this._onRefresh();

        }, 1500)

   
    }


    _onRefresh() {

      this.setState({refreshing: true});
      
      var dataurl = Urlimage();

      Get_Listcontainer().then((data) => {
        console.log(data);
        this.setState({
          datalis: data,
          Urlimages: dataurl,
          refreshing:false,
          fetching_from_server:false
        })
      })

      // fetchData().then(() => {
      //   this.setState({refreshing: false});
      // });
    }

    render() {
      
      if(this.state.isLoadings==true){
          return (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#ffff' }}>
                {/* <Spinner color='blue' /> */}
                <View style={{ width: 200, height: 200, borderRadius: 10, backgroundColor: '#ffff', alignItems: 'center', justifyContent: 'center' }}>
                <Image source={require('./image/delivery-truck.png')} style={{resizeMode:'contain',width:50,height:50}}/>
                    <Text style={{ margin: 5, color: '#1faa00' }}>Load  . . . </Text>
                </View>
            </View>
        );
      }
      else{
        return (
            <Container>
            <Content> 

            <Loading
            loading={this.state.loading}
            />
              <FlatList
                data={this.state.datalis}
                renderItem={({ item }) =>
               
                <List key={item.id_No} 
                refreshControl={
                  <RefreshControl
                    refreshing={this.state.refreshing}
                    onRefresh={this._onRefresh}
                    tintColor="#ff0000"
                    title="Loading..."
                    titleColor="#00ff00"
                    colors={['#ff0000', '#00ff00', '#0000ff']}
                    progressBackgroundColor="#ffff00"
                  />
                }
                >

                      <ListItem thumbnail>
                        <Left>
                          <Thumbnail square source={{ uri: this.state.Urlimages + '' + item.potoImage }} />
                        </Left>
                        <Body>
                          <Text style={styles.fontzin14}>To {item.datetime}</Text>
                          <Text style={styles.fontzin12}>.No {item.containerNO}</Text>
                          <Text style={styles.fontzin12}>Status {item.typeinput}</Text>
                        </Body>
                        <Right>
                          <Button transparent onPress={() => this.ListView(item.containerNO)}>
                            <Text style={{color:'#0091ea'}}>
                              View
                            </Text>
                          </Button>

                          <Button 
                          transparent onPress={() => this.DeletData(item.containerNO)}>
                            <Text style={{color:'#ff6d00'}}>
                              Delete
                            </Text>
                          </Button>
                        </Right>
                      </ListItem>
                    </List>}
              />
              {this.state.fetching_from_server ? (
          <ActivityIndicator color="black" style={{ margin: 15 }} />
        ) : null}
                  
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
  //    backgroundColor: 'black',

});


export default EditScreen;
import React, { Component } from 'react';
import {
    AppRegistry, StyleSheet, Text, TouchableOpacity,
    View, Image, Alert, AsyncStorage, Modal
} from 'react-native';
import {
    Container, Header, Left, Body, Right, Button, Icon, Title,
    CardItem, Card, Content, Input, Item, Radio, Thumbnail
} from 'native-base';


export default class SendDataScreen extends React.Component {

    componentDidMount() {
        // for get  AsyncStorage
        // AsyncStorage.multiGet(['Container', 'seal', 'booking'], (err, stores) => {
        //     stores.map((result, i, store) => {
        //         this.setState({
        //             dataContainer: store[0][1],
        //             dataSeal: store[1][1],
        //             databookin: store[2][1]
        //         });
        //     })

        // })
        // const { navigate } = this.props.navigation;
        // const data_params = this.props.navigation.state.params;
        // console.log(data_params);

    }

    render() {
        const { navigate } = this.props.navigation;
        const data_params = this.props.navigation.state.params;
        console.log(data_params);
        return (
            <View style={styles.container}>
                {/* <View style={styles.preview}>
                    <Text>{data_params.frontends[0].IdType}.ด้านหน้า</Text>
                    <Image source={{ uri: data_params.frontends[0].uri_Image }} style={{ resizeMode: 'stretch', height: 300, width: null }} />



                    <Text>{data_params.backends[0].IdType}.ด้านหลัง</Text>
                    <Image source={{ uri: data_params.backends[0].uri_Image }} style={{ resizeMode: 'stretch', height: 300, width: null }} />



                    <Text>{data_params.Leftsides[0].IdType}.ด้านซ้าย</Text>
                    <Image source={{ uri: data_params.Leftsides[0].uri_Image }} style={{ resizeMode: 'stretch', height: 300, width: null }} />



                    <Text>{data_params.Rightsides[0].IdType}.ด้านขวา</Text>
                    <Image source={{ uri: data_params.Rightsides[0].uri_Image }} style={{ resizeMode: 'stretch', height: 300, width: null }} />
                </View> */}
                <View style={styles.activityIndicatorWrapper}>
                <Text>1

                </Text>
                <Text>1

                </Text>
                <Text>1

                </Text>
                <Text>1

                </Text>
                <Text>1

                </Text>
                <Text>1

                </Text>
                <Text>1

                </Text>
                <Text>1

                </Text>
                <Text>1

                </Text>

                <Text>1

                </Text>
                <Text>1

                </Text>
                <Text>1

                </Text>
        
                <Text>1

                </Text>
                <Text>1

                </Text>

                <Text>1

                </Text>

                <Text>1

                </Text>
                <Text>1

                </Text>
                <Text>1

                </Text>

                <Text>1

                </Text>
                <Text>1

                </Text>
                <Text>1

                </Text>

                <Text>1

                </Text>


                <Text>1

                </Text>

                <Text>1

                </Text>
                <Text>1

                </Text>

                <Text>1

                </Text>
                <Text>1

                </Text>
                </View>
            </View>

        )
    }


}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
    //    backgroundColor: 'black',
    },
    preview: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    capture: {
        flex: 0,
        backgroundColor: '#fff',
        borderRadius: 5,
        padding: 15,
        paddingHorizontal: 20,
        alignSelf: 'center',
        margin: 20,
    },
    boxcamera1:{
        flex: 1, 
        backgroundColor: '#e8eaf6',
        margin:1,
        borderBottomRightRadius:10,
        borderBottomLeftRadius:10 
    }

});
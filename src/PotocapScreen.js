import React, { Component } from 'react';
import {
    AppRegistry, StyleSheet, Text, TouchableOpacity,
    View, Image, Alert, AsyncStorage, Modal
} from 'react-native';
import { RNCamera } from 'react-native-camera';
import { Container, Spinner } from 'native-base';

import { Savedatafull, Notification } from './component/potoSave';

export default class PotocapScreen extends React.Component {
    static navigationOptions = {
        header: null,
    };

    constructor(props) {
        super(props)
        this.state = {
            dataContainer: null,
            dataSeal: null,
            databookin: null,
            InOut: null,
            modalVisible: false,
            Typeim: null,
            frontend: [],
            image1: null
        }
    }

    async componentDidMount() {
        // for get  AsyncStorage
        console.disableYellowBox = true;
        const paramsdata = this.props.navigation.state.params;
        // await   AsyncStorage.multiGet(['Container', 'seal', 'booking', 'InOut'], (err, stores) => {
            // stores.map((result, i, store) => {
                // console.log(store);

                // Container:paramsdata.Textcontainer,
                // seal:this.state.TextSeal,
                // booking:this.state.Textbooking,
                // InOut:this.state.InOut
                this.setState({
                    dataContainer: paramsdata.Container,
                    dataSeal: paramsdata.seal,
                    databookin: paramsdata.booking,
                    InOut: paramsdata.InOut,
                    loading: false
                });
            // })
        // })
    }

    senddataTo() {
        if (this.state.frontend.length == 0) {
            //Savedatafull(this.state.frontend);
            Alert.alert('ยังไม่ได้ถ่ายรถ');
            return;
        }
        else {

            let datalist = new Savedatafull(this.state.frontend[0])
            if (datalist.__proto__.constructor.name == 'Savedatafull') {
                // console.log(datalist.__proto__.constructor.name);
                this.callbackhome(this.state.frontend)
                // AsyncStorage.multiRemove(['Container', 'seal', 'booking', 'InOut'], (err) => {
                //     console.log('Local storage user info removed!');
                // });
            }
            else {
                alert('ไม่สามารถทำการบันทึกได้');
            }
        }
    }

    callbackhome(data_id) {
        console.log(data_id);
        const { navigate } = this.props.navigation;
        var date = new Date().getDate();
        var month = new Date().getMonth() + 1;
        var year = new Date().getFullYear();
        var hours = new Date().getHours(); //Current Hours
        var min = new Date().getMinutes(); //Current Minutes
        var sec = new Date().getSeconds(); //Current Seconds

        var datanowdate = date + '-' + month + '-' + year + ':' + hours + ':' + min;

        if (data_id[0].IdType == "1") {
            let repostlist='มีรถ Container เข้าเวลา'+datanowdate;
            var dataOntification = Notification(repostlist)
            console.log('api ontification' + dataOntification);
       
            Alert.alert(
                'บันทึก',
                'ทำการบันทึกแล้ว',
                [
                    { text: 'OK', onPress: () =>navigate('Edit') },
                ]
            )  
            
        }
        else {
            
            navigate('Home')
            console.log('car cotainer out for compapany');
        }

    }

    // control modal  propUp  on/off
    setModalVisible(visible) {
        this.setState({ modalVisible: visible });
    }

    OncaremaModal(visible, typeIm) {
        this.setState({
            Typeim: typeIm,
            modalVisible: visible
        });
    }

    takePicture = async function () {
        const { navigate } = this.props.navigation;
        const data_params = this.props.navigation.state.params;
        if (this.camera) {
            const options = {
                quality: 0.5,
                base64: true,
                fixOrientation: true
            };
            const data = await this.camera.takePictureAsync(options);
            //  console.log(data);

            if ((data.width <= 3096) || (data.height <= 4128)) {
                switch (this.state.Typeim) {
                    case 1:
                        this.setState({ frontend: [] })
                        this.state.frontend.push({
                            IdType: this.state.Typeim,
                            uri_Image: data.uri,
                            id_contai: this.state.dataContainer,
                            id_seal: this.state.dataSeal,
                            id_booking: this.state.databookin,
                            Id_InOut: this.state.InOut
                        })
                        this.setState({ frontend: this.state.frontend })
                        console.log(this.state.frontend[0].IdType + '-' + this.state.frontend[0].uri_Image)
                        this.setState({
                            image1: this.state.frontend[0].uri_Image
                        })
                        break;
                }

            } else {
                alert('รูปขนาดใหญ่เกินไป')
            }
            this.setModalVisible(!this.state.modalVisible);
        }
    }

    render() {
        if (this.state.loading == true) {
            return (
                <Container>

                    <View style={{ alignItems: 'center', justifyContent: 'center', flex: 1 }}>
                        <Spinner color='green' />
                    </View>

                </Container>
            )
        }

        else {
            const { navigate } = this.props.navigation;
            return (
                <View style={{ flex: 1 }}>
                    <Modal
                        animationType="slide"
                        transparent={false}
                        visible={this.state.modalVisible}
                        onRequestClose={() => {
                            Alert.alert('คุณยังไม่ได้ถ่ายภาพ');
                        }}>
                        <View style={{ marginTop: 2, flex: 1 }}>
                            <View style={{ flex: 1 }}>
                                <RNCamera
                                    ref={ref => {
                                        this.camera = ref;
                                    }}
                                    style={styles.preview}
                                    type={RNCamera.Constants.Type.back}
                                    flashMode={RNCamera.Constants.FlashMode.on}
                                    mirrorImage={false}
                                    cropToPreview={false}
                                    androidCameraPermissionOptions={{
                                        title: 'Permission to use camera',
                                        message: 'We need your permission to use your camera',
                                        buttonPositive: 'Ok',
                                        buttonNegative: 'Cancel',
                                    }}
                                    androidRecordAudioPermissionOptions={{
                                        title: 'Permission to use audio recording',
                                        message: 'We need your permission to use your audio',
                                        buttonPositive: 'Ok',
                                        buttonNegative: 'Cancel',
                                    }}
                                    onGoogleVisionBarcodesDetected={({ barcodes }) => {
                                        console.log(barcodes);
                                    }}
                                />
                            </View>
                            <View style={{ flex: 0, flexDirection: 'row', justifyContent: 'center' }}>
                                <TouchableOpacity onPress={this.takePicture.bind(this)} style={styles.capture}>
                                    <Text style={{ fontSize: 14 }}> ถ่าย </Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </Modal>
                    <View style={{ marginTop: 5, backgroundColor: '#8eacbb', marginVertical: 5,flexDirection:'row',justifyContent:'space-between',padding:5}}>
                        <Text style={{ color: '#4b636e', fontSize: 16, marginLeft: 15 }}>FPI Camera Input</Text>
                        <Text style={{fontSize:14}} onPress={()=>navigate('Home')}> # หน้าหลัก</Text>
                    </View>
                    <View style={{ flex: 3, margin: 1, backgroundColor: '#f8fdff',borderColor:'#bbdefb',borderWidth:1}}>
                        <Text>ภาพถ่ายรถ</Text>
                        <Image source={{ uri: this.state.image1 }} style={{ resizeMode: 'contain', height: 150, width: null, flex: 1 }} />
                    </View>

                    <View style={{ flex: 1, flexDirection: 'row', margin: 1 }}>
                        <View style={styles.boxcamera1}>
                            <TouchableOpacity style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}
                                onPress={() => this.OncaremaModal(true, 1)}>
                                <Text style={{color:'#ffffff',fontSize:16}}>ถ่ายภาพ</Text>
                                <Image source={require('./image/iconfinder_5_940992.png')} style={{ resizeMode: 'contain', width: 50, height: 50 }} />
                            </TouchableOpacity>
                        </View>

                    </View>
                    <TouchableOpacity style={{ alignItems: 'center', justifyContent: 'center', backgroundColor: '#607d8b', borderRadius: 20, margin: 15 }}
                        onPress={() => this.senddataTo()}
                    >
                        <Text style={{ color: '#ffffff', fontSize: 16, margin: 10, padding: 5 }}>
                            บันทึก
                        </Text>
                    </TouchableOpacity>
                </View>
            );
        }
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: 'black',
    },
    preview: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    capture: {
        flex: 0,
        backgroundColor: '#64b5f6',
        borderRadius: 5,
        padding: 15,
        paddingHorizontal: 20,
        alignSelf: 'center',
        margin: 20,
    },
    boxcamera1: {
        flex: 1,
        backgroundColor: '#ffd54f',
        margin: 1,
        borderRadius: 10
    }
});
import React, { Component } from 'react';
import {
    AppRegistry, StyleSheet, Text, TouchableOpacity,
    View, Image, Alert, AsyncStorage, Modal
} from 'react-native';
import { RNCamera } from 'react-native-camera';
import { Savedatafull } from './component/potoSave';
import { thisTypeAnnotation } from '@babel/types';
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
            modalVisible: false,
            Typeim: null,
            frontend: [],
            backend: [],
            Leftside: [],
            Rightside: []
        }
    }

    componentDidMount() {
        // for get  AsyncStorage
        AsyncStorage.multiGet(['Container', 'seal', 'booking'], (err, stores) => {
            stores.map((result, i, store) => {
                this.setState({
                    dataContainer: store[0][1],
                    dataSeal: store[1][1],
                    databookin: store[2][1]
                });
            })

        })
    }


    //for delet AsyncStorage
    // removedata(Type) {
    // AsyncStorage.multiRemove(['Container', 'seal', 'booking'], (err) => {
    //     console.log('Local storage user info removed!');
    // });
    // const { navigate } = this.props.navigation;
    // navigate('Potocap',{dataType:Type})

    // this.state.list.map(item => (
    // console.log(item.IdType+"/"+item.uri_Image+"/"+item.id_contai+"/"+item.id_seal+"/"+item.id_bookiing)
    // (this.testapp(item.IdType))
    // ));
    // }

    senddataTo() {

        if (this.state.frontend.length == 0) {
            //Savedatafull(this.state.frontend);
            alert('ยังไม่ได้ถ่ายด้านหน้า');
            return;
        }
        else if (this.state.backend.length == 0) {
            alert('ยังไม่ได้ถ่ายด้านหลัง');
            return;
        }
        else if (this.state.Leftside.length == 0) {
            alert('ยังไม่ได้ถ่ายด้านซ้าย');
            return;
        }
        else if (this.state.Rightside.length == 0) {
            alert('ยังไม่ได้ถ่ายด้านขวา');
            return;
        }
        else {
            let frontends = this.state.frontend
            new Promise(function (resolve, reject) {
                setTimeout(function () {
                    Savedatafull(frontends)
                }, 100)
            })

            let backends = this.state.backend;
            new Promise(function (resolve, reject) {
                setTimeout(function () {
                    Savedatafull(backends)
                }, 100)
            })

            let Leftsides = this.state.Leftside;
            new Promise(function (resolve, reject) {
                setTimeout(function () {
                    Savedatafull(Leftsides)
                }, 100)
            })
            let Rightsides = this.state.Rightside;
            new Promise(function (resolve, reject) {
                setTimeout(function () {
                    Savedatafull(Rightsides)
                }, 100)
            })


        }
        // Savedatafull(this.state.frontend)
        //     Savedatafull(this.state.backend)
        //         Savedatafull(this.state.Leftside)
        //             Savedatafull(this.state.Rightside)
        //                 alert('บันทึกข้อมูล');

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
            //  console.log(data.uri);

            switch (this.state.Typeim) {
                case 1:
                    this.setState({ frontend: [] })
                    this.state.frontend.push({
                        IdType: this.state.Typeim,
                        uri_Image: data.uri,
                        id_contai: this.state.dataContainer,
                        id_seal: this.state.dataSeal,
                        id_bookiing: this.state.databookin
                    })
                    this.setState({ frontend: this.state.frontend })
                    console.log(this.state.frontend[0].IdType + '-' + this.state.frontend[0].uri_Image)
                    Alert.alert('บันทึกด้านหน้า')
                    break;
                case 2:
                    this.setState({ backend: [] })
                    this.state.backend.push({
                        IdType: this.state.Typeim,
                        uri_Image: data.uri,
                        id_contai: this.state.dataContainer,
                        id_seal: this.state.dataSeal,
                        id_bookiing: this.state.databookin
                    })
                    this.setState({ backend: this.state.backend })
                    console.log(this.state.backend[0].IdType + '-' + this.state.backend[0].uri_Image)
                    Alert.alert('บันทึกด้านหลัง')
                    break;
                case 3:
                    this.setState({ Leftside: [] })
                    this.state.Leftside.push({
                        IdType: this.state.Typeim,
                        uri_Image: data.uri,
                        id_contai: this.state.dataContainer,
                        id_seal: this.state.dataSeal,
                        id_bookiing: this.state.databookin
                    })
                    this.setState({ Leftside: this.state.Leftside })
                    console.log(this.state.Leftside[0].IdType + '-' + this.state.Leftside[0].uri_Image)
                    Alert.alert('บันทึกด้านซ้าย')
                    break;
                case 4:
                    this.setState({ Rightside: [] })
                    this.state.Rightside.push({
                        IdType: this.state.Typeim,
                        uri_Image: data.uri,
                        id_contai: this.state.dataContainer,
                        id_seal: this.state.dataSeal,
                        id_bookiing: this.state.databookin
                    })
                    this.setState({ Rightside: this.state.Rightside })
                    console.log(this.state.Rightside[0].IdType + '-' + this.state.Rightside[0].uri_Image)
                    Alert.alert('บันทึกด้านขวา')
                    break;

            }
            this.setModalVisible(!this.state.modalVisible);
        }
    }

    render() {
        return (
            <View style={{ flex: 1 }}>
                <Modal
                    animationType="slide"
                    transparent={false}
                    visible={this.state.modalVisible}
                    onRequestClose={() => {
                        Alert.alert('Modal has been closed.');
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

                <View style={{ flex: 1, backgroundColor: '#009688' }}>
                    <TouchableOpacity style={{ flex: 1, backgroundColor: '#26a69a' }}
                        onPress={() => this.OncaremaModal(true, 1)}>
                        <Text>ถ่ายด้านหน้า</Text>
                    </TouchableOpacity>
                </View>
                <View style={{ flex: 1 }}>
                    <TouchableOpacity style={{ flex: 1, backgroundColor: '#4db6ac' }}
                        onPress={() => this.OncaremaModal(true, 2)}>
                        <Text>ถ่ายด้านหลัง</Text>
                    </TouchableOpacity>
                </View>
                <View style={{ flex: 1, backgroundColor: '#80cbc4' }}>
                    <TouchableOpacity style={{ flex: 1, backgroundColor: '#4db6ac' }}
                        onPress={() => this.OncaremaModal(true, 3)}>
                        <Text>ถ่ายด้านซ้าย</Text>
                    </TouchableOpacity>
                </View>
                <View style={{ flex: 1, backgroundColor: '#b2dfdb' }}>
                    <TouchableOpacity style={{ flex: 1, backgroundColor: '#4db6ac' }}
                        onPress={() => this.OncaremaModal(true, 4)}>
                        <Text>ถ่ายด้านขวา</Text>
                    </TouchableOpacity>
                </View>
                <View style={{ flex: 1, backgroundColor: '#e0f2f1' }}>
                    <TouchableOpacity style={{ flex: 1 }}
                        onPress={() => this.senddataTo()}
                    >
                        <Text>
                            บันทึก
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
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
        backgroundColor: '#fff',
        borderRadius: 5,
        padding: 15,
        paddingHorizontal: 20,
        alignSelf: 'center',
        margin: 20,
    },
});
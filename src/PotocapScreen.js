import React, { Component } from 'react';
import {
    AppRegistry, StyleSheet, Text, TouchableOpacity,
    View, Image, Alert, AsyncStorage, Modal
} from 'react-native';
import { RNCamera } from 'react-native-camera';
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
            list: []
        }
    }

    componentDidMount() {
        // for get  AsyncStorage
        AsyncStorage.multiGet(['Container', 'seal', 'booking'], (err, stores) => {
            stores.map((result, i, store) => {
                this.setState({
                    dataContainer:store[0][1],
                    dataSeal:store[1][1],
                    databookin:store[2][1]
                });
            })

        })
    }


    // functioncapPoto(data) {
    //     const { navigate } = this.props.navigation;
    //     navigate('Cameras', { dataType: data });
    // }

    //for delet AsyncStorage
    removedata(Type) {
        // AsyncStorage.multiRemove(['Container', 'seal', 'booking'], (err) => {
        //     console.log('Local storage user info removed!');
        // });
        // const { navigate } = this.props.navigation;
        // navigate('Potocap',{dataType:Type})

        this.state.list.map(item => (
        console.log(item.IdType+"/"+item.uri_Image+"/"+item.id_contai+"/"+item.id_seal+"/"+item.id_bookiing)
        (this.testapp(item.IdType))
        ));
    }

    TestApp(item){
            
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
            // console.log(data.uri);
            //add data  to array
            this.state.list.push({ IdType: this.state.Typeim, 
                uri_Image: data.uri,
                id_contai:this.state.dataContainer,
                id_seal:this.state.dataSeal,
                id_bookiing:this.state.databookin
             })
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
                        <Text>ถ่ายด้านขวา</Text>
                    </TouchableOpacity>
                </View>
                <View style={{ flex: 1, backgroundColor: '#b2dfdb' }}>
                    <TouchableOpacity style={{ flex: 1, backgroundColor: '#4db6ac' }}
                        onPress={() => this.OncaremaModal(true, 4)}>
                        <Text>ถ่ายด้านซ้าย</Text>
                    </TouchableOpacity>
                </View>
                <View style={{ flex: 1, backgroundColor: '#e0f2f1' }}>
                    <TouchableOpacity style={{ flex: 1 }}
                        onPress={() => this.removedata(1)}
                    >
                        <Text>
                            บันทึก
                        </Text>
                    </TouchableOpacity>
                </View>
                <View style={{ flex: 1 }}>
                    {
                        this.state.list.map(item => (
                            <View key={item.IdType} style={{ flex: 1 }}>
                                <Text>{item.IdType}</Text>
                                <Text>{item.uri_Image}</Text>
                                <Text>{item.id_contai}</Text>
                                <Text>{item.id_seal}</Text>
                                <Text>{item.id_bookiing}</Text>
                            </View>
                        ))
                    }
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
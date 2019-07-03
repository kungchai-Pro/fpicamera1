import React, { Component } from 'react';
import {
    AppRegistry, StyleSheet, Text, TouchableOpacity,
    View, Image, Alert, AsyncStorage, Modal
} from 'react-native';
import { RNCamera } from 'react-native-camera';
import { Savedatafull } from './component/potoSave';
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
            InOut:null,
            modalVisible: false,
            Typeim: null,
            frontend: [],
            backend: [],
            Leftside: [],
            Rightside: [],
            image1: null,
            image2: null,
            image3: null,
            image4: null
        }
    }

    componentDidMount() {
        // for get  AsyncStorage
        console.disableYellowBox = true;
        AsyncStorage.multiGet(['Container', 'seal', 'booking','InOut'], (err, stores) => {
            stores.map((result, i, store) => {
                this.setState({
                    dataContainer: store[0][1],
                    dataSeal: store[1][1],
                    databookin: store[2][1],
                    InOut:store[3][1]
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
            Alert.alert('ยังไม่ได้ถ่ายด้านหน้า');
            return;
        }
        else if (this.state.backend.length == 0) {
            Alert.alert('ยังไม่ได้ถ่ายด้านหลัง');
            return;
        }
        else if (this.state.Leftside.length == 0) {
            Alert.alert('ยังไม่ได้ถ่ายด้านซ้าย');
            return;
        }
        else if (this.state.Rightside.length == 0) {
            Alert.alert('ยังไม่ได้ถ่ายด้านขวา');
            return;
        }
        else {
            const { navigate } = this.props.navigation;
            navigate('SendData',{
                frontends:this.state.frontend,
                backends :this.state.backend,
                Leftsides : this.state.Leftside,
                Rightsides : this.state.Rightside
            })
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
            if((data.width <= 3096)||(data.height <= 4128)){
            switch (this.state.Typeim) {
                case 1:
                    this.setState({ frontend: [] })
                    this.state.frontend.push({
                        IdType: this.state.Typeim,
                        uri_Image: data.uri,
                        id_contai: this.state.dataContainer,
                        id_seal: this.state.dataSeal,
                        id_booking: this.state.databookin,
                        Id_InOut:this.state.InOut
                    })
                    this.setState({ frontend: this.state.frontend })
                    console.log(this.state.frontend[0].IdType + '-' + this.state.frontend[0].uri_Image)
                    this.setState({
                        image1: this.state.frontend[0].uri_Image
                    })
                  //  Alert.alert('บันทึกด้านหน้า')
                    break;
                case 2:
                    this.setState({ backend: [] })
                    this.state.backend.push({
                        IdType: this.state.Typeim,
                        uri_Image: data.uri,
                        id_contai: this.state.dataContainer,
                        id_seal: this.state.dataSeal,
                        id_booking: this.state.databookin,
                        Id_InOut:this.state.InOut
                    })
                    this.setState({ backend: this.state.backend })
                    console.log(this.state.backend[0].IdType + '-' + this.state.backend[0].uri_Image)
                    this.setState({
                        image2: this.state.backend[0].uri_Image
                    })
                   // Alert.alert('บันทึกด้านหลัง')
                    break;
                case 3:
                    this.setState({ Leftside: [] })
                    this.state.Leftside.push({
                        IdType: this.state.Typeim,
                        uri_Image: data.uri,
                        id_contai: this.state.dataContainer,
                        id_seal: this.state.dataSeal,
                        id_booking: this.state.databookin,
                        Id_InOut:this.state.InOut
                    })
                    this.setState({ Leftside: this.state.Leftside })
                    console.log(this.state.Leftside[0].IdType + '-' + this.state.Leftside[0].uri_Image)
                    this.setState({
                        image3: this.state.Leftside[0].uri_Image
                    })
                   // Alert.alert('บันทึกด้านซ้าย')
                    break;
                case 4:
                    this.setState({ Rightside: [] })
                    this.state.Rightside.push({
                        IdType: this.state.Typeim,
                        uri_Image: data.uri,
                        id_contai: this.state.dataContainer,
                        id_seal: this.state.dataSeal,
                        id_booking: this.state.databookin,
                        Id_InOut:this.state.InOut
                    })
                    this.setState({ Rightside: this.state.Rightside })
                    console.log(this.state.Rightside[0].IdType + '-' + this.state.Rightside[0].uri_Image)
                    this.setState({
                        image4: this.state.Rightside[0].uri_Image
                    })
                  //  Alert.alert('บันทึกด้านขวา')
                    break;
            }
        }else{
            alert('รูปขนาดใหญ่เกินไป')
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
                <View style={{marginTop:5,backgroundColor:'#8eacbb',marginVertical:5}}>
                    <Text style={{color:'#4b636e',fontSize:16,marginLeft:15}}>FPI Camera Input</Text>
                    </View>
                <View style={{ flex: 1, flexDirection: 'row',margin:1 }}>
                    <View style={styles.boxcamera1}>
                        <TouchableOpacity style={{ flex: 1,alignItems:'center'}}
                            onPress={() => this.OncaremaModal(true, 1)}>
                            <Text>ถ่ายด้านหน้า</Text>
                            <Image source={require('./image/iconfinder_5_940992.png')} style={{resizeMode:'contain',width:50,height:50}}/>
                        </TouchableOpacity>
                    </View>
                    <View style={{ flex:1,margin:1,backgroundColor:'#f8fdff'}}>
                        <Text>ภาพที่1</Text>
                    <Image source={{ uri: this.state.image1}} style={{ resizeMode:'contain',height: 150, width: null, flex: 1 }} />
                    </View>
                </View>
                <View style={{ flex: 1, flexDirection: 'row',margin:1 }}>
                    <View style={styles.boxcamera1}>
                        <TouchableOpacity style={{ flex: 1,alignItems:'center'}}
                            onPress={() => this.OncaremaModal(true, 2)}>
                            <Text style={{margin:2}}>ถ่ายด้านหลัง</Text>
                            <Image source={require('./image/iconfinder_5_940992.png')} style={{ImageResizeMode:'center',width:50,height:50}}/>
                        </TouchableOpacity>
                    </View>
                    <View style={{ flex: 1, backgroundColor: '#f8fdff' }}>
                    <Text>ภาพที่2</Text>
                    <Image source={{ uri: this.state.image2}} style={{resizeMode:'contain', height: 50, width: null, flex: 1 }} />
                    </View>
                </View>
                <View style={{ flex: 1, flexDirection: 'row',margin:1 }}>
                    <View style={styles.boxcamera1}>
                        <TouchableOpacity style={{ flex: 1,alignItems:'center'}}
                            onPress={() => this.OncaremaModal(true, 3)}>
                            <Text>ถ่ายด้านซ้าย</Text>
                            <Image source={require('./image/iconfinder_5_940992.png')} style={{resizeMode:'contain',width:50,height:50}}/>
                        </TouchableOpacity>
                    </View>
                    <View style={{ flex: 1, backgroundColor: '#f8fdff' }}>
                    <Text>ภาพที่3</Text>
                    <Image source={{ uri: this.state.image3}} style={{ resizeMode:'contain',height: 50, width: null, flex: 1 }} />
                    </View>
                </View>
                <View style={{ flex: 1, flexDirection: 'row',margin:1 }}>
                    <View style={styles.boxcamera1}>
                        <TouchableOpacity style={{ flex: 1, alignItems:'center'}}
                            onPress={() => this.OncaremaModal(true,4)}>
                            <Text>ถ่ายด้านขวา</Text>
                            <Image source={require('./image/iconfinder_5_940992.png')} style={{resizeMode:'contain',width:50,height:50}}/>
                        </TouchableOpacity>
                    </View>
                    <View style={{ flex: 1, backgroundColor: '#f8fdff' }}>
                    <Text>ภาพที่4</Text>
                    <Image source={{ uri: this.state.image4}} style={{ resizeMode:'contain',height: 50, width: null, flex: 1 }} />
                    </View>
                </View>
                 {/* <View style={{ flex: 1 ,alignItems:'center',justifyContent: 'center'}}>  */}
                    <TouchableOpacity style={{alignItems:'center',justifyContent: 'center',backgroundColor:'#607d8b',borderRadius:20,margin:15}}
                        onPress={() => this.senddataTo()}
                    >
                        <Text style={{color:'#ffffff',fontSize:16,margin:10,padding:5}}>
                            ตรวจข้อมูล
                        </Text>
                    </TouchableOpacity>
                 {/* </View>  */}
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
        backgroundColor: '#64b5f6',
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
        borderRadius:10
    }
});

import React, { Component } from 'react';
import { AppRegistry, StyleSheet, Text, TouchableOpacity, View, Image, Alert } from 'react-native';
import { RNCamera } from 'react-native-camera';

//import { thisExpression } from '@babel/types';

export default class Cameras extends Component {
    static navigationOptions = {
        header: null,
    };

    constructor(prop) {
        super(prop)
        this.state = {
            Imagedata: ''
        }
    }


      UpfilePicture(PicturePath) {
     //    alert(PicturePath)
        const datadate='testdatalinst.png';
        var Url = 'http://192.168.10.110:8080/api/uploadFile';
        let body = new FormData();
        body.append('file', { uri: PicturePath, name:datadate, 
        filename: 'imageName.png', type: 'image/png'}
        );
        body.append('Content-Type', 'image/png');
        fetch(Url, {
          method: 'POST', headers: {
            "Content-Type": "multipart/form-data",
            "otherHeader": "foo",
          }, body: body
        })
          .then((response) =>{
                this.PostDataFuncion(datadate);
            console.log(response);
          } )
          .catch((e) => {
            console.log(e)
          })
      }

      PostDataFuncion(id_im){
     //   ChromeSamples.log('Posting request to GitHub API...');
     opts={
        containernumber:"WHLU5556479",
        sealno:"WHLN553244",
        booking:"0359X30952",
        imageno:id_im,
        datetimeactual:"2019-06-17",
        typetnput:"1",
        size:"40"
     }
        fetch('http://192.168.10.110:8080/api/Postcontainer', {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body:JSON.stringify(opts)
        })
        .then(function(response) { 
                return response.json();
        })
        .then(function() {
                ChromeSamples.log(response.json());
        })
        .catch((e) => {
            console.log(e)
          })

      }
    //     <Text onPress={this.UpfilePicture(this.state.Imagedata)}  style={{fontSize:14,color:'red'}}>บันทึก</Text>
    render() {

        return (
            <View style={styles.container}>
                {/* <Text style={{ fontSize: 18, color: 'red' }}>{this.state.Imagedata} {pramar.dataType}</Text> */}

                {/* <Button
          onPress={() =>this.UpfilePicture(this.state.Imagedata)}
          title="Press Me"
        /> */}
                {/* <Image source={{ uri: this.state.Imagedata }} style={{ height: 200, width: null, flex: 1 }} /> */}
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
                <View style={{ flex: 0, flexDirection: 'row', justifyContent: 'center' }}>
                    <TouchableOpacity onPress={this.takePicture.bind(this)} style={styles.capture}>
                        <Text style={{ fontSize: 14 }}> ถ่าย </Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
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
            console.log(data.uri);
            this.UpfilePicture(data.uri)
        //     this.setState({
        //         Imagedata: data.uri
        //     }, function () {
        //    //     this.UpfilePicture(data.uri)
        //         // this.props.navigation.navigate('Poto')

        //         // navigate('Poto', { ImagePoto: this.state.Imagedata, typeimage: data_params.dataType })
        //         //alert(''+this.state.Imagedata);
        //     })
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
        backgroundColor: '#fff',
        borderRadius: 5,
        padding: 15,
        paddingHorizontal: 20,
        alignSelf: 'center',
        margin: 20,
    },
});
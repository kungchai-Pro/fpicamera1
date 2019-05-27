
import React, { Component } from 'react';
import { AppRegistry, StyleSheet, Text, TouchableOpacity, View, Image ,Button,Alert} from 'react-native';
import { RNCamera } from 'react-native-camera';
import { thisExpression } from '@babel/types';

export default class App extends Component {
  constructor(prop) {
    super(prop)
    this.state = {
      Imagedata: ''
    }
  }


  UpfilePicture(PicturePath) {
    var Url = 'http://192.168.0.19:8080/uploadFile';
    let body = new FormData();
    body.append('file', { uri: PicturePath, name: 'photo.png', 
    filename: 'imageName.png', type: 'image/png' });
    body.append('Content-Type', 'image/png');
    fetch(Url, {
      method: 'POST', headers: {
        "Content-Type": "multipart/form-data",
        "otherHeader": "foo",
      }, body: body
    })
      .then((response) => response.json())
      .then((responseData) => {
        alert(responseData);
        //console.log(responseData.data);
      })
      .catch((e) => {
        console.log(e)
      })
  }
   //     <Text onPress={this.UpfilePicture(this.state.Imagedata)}  style={{fontSize:14,color:'red'}}>บันทึก</Text>
  render() {
    return (
      <View style={styles.container}>
        <Text style={{ fontSize: 18, color: 'red' }}>{this.state.Imagedata}</Text>

                <Button
          onPress={() =>this.UpfilePicture(this.state.Imagedata)}
          title="Press Me"
        />
        <Image source={{ uri: this.state.Imagedata }} style={{ height: 200, width: null, flex: 1 }} />
        
        <RNCamera
          ref={ref => {
            this.camera = ref;
          }}
          style={styles.preview}
          type={RNCamera.Constants.Type.back}
          flashMode={RNCamera.Constants.FlashMode.on}
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
            <Text style={{ fontSize: 14 }}> SNAP </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
  takePicture = async function () {
    if (this.camera) {
      const options = { quality: 0.5, base64: true };
      const data = await this.camera.takePictureAsync(options);
      console.log(data.uri);
      this.setState({
        Imagedata: data.uri
      })
    }
  };
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
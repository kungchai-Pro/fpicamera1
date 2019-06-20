import React, { Component } from 'react';
import { Modal, Text, TouchableHighlight, View, Alert,StyleSheet,FlatList } from 'react-native';
import { RNCamera } from 'react-native-camera';
const INITIAL_STATE = {
  list: []
};
export default class ModalExample extends React.Component {
  state = {
    modalVisible: false,
    list:[],
    ...INITIAL_STATE,
  };

  setModalVisible(visible) {
    this.setState({ modalVisible: visible });
  }

  resetdata(){
      this.setState({ ...INITIAL_STATE });

  }

  render() {

    return (
      <View style={{ marginTop: 22 }}>
        <Modal
          animationType="slide"
          transparent={false}
          visible={this.state.modalVisible}
          onRequestClose={() => {
            Alert.alert('Modal has been closed.');
          }}>


          <View style={{ marginTop: 2 ,flex:1}}>
            
              <View style={{flex:1}}>
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
                <TouchableHighlight onPress={this.takePicture.bind(this)} style={styles.capture}>
                  <Text style={{ fontSize: 14 }}> ถ่าย </Text>
                </TouchableHighlight>
              </View>


              {/* <TouchableHighlight
                onPress={() => {
                  this.setModalVisible(!this.state.modalVisible);
                }}>
                <Text>Hide Modal</Text>
              </TouchableHighlight> */}
            </View>
         
        </Modal>

        <TouchableHighlight
          onPress={() => {
            this.setModalVisible(true);
          }}>
          <Text>Show Modal</Text>
        </TouchableHighlight>

        <TouchableHighlight
          onPress={() => {
            this.resetdata(true);
          }}>
          <Text>Show resetData</Text>
        </TouchableHighlight>
        {
            this.state.list.map(item => (
              <View key={item.id}>
                <Text>{item.id}</Text>
            <Text>{item.uris}</Text>
            </View>
          ))
        }

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
      //add data  to array
      this.state.list.push({id:'1',uris:data.uri})
        this.setModalVisible(!this.state.modalVisible);
      console.log(list[3].age)
       
      // this.setState({
      //     Imagedata: data.uri
      // }, function () {
      //     // this.props.navigation.navigate('Poto')

      //     navigate('Poto', { ImagePoto: this.state.Imagedata, typeimage: data_params.dataType })
      //     //alert(''+this.state.Imagedata);
      // })
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
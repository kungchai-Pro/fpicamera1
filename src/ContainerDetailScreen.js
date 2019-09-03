import React from 'react';
import { Platform, StyleSheet, View, FlatList, Image, TextInput, Alert } from 'react-native';
import { Urlimage } from './component/confingURL'
import { listId, EditdataContainer } from './component/potoSave';

import {
    Container, Text, Card, CardItem, Content, Spinner, Button, Form, Picker, Right
} from 'native-base';

export default class ContainerDetailScreen extends React.Component {
    static navigationOptions = {
        title: 'ข้อมูลรถ',
    };
    constructor(props) {
        super(props)
        this.state = {
            ListData: [],
            Urlimages: null,
            loading: true,

            data_containerNO: null,
            data_sealNo: null,
            data_booking: null,
            data_typeinput: '',
            data_potoImage: null,
            data_typeImage: null,
            data_sizeCn: null,
            data_datetime: null,
            data_id_No: null
        }

    }

    async componentDidMount() {

        console.disableYellowBox = true;
        const data_params = this.props.navigation.state.params;
        console.log(data_params.Idcon);
        await listId(data_params.Idcon).then((data) => {
            console.log(data);
            this.setState({
                data_containerNO: data.containerNO,
                data_sealNo: data.sealNo,
                data_booking: data.booking,
                data_typeinput: data.typeinput,
                data_potoImage: data.potoImage,
                data_typeImage: data.typeImage,
                data_sizeCn: data.sizeCn,
                data_datetime: data.datetime,
                data_id_No: data.id_No,
                loading: false
            })
        })
    }

    onValueChange(value) {
        this.setState({
            data_typeinput: value
        });
    }

    eDitData() {

        const data_state = {
            "data_containerNOs": this.state.data_containerNO, "data_sealNos": this.state.data_sealNo,
            "data_bookings": this.state.data_booking, "data_typeinputs": this.state.data_typeinput,
            "data_potoImages": this.state.data_potoImage, "data_typeImages": this.state.data_typeImage,
            "data_sizeCns": this.state.data_sizeCn, "data_datetimes": this.state.data_datetime,
            "data_id_Nos": this.state.data_id_No
        }

        EditdataContainer(data_state).then((data) => {
            console.log(data)
            this.datasento();
        }).catch((error) => {
            console.error(error);
            alert(error);
        });
        
    }

    datasento(){
        const { navigate } = this.props.navigation;
        navigate('Screenlode')
    }


    render() {
        const dataurl = Urlimage();

        if (this.state.loading == true) {
            return (
                <Container>

                    <View style={{ alignItems: 'center', justifyContent: 'center', flex: 1 }}>
                        <Spinner color='green' />
                    </View>
                </Container>
            )
        }
        else if(this.state.loading == false){
            const {
                data_containerNO, data_sealNo, data_booking, data_typeinput, data_potoImage, data_datetime, data_id_No
            } = this.state;
            return (
                <Container >
                    <Content>
                        <Card>

                            <CardItem cardBody style={{ margin: 2 }}>
                                <Image source={{ uri: dataurl + '' + data_potoImage }} style={{ resizeMode: 'contain', height: 200, width: null, flex: 1 }} />
                            </CardItem>

                            <CardItem>
                                <View style={{ flexDirection: 'row', margin: 1, flex: 1 }}>
                                    <View style={{ flex: 1, backgroundColor: '#eeeeee' }}>
                                        <Text style={styles.fontzin14}>container {data_containerNO}</Text>
                                    </View>
                                    <View style={{ flex: 1, backgroundColor: '#eeeeee' }}>
                                        <Text>
                                            <Text style={styles.fontzin14}>รหัส {data_id_No}</Text>
                                        </Text>
                                    </View>
                                </View>
                            </CardItem>
                        </Card>

                        <View style={{ flex: 1, backgroundColor: '#e3f2fd' }}>
                            <Text style={styles.fontzin12}>booking {data_booking}</Text>
                            <Text style={styles.fontzin12}>seal {data_sealNo}</Text>
                            <Text style={styles.fontzin12}>สถานะ {data_typeinput}</Text>
                            <Text style={styles.fontzin12}>วันที่/เวลา {data_datetime}</Text>
                        </View>
                        <View style={{ margin: 10, padding: 5 }}>
                            <View style={{ flexDirection: 'row-reverse' }}>
                                <Form>
                                    <Picker
                                        note
                                        mode="dropdown"
                                        style={{ width: 120 }}
                                        selectedValue={data_typeinput}
                                        onValueChange={this.onValueChange.bind(this)}
                                    >
                                        <Picker.Item label="เลือกสถานะ เข้า/ออก" value={data_typeinput} />
                                        <Picker.Item label="เข้า" value="IN" />
                                        <Picker.Item label="ออก" value="OUT" />
                                    </Picker>
                                </Form>
                            </View>
                            <Text style={styles.fontzin12}>input Container</Text>
                            <TextInput
                                style={{ height: 40, borderColor: 'gray', borderWidth: 1, margin: 2, borderRadius: 20 }}
                                placeholder="input  containner"
                                onChangeText={(text) => this.setState({ data_containerNO: text })}

                                value={data_containerNO}
                            />
                            <Text style={styles.fontzin12}>input seal</Text>
                            <TextInput
                                style={{ height: 40, borderColor: 'gray', borderWidth: 1, margin: 2, borderRadius: 20 }}
                                placeholder="input  seal"
                                onChangeText={(text) => this.setState({ data_sealNo: text })}
                                value={data_sealNo}
                            />
                            <Text style={styles.fontzin12}>input booking</Text>
                            <TextInput
                                style={{ height: 40, borderColor: 'gray', borderWidth: 1, margin: 2, borderRadius: 20 }}
                                placeholder="input  booking"
                                onChangeText={(text) => this.setState({ data_booking: text })}
                                value={data_booking}
                            />

                            <Button block info onPress={() => this.eDitData()}>
                                <Text>แก้ไข</Text>
                            </Button>

                        </View>
                    </Content>
                </Container>
            );
        }//end else if
    }
}

const styles = StyleSheet.create({
    fontzin12: {
        fontSize: 12,
        color: '#424242',
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
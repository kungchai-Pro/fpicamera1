import React from 'react';
import { Platform, StyleSheet, View, FlatList, Image } from 'react-native';
import { Urlimage } from './component/confingURL'
import { listId } from './component/potoSave';

import {
    Container, Header, Tab, Tabs, TabHeading, Icon, ScrollableTab, Text,
    List, ListItem, Left, Right, Button, Thumbnail, Body, Card, CardItem, Content, Spinner
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
            loading: true
        }
    }

    async componentDidMount() {
        console.disableYellowBox = true;
        const data_params = this.props.navigation.state.params;
         console.log(data_params.Idcon);
        // alert(data_params.Idcon);
        listId(data_params.Idcon).then((data) => {
            console.log(data);
            this.setState({
                ListData: data,
                loading: false
            })
        })
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
        else {
            // console.log(dataurl);
            return (
                <Container >
                    <View style={{ backgroundColor: '#546e7a' }}>
                        <Text style={{ marginLeft: 10 }}>รายงานข้อมูล </Text>
                    </View>
                    <Content>
                        {
                            this.state.ListData.map((data) => {
                                return (
                                    <Card key={data.id_No}>

                                        <CardItem cardBody style={{ margin: 2 }}>

                                            <Image source={{ uri: dataurl + '' + data.potoImage }} style={{ resizeMode:'contain',height: 200, width: null, flex: 1 }} />
                                            {/* <Text>{dataurl+''+data.potoImage}</Text> */}
                                        </CardItem>

                                        <CardItem>
                                            <View style={{ flexDirection: 'row', margin: 1, flex: 1 }}>
                                                <View style={{ flex: 1, backgroundColor: '#eeeeee' }}>
                                                    <Text style={styles.fontzin14}>container {data.containerNO}</Text>
                                                </View>
                                                <View style={{ flex: 1, backgroundColor: '#eeeeee' }}>
                                                    <Text>
                                                        <Text style={styles.fontzin14}>ภาพ {data.typeImage}</Text>
                                                    </Text>
                                                </View>
                                            </View>
                                        </CardItem>
                                        <View style={{ flex: 1 }}>
                                            <Text style={styles.fontzin12}>booking {data.booking}</Text>
                                            <Text style={styles.fontzin12}>seal {data.sealNo}</Text>
                                            <Text style={styles.fontzin12}>สถานะ {data.typeinput}</Text>
                                            <Text style={styles.fontzin12}>วันที่/เวลา {data.datetime}</Text>
                                        </View>

                                    </Card>
                                )
                            })
                        }
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
import React from 'react';
import { Platform, StyleSheet, View, FlatList, Image, TextInput, Alert ,Text} from 'react-native';
import { Container, Header, Content, Spinner } from 'native-base';

export default class loadeding extends React.Component {

    static navigationOptions = {
        header: null,
    };

    constructor(props) {
        super(props)
        this.state = {

        }
    }
    componentDidMount(){
        const { navigate } = this.props.navigation;
       
        setTimeout(() => {
            navigate('Edit');
        }, 1500);
    }

    render() {
        return (
            <Container style={{ alignItems: 'center',justifyContent:'center',direction:'center' }}>
                <View>
                    <Spinner color='red' />
                    <Text>Loadeding . . . . .</Text>
                </View>
            </Container>
        )
    }
}


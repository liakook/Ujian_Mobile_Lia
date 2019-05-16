
import React, { Component } from "react";
import { 
    View,
    Text,
    StyleSheet
} from "react-native";
import { Container, Header,Body,Title,Footer } from "native-base";

class Sms extends Component {
    render() {
        const {getParam} = this.props.navigation
        return (
            <Container>
                <Header>        
                    <Body>
                        <Title style={{marginLeft:20}}>{getParam('phone')}</Title>
                    </Body>
                </Header>
                <View style={styles.container}>
                    <Text>SMS Text</Text>
                </View>
                <Footer style={{backgroundColor:'white',height:100}}>
                    <Body>
                        <Title style={{marginLeft:20, color:'black'}}>Dear {getParam('nama')} Hellow, </Title>
                    </Body>
                </Footer>
                <Footer style={{backgroundColor:'white',height:100}}>
                    <Body>
                        <Title style={{marginLeft:20, color:'black'}}> Your upcoming shift is on {getParam('shift')} </Title>
                    </Body>
                </Footer>
            </Container>
        );
    }
}
export default Sms;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
});
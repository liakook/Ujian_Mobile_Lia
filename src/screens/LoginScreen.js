import React, { Component } from 'react';
// Activity Indicator untuk melihat loadingnya
import { View, ActivityIndicator } from 'react-native'
import { Container, Header, Content, Form, Item, Input, Label , Body , Title , Button, Text} from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome'
import {connect} from 'react-redux'
import { Fire } from './../support/firebase'
import { StackActions, NavigationActions } from 'react-navigation'
// import global state, supaya ketika ditutup app.nya dan dibuka lagi masih login!
import { onLoginSuccess } from './../2.Actions'

class LoginScreen extends Component {
  // ke trigger terus selama ada perubahan authenctication. user msh login ato tdk!
  state = {loading : true, error:''}

componentDidUpdate(){
  if(this.props.bebas){
    // stackReset untuk redirect!
    const stackReset = StackActions.reset({
        index : 0,
        actions : [NavigationActions.navigate({routeName : 'home'})]
    })
    this.props.navigation.dispatch(stackReset)
    this.setState({loading : false})
  }
}

componentDidMount(){
  // .onAuthStateChanged untuk cek user login atau belum!
  Fire.auth().onAuthStateChanged((user)=> {
    if(user){
      this.props.onLoginSuccess(user.email,user.uid)
  }else{
    this.setState({loading : false})
  }
})
}

onBtnLoginClick = () => {
  this.setState({loading : true})
  const auth = Fire.auth()
  auth.signInWithEmailAndPassword(this.InputEmail,this.InputPassword)
  .then((val)=>{
      var {uid,email} = val.user
      console.log(uid)
      this.props.onLoginSuccess(email,uid)
  })
  .catch((err)=>{
      this.setState({error : err.message, loading:false})
  })
}

  render() {
    if(this.state.loading){
      return(
        <View style={{flex : 1, justifyContent : 'center', alignContent : 'center'}}>
          <ActivityIndicator size='large' color='blue' />
        </View>
      )
    }
    console.disableYellowBox = true
    return (
      <Container>
        <Header>
                <Body>
                    <Title style={{marginLeft : 15}}> Log In {this.props.bebas}</Title>
                </Body>
        </Header>
        <Content>
          <Form>
            <Item floatingLabel>
              <Input onChangeText={(text)=>this.InputEmail = text} placeholder="Username / Email" />
            </Item>
            <Item floatingLabel last>
              <Input onChangeText={(text)=>this.InputPassword = text} placeholder="Password" />
            </Item>
            <Button onPress={this.onBtnLoginClick} style={{marginTop : 20, marginHorizontal : 15}} block>
              {
                this.state.loading
                ?
                <ActivityIndicator size="small" color="purple" />
                :
                <Text>Log In</Text>
              }
            </Button>

            <View style={{flexDirection : 'row',justifyContent : 'center', marginTop : 15}}>
                <View style={{height : 60 , width : 60 }}>
                    <Icon name='facebook' size={40} />
                </View>
                <View style={{height : 60 , width : 60  }}>
                    <Icon name='google' size={40} />
                </View>
                <View style={{height : 60 , width : 60  }}>
                    <Icon name='twitter' size={40}/>
                </View>
            </View>
                
            <View style={{flexDirection : 'row', justifyContent: "center", marginTop : 30}}>
                <Text onPress={() => this.props.navigation.navigate('register')}>Does not have an account? Register</Text>
            </View>

            {this.state.error 
              ?
                <View style={{paddingVertical:15, backgroundColor: 'red', marginHorizontal :15}}>
                    <View style={{position:'absolute', top:3, right:3}}>
                        <Icon  name='close-circle' fontSize={7} color = 'black' onPress={()=>this.setState({error:''})}/>
                    </View>    
                        <Text style={{color:'black',alignSelf:'center'}}>{this.state.error}</Text>
                </View>
              :
                null
            }

          </Form>
        </Content>
      </Container>
    );
  }
}

// mapStateToProps hanya menerima satu parameter!
const mapStateToProps = (state) => {
  return{
    bebas : state.auth.email
  }
}


export default connect(mapStateToProps,{onLoginSuccess})(LoginScreen)
import React, { Component } from 'react';
import { View } from 'react-native'
import {Text ,Container, Header, Content, Form, Item, Input, Label,Button ,Picker,Left,Right, Body, Title } from 'native-base';
import { Fire } from './../support/firebase'
import { connect } from 'react-redux'

class EditEmployee extends Component {
    state = {
        selected : '',
        data : {} , 
        idEdit : null}

    componentDidMount () {
    var id = this.props.id
    var manager = Fire.database().ref('manager/users/' + id+'/employee')
    manager.on('value', (Item)=>{
        this.setState({data:(Item.val())})
    },(err)=>{
        console.log(err)
    })
    }
  
    onBtnSaveClick = () => {
      var nama = ''
      var phone = ''
      var shift = ''
      if (this.InputNama){
          nama = this.InputNama
      }else {
          nama=this.state.data[this.state.idEdit].nama
      }
      if (this.InputPhone){
          phone = this.InputPhone
      }else {
          phone=this.state.data[this.state.idEdit].phone
      }
      if (this.state.selected!==''){
          shift = this.state.selected
      }else {
          shift=this.state.data[this.state.idEdit].shift
      }

      Fire.database().ref('manager/'+this.props.id.id+'/employee/'+this.state.idEdit).set({
          nama:nama,
          phone:phone,
          shift:shift
      })
      .then((res)=>{
          this.setState({selected:''})
          alert('Employee Data Changed')
      })
      .catch((err)=>console.log(err))
  }

  render() {
    return (
      <Container>
        <Header>        
          <Body>
              <Title style={{marginLeft:20, color:'purple'}}>Edit</Title>
          </Body>
        </Header>
        <Content>
            <View style={{flexDirection : 'row' , justifyContent : 'space-between'}}>
                <View style={{paddingTop : 15, paddingLeft : 15}}>
                    <Text> Select Data </Text>
                </View>
                <View>
                    <Picker 
                    style={{width : 200}} 
                    mode ='dropdown' 
                    selectedValue={this.state.idEdit}
                    onValueChange={(val) => this.setState({idEdit : val}) } >
                        <Picker.Item label='Select Name' value={null} />
                        {this.state.data
                          ?
                            Object.keys(this.state.data).map(val => {
                                return(
                                    <Picker.Item label={this.state.data[val].nama} value={val} />
                                )
                            })
                          :
                          <Picker.Item label= 'Data is Empty!' value={null}/>
                        }
                    </Picker>
                </View>
            </View>
          <Form>
            <Item stackedLabel>
              <Label>Nama</Label>
              {/* // kalau ada idEdit pakai ini (this.state.data[this.state.idEdit].nama), kalo ga ada pake null! */}
              <Input onChangeText={(text)=>this.InputNama = text} defaultValue={this.state.idEdit ? this.state.data[this.state.idEdit].nama : null} />
            </Item>
            <Item stackedLabel>
              <Label>Phone</Label>
              <Input onChangeText={(text)=>this.InputPhone = text} defaultValue={this.state.idEdit ? this.state.data[this.state.idEdit].phone : null} />
            </Item>
            <Item last>
                <Left>
                    <Label>Select Day</Label>
                </Left>
                <Right>
                    <Picker 
                    // untuk mengubah value pake fn onValueChange
                        style={{ width:120}}  
                        mode="dropdown"
                        selectedValue={this.state.idEdit? this.state.data[this.state.idEdit].shift : this.state.selected}
                        onValueChange={(value) => this.setState({selected : value})}>
                    <Picker.Item label='Monday' value='Mon' />
                    <Picker.Item label='Tuesday' value='Tue' />
                    <Picker.Item label='Wednesday' value='Wed' />
                    <Picker.Item label='Thursday' value='Thu' />
                    <Picker.Item label='Friday' value='Fri' />
                    <Picker.Item label='Saturday' value='Sat' />
                    <Picker.Item label='Sunday' value='Sun' />
                    </Picker>
                </Right>
            </Item>
            <Button style={{marginTop : 20, marginHorizontal : 15}} onPress={this.onBtnSaveClick} block>
                <Text>Save</Text>
            </Button>
          </Form>
        </Content>
      </Container>
    );
  }
}

const mapStateToProps = (state) => {
  var {id} = state.auth
  return{
    id : id
  }
}
// const mapStateToProps = (state) => {
//   return {
//       user : state.auth
//   }
// }
export default connect(mapStateToProps)(EditEmployee)

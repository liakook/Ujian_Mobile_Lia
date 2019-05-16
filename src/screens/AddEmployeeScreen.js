import React, { Component } from 'react';
import {Text ,Container, Header, Content, Form, Item, Input, Label,Button ,Picker,Left,Right, Body, Title } from 'native-base';
import { Fire } from './../support/firebase'
import { connect } from 'react-redux'

class AddEmployee extends Component {
    state = {selected : 'Monday'}
    onBtnAddClick = () => {
      var nama = this.inputNama
      var phone = this.inputPhone
      var shift = this.state.selected
      var id = this.props.id
      Fire.database().ref('manager/users/' + id+'/employee').push({
        nama,phone,shift
      })
      .then((val) => {
        alert('Employee Added')
      })
      .catch((err) => console.log(err))
    }
  render() {
    return (
      <Container>
        <Header />
        <Content>
          <Form>
            <Item floatingLabel>
              <Label>Nama</Label>
              <Input onChangeText={(text) => this.inputNama = text} />
            </Item>
            <Item floatingLabel last>
              <Label>Phone</Label>
              <Input onChangeText={(text) => this.inputPhone = text} />
            </Item>
            <Item>
                <Left>
                    <Label>Select Day</Label>
                </Left>
                <Right>
                    <Picker 
                        style={{ width:120}}  
                        mode="dropdown"
                        selectedValue={this.state.selected}
                        onValueChange={(value) => this.setState({selected : value})}>
                    <Picker.Item label='Monday' value='Monday' />
                    <Picker.Item label='Tuesday' value='Tuesday' />
                    <Picker.Item label='Wednesday' value='Wednesday' />
                    <Picker.Item label='Thursday' value='Thursday' />
                    <Picker.Item label='Friday' value='Friday' />
                    </Picker>
                </Right>
            </Item>
            <Button onPress={this.onBtnAddClick} style={{marginTop : 20, marginHorizontal : 15}} block>
                <Text>Add Employee</Text>
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

export default connect(mapStateToProps)(AddEmployee);

// ====


// class AddEmployee extends Component {
//     state = {selected : ''}

//     onBtnAddClick = () => {
//       var db = Fire.database()
//       var add = db.ref('manager/'+this.props.user.id+'/employee')
//       {
//           this.InputNama&&this.InputPhone&&this.state.selected
//           ?
//           add.push({
//               nama: this.InputNama ,
//               phone:this.InputPhone,
//               shift:this.state.selected
//           })
//           .then((res)=>{
//               alert('Employee Added')
//           })
//           .catch((err)=>console.log(err.message))
//           :
//           alert('All Field Need to be Filled')
//       }

//       // var nama = this.inputNama
//       // var phone = this.inputPhone
//       // var shift = this.state.selected
//       // // var id = this.props.id
//       // {
//       //   this.InputNama&&this.state.selected&&this.InputPhone
//       //   ?
//       //   Fire.database().ref('manager/' + this.props.user.id + '/employee').push({
//       //     nama, phone, shift
//       //   })
//       //   .then((val) => {
//       //     alert('Employee Added')
//       //   })
//       //   .catch((err) => console.log(err.message))
//       //   :
//       //   alert('All Field Need to be Filled!')
//       // }
//     }

//   render() {
//     return (
//       <Container>
//         <Header>
//           <Body>
//               <Title style={{marginLeft:20}}>Add Employee</Title>
//           </Body>
//         </Header>
//         <Content>
//           <Form>
//             <Item floatingLabel>
//               <Label>Nama</Label>
//               <Input onChangeText={(text) => this.inputNama = text} />
//             </Item>
//             <Item floatingLabel last>
//               <Label>Phone</Label>
//               <Input onChangeText={(text) => this.inputPhone = text}/>
//             </Item>
//             <Item>
//                 <Left>
//                     <Label>Select Days</Label>
//                 </Left>
//                 <Right>
//                     <Picker 
//                      // untuk mengubah value pake fn onValueChange
//                         style={{ width:120}}  
//                         mode="dropdown"
//                         selectedValue={this.state.selected}
//                           onValueChange={(bebas) => this.setState({selected : bebas})}>
//                       <Picker.Item label='Days' value='Choose Day'/> 
//                       <Picker.Item label='Monday' value='Monday' />
//                       <Picker.Item label='Tuesday' value='Tuesday' />
//                       <Picker.Item label='Wednesday' value='Wednesday' />
//                       <Picker.Item label='Thursday' value='Thursday' />
//                       <Picker.Item label='Friday' value='Friday' />
//                     </Picker>
//                 </Right>
//             </Item>
//             <Button onPress={this.onBtnAddClick} style={{marginTop : 20, marginHorizontal : 15}} block>
//                 <Text>Add Employee</Text>
//             </Button>
//           </Form>
//         </Content>
//       </Container>
//     );
//   }
// }

// const mapStateToProps = (state) => {
//   // return{
//   //   uid : state.auth.uid
//   // }
//   // destructuring .state.auth seperti dibawah :, id dari global state!
//   // var {id} = state.auth
//   return{
//     user : state.auth
//   }
// }

// export default connect(mapStateToProps)(AddEmployee);
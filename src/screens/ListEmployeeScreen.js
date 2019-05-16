import React, { Component } from 'react';
import Icon from 'react-native-vector-icons/FontAwesome'
import { Container, Header, Content, List, ListItem, Text,Left , Right } from 'native-base';
import { Fire } from './../support/firebase'
import { connect } from 'react-redux'


class ListEmployee extends Component {
    state = { 
      data : {}  
    }

    componentDidMount () {
      // var db = Fire.database()
      // var manager = db.ref('manager/'+this.props.user.id+'/employee')
      // var nama = this.inputNama
      // var phone = this.inputPhone
      // var shift = this.state.selected
      var id = this.props.id
      var manager = Fire.database().ref('manager/users/' + id+'/employee')
      manager.on('value', (Item)=>{
          this.setState({data:(Item.val())})
      },(err)=>{
          console.log(err.message)
      })
    }

  render() {
    console.disableYellowBox = true
    return (
      <Container>
        <Header />
        <Content>
          <List>
          {/* Val di console.log cuma dpt ID saja */}
          {/* Object.keys itu untuk mencari object di dalamnya kemudian bisa di .map */}
            
            { 
              this.state.data
              ?
              Object.keys(this.state.data).map(val => {
                return(
                    <ListItem onPress={() => this.props.navigation.navigate('detail',{
                      nama : this.state.data[val].nama,
                      shift : this.state.data[val].shift,
                      phone : this.state.data[val].phone
                    })}>
                        <Left>
                            <Text>{this.state.data[val].nama}</Text>
                        </Left>
                        <Right>
                            <Icon name='chevron-right' size={24}/>
                        </Right>
                    </ListItem>
                )
            })
            :
            <Text>Employee Data Empty</Text>
                
            }
          </List>
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

export default connect(mapStateToProps)(ListEmployee)
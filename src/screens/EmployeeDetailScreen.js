import React, { Component } from "react";
import { 
    View,
    Text,
    StyleSheet,
    Button,
    Alert
} from "react-native";
import { Fire } from './../support/firebase'
import { connect } from 'react-redux'

class EmployeeDetail extends Component{
    delete = (key) => {
        Fire.database().ref('manager/users/'+this.props.id.id+'/employee').child(key).remove()
        .then((res)=>{
            alert('Employee Deleted')
            this.props.navigation.navigate('list')
        })
        .catch((err)=>{
            alert(err.message)
        })
    }
    deleteEmployee=(id,name)=>{
        alert(id)
        Alert.alert('Delete Employee', 'Do you want to delete '+name+' ?',  [{text : 'Yes, delete this name', onPress :()=> this.delete(id)}, {text : 'Cancel'}]);
    }

    render(){
        const {getParam} = this.props.navigation
        return(
            <View style={styles.container}>
                <Text>{getParam('nama')}</Text>
                <Text>{getParam('shift')}</Text>
                <Text>{getParam('phone')}</Text>
                <Button title='Delete Employee' onPress={()=>this.deleteEmployee(getParam('key'), getParam('nama'))} />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
});

const mapStateToProps = (state) => {
    var {id} = state.auth
    return{
      id : id
    }
  }
// const mapStateToProps = (state) => {
//     return {
//         user : state.auth
//     }
// }

export default connect(mapStateToProps)(EmployeeDetail);

// import MapView,{Marker} from 'react-native-maps'
// const styles = StyleSheet.create({
//     container: {
//         ...StyleSheet.absoluteFillObject,
//         flex : 1
//     },
//     map: {
//         ...StyleSheet.absoluteFillObject,
//     },
// });

// class Pemesanan extends Component {
//     state = {location : null}
//     onBtnClick = () => {
//         navigator.geolocation.getCurrentPosition(value => {
//             console.log(value)
//             this.setState({location : {
//                 latitude : value.coords.latitude,
//                 longitude : value.coords.longitude,
//                 latitudeDelta: 0.015,
//                 longitudeDelta: 0.0121
//             }})
//         }, err => {
//             console.log(err)
//         })
//     }
    
//     render() {
        // latitude/longitude delta itu adl radius
//         const initial = {
//             latitude: 37.78825,
//             longitude: -122.4324,
//             latitudeDelta: 0.015,
//             longitudeDelta: 0.0121,
//         }
//         const obj = this.state.location ? this.state.location : initial
//         return (
//             <View style={styles.container}>
//                 <View style={{marginTop : 30 , zIndex : 1}}>
//                     <Button title='Get Current Location' onPress={this.onBtnClick}/>
//                 </View>
//                 <MapView
//                 style={styles.map}
//                 region={obj}
//                 >

//                 <Marker coordinate={obj}/>
//                 </MapView>
//             </View>
//         );
//     }
// }
// export default Pemesanan;


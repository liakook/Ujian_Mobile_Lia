
import { createStackNavigator,createAppContainer,createBottomTabNavigator,createMaterialTopTabNavigator } from 'react-navigation'
import LoginScreen from '../screens/LoginScreen';
import Register from '../screens/RegisterPage';
import EmployeeDetail from '../screens/EmployeeDetailScreen';
import MenuAccountSetting from '../screens/MenuAccountSetting'
import EditEmployeeScreen from '../screens/EditEmployeeScreen';
import Menu from '../screens/MenuStack';
import AddEmployeeScreen from '../screens/AddEmployeeScreen';
import ListEmployeeScreen from '../screens/ListEmployeeScreen'
import SmsPurpose from '../screens/smsPurpose';

const AccountSetting = createStackNavigator({
    menu : MenuAccountSetting,

})

const StackBeranda = createStackNavigator({
     // Menu untuk menampung semua button : addEmp, editEmp, listEmp

    MenuStack : Menu,
    add : AddEmployeeScreen,
    edit : EditEmployeeScreen,
    list : ListEmployeeScreen,
    detail : EmployeeDetail,
    sms : SmsPurpose

}, {
    headerMode : 'none'
})

// UNTUK MENGHILANGKAN TAB TAB DI ROUTE TERTENTU! KITA MAU HILANGKAN DI TAB SELAIN HOMETAB
StackBeranda.navigationOptions = ({navigation}) => {
    let tabBarVisible = false

    let routeName = navigation.state.routes[navigation.state.index].routeName
    if(routeName == 'MenuStack'){
        tabBarVisible = true
    }
    return{
        tabBarVisible
    }
}

const HomeTab = createMaterialTopTabNavigator({
    // di beranda ada stack navigator maka harus di create Stack Navigator
    home : StackBeranda,
    account : AccountSetting
} , 
{
    tabBarPosition : 'bottom',
    swipeEnabled : false
}) 

const StackRoot = createStackNavigator({
    // di home ada tab navigator, maka harus di create tab navigator
    login : LoginScreen,
    register : Register,
    home : HomeTab
},{
    headerMode : 'none',
    // initialRouteName : 'home'
})

export const StackContainer = createAppContainer(StackRoot)
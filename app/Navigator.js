import React, {Component, PureComponent} from 'react';
import {View, Text, Image} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Login from './screens/auth/Login';
import HelpSteps from './screens/HelpSteps';
import Landing from './screens/Landing';
import Home from './screens/user/Home';
import Chat from './screens/chat/Chat';
import Custom from './screens/user/Custom';
import AddClient from './screens/client/AddClient';
import EditClient from './screens/client/EditClient';
import AllClients from './screens/client/AllClients';
import Search from './screens/user/Search';
import UserDetail from './screens/user/UserDetail';
import Cart from './screens/cart/Cart';
import Quotes from './screens/quotes/Quotes';
import Orders from './screens/orders/Orders';
import Users from './screens/user/Users';
import RecentOrders from './screens/orders/RecentOrders';
import AddOrder from './screens/orders/AddOrder';
import AllQuotes from './screens/quotes/AllQuotes';
import AddQuote from './screens/quotes/AddQuote';
import AllUsers from './screens/user/AllUsers';
import RecentProducts from './screens/products/RecentProducts';
import AllProducts from './screens/products/AllProducts';
import Quote from './screens/quotes/Quote';
import UploadOrderWithFile from './screens/orders/UploadOrderWithFile';
import Clients from './screens/client/Clients';
import Client from './screens/client/Client';
import AddOrderQuote from './screens/orders/AddOrderQuote';
import OrderDetail from './screens/orders/OrderDetail';
import UploadedOrders from './screens/orders/UploadedOrders';
import AddProduct from './screens/products/AddProduct';
import Requests from './screens/requests/Requests';
import Notifications from './screens/user/Notifications';
import AddSupportRequest from './screens/requests/AddSupportRequest';
import AddQuoteClient from './screens/common/AddQuoteClient';
import ResourceHub from './screens/user/ResourceHub';
import ChatScreen from './screens/chat/ChatScreen';
import Icon from 'react-native-vector-icons/AntDesign';
// import Icon2 from 'react-native-vector-icons/Entypo';
// import Icon3 from 'react-native-vector-icons/MaterialIcons';
// import Icon4 from 'react-native-vector-icons/MaterialCommunityIcons';
import commonStyles from './commonStyles/commonStyles';
import {HOME, CART, CHAT, SETTING, MAIL} from './constants/Images';
import {PINK_COLOR, WHITE} from './constants/colors';
import Sidebar from './screens/Sidebar';
import {ScaledSheet, moderateScale} from 'react-native-size-matters';

function HomeScreen() {
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Text>Home Screen</Text>
    </View>
  );
}

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();
const Tab = createBottomTabNavigator();

// Stack Navigator inside Tab Navigator  for initial screens
function TabStackNavigator() {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="Tab1" component={Home} />
      <Stack.Screen name="Search" component={Search} />
      <Stack.Screen name="Quotes" component={QuoteStackNavigator} />
      <Stack.Screen name="Clients" component={ClientStackNavigator} />
      <Stack.Screen name="Users" component={UsersStackNavigator} />
      <Stack.Screen name="Orders" component={OrdersStackNavigator} />
      <Stack.Screen name="AddQuote" component={AddQuote} />
      <Stack.Screen name="AddClient" component={AddClient} />
      <Stack.Screen name="Resource" component={ResourceHub} />
      <Stack.Screen name="Products" component={ProductStackNavigator} />
    </Stack.Navigator>
  );
}

function ProductStackNavigator() {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="ProductsStack" component={RecentProducts} />
      <Stack.Screen name="AllProducts" component={AllProducts} />
    </Stack.Navigator>
  );
}

function ClientStackNavigator() {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="ClientStack" component={Clients} />
      <Stack.Screen name="AllClients" component={AllClients} />
      <Stack.Screen name="Client" component={Client} />
      <Stack.Screen name="EditClient" component={EditClient} />
    </Stack.Navigator>
  );
}

function QuoteStackNavigator() {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="QuoteStack" component={Quotes} />
      <Stack.Screen name="AllQuotes" component={AllQuotes} />
      <Stack.Screen name="AddQuote" component={AddQuote} />
      <Stack.Screen name="Quote" component={Quote} />
      <Stack.Screen name="EditQuote" component={AddQuoteClient} />
    </Stack.Navigator>
  );
}

function UsersStackNavigator() {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="UsersStack" component={Users} />
      <Stack.Screen name="AllUsers" component={AllUsers} />
      <Stack.Screen name="UserDetail" component={UserDetail} />
    </Stack.Navigator>
  );
}

function OrdersStackNavigator() {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="OrdersStack" component={Orders} />
      <Stack.Screen name="AddOrder" component={AddOrder} />
      <Stack.Screen name="AddOrderQuote" component={AddOrderQuote} />
    </Stack.Navigator>
  );
}

function ChatStackNavigator() {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="ChatStack" component={Chat} />
      <Stack.Screen name="ChatScreen" component={ChatScreen} />
    </Stack.Navigator>
  );
}

getTabBarVisibility = (route) => {
  const routeName = route.state
    ? route.state.routes[route.state.index].name
    : '';

  if (routeName === 'ChatScreen') {
    return false;
  }

  return true;
};

function TabNavigator() {
  return (
    <Tab.Navigator
      tabBarOptions={{
        showLabel: false,
        activeTintColor: '#FFFFFF',
        inactiveTintColor: '#F8F8F8',
        style: {
          backgroundColor: WHITE,
          height: moderateScale(70),
          borderTopLeftRadius: moderateScale(30),
          borderTopRightRadius: moderateScale(30),
          borderWidth: 1,
          borderColor: WHITE,
        },
        labelStyle: {
          textAlign: 'center',
        },
        indicatorStyle: {
          borderBottomColor: '#87B56A',
          borderBottomWidth: 2,
        },
      }}>
      <Tab.Screen
        name="TabHome"
        options={{
          tabBarIcon: ({color, size}) => (
            <Icon name="home" type="ionicon" size={moderateScale(20)} />
          ),
        }}
        component={TabStackNavigator}
      />
      <Tab.Screen
        options={{
          tabBarIcon: ({color, size}) => (
            <Image source={CART} style={commonStyles.icon} />
          ),
        }}
        name="Cart"
        component={Cart}
      />
      <Tab.Screen
        options={{
          tabBarIcon: ({color, size}) => (
            <Image source={HOME} style={commonStyles.largeIcon} />
          ),
        }}
        name="TabHome3"
        component={TabStackNavigator}
      />
      <Tab.Screen
        name="TabHome4"
        options={({route}) => ({
          tabBarIcon: ({color, size}) => (
            <Image source={CHAT} style={commonStyles.icon} />
          ),
          tabBarVisible: getTabBarVisibility(route),
        })}
        component={ChatStackNavigator}
      />
      <Tab.Screen
        options={{
          tabBarIcon: ({color, size}) => (
            <Image source={MAIL} style={commonStyles.icon} />
          ),
        }}
        name="TabHome5"
        component={Notifications}
      />
    </Tab.Navigator>
  );
}

function DrawerNavigator() {
  return (
    <Drawer.Navigator
      drawerStyle={{
        borderWidth: 1,
        backgroundColor: PINK_COLOR,
        borderColor: PINK_COLOR,
        borderTopRightRadius: moderateScale(25),
        borderBottomRightRadius: moderateScale(25),
      }}
      drawerContent={(props) => <Sidebar {...props} />}>
      <Drawer.Screen name="Drawer" component={TabNavigator} />
    </Drawer.Navigator>
  );
}

function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name="Landing" component={Landing} />
        <Stack.Screen name="Help" component={HelpSteps} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Home" component={DrawerNavigator} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default AppNavigator;

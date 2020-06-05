import React, {Component, PureComponent} from 'react';
import { View, Text, Image } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Login from "./screens/auth/Login";
import HelpSteps from "./screens/HelpSteps";
import Chat from "./screens/chat/Chat";
import Home from "./screens/user/Home";
import Search from "./screens/user/Search";
import Cart from "./screens/cart/Cart";
import Quotes from "./screens/quotes/Quotes";
import ResourceHub from "./screens/user/ResourceHub";
import Icon from 'react-native-vector-icons/AntDesign';
// import Icon2 from 'react-native-vector-icons/Entypo';
// import Icon3 from 'react-native-vector-icons/MaterialIcons';
// import Icon4 from 'react-native-vector-icons/MaterialCommunityIcons';
import commonStyles from './commonStyles/commonStyles';
import {HOME, CART, CHAT, SETTING, MAIL} from './constants/Images';
import {PINK_COLOR, WHITE} from './constants/colors';
import Sidebar from './screens/Sidebar'
import { ScaledSheet, moderateScale } from 'react-native-size-matters';






function HomeScreen() {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Home Screen</Text>
    </View>
  );
}

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();
const Tab = createBottomTabNavigator();

function TabStackNavigator() {
  return (
       <Stack.Navigator  screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Tab1" component={Chat} />
        <Stack.Screen name="Search" component={Search} />
        <Stack.Screen name="Quotes" component={Quotes} />
        <Stack.Screen name="Resource" component={ResourceHub} />
      </Stack.Navigator>
    );
}


function TabNavigator() {
  return (
      <Tab.Navigator tabBarOptions={{
        showLabel: false,
        activeTintColor: '#FFFFFF',
        inactiveTintColor: '#F8F8F8',
        style: {
          backgroundColor: WHITE,
          height : moderateScale(70),
          borderTopLeftRadius: moderateScale(30),
        borderTopRightRadius: moderateScale(30),
        borderWidth : 1,
        borderColor : WHITE
        },
        labelStyle: {
          textAlign: 'center',
        },
        indicatorStyle: {
          borderBottomColor: '#87B56A',
          borderBottomWidth: 2,
        },
      }}>
        <Tab.Screen name="TabHome"  options={{
           tabBarIcon: ({ color, size }) => (
             <Icon name="home" 
      type="ionicon" size={moderateScale(20)} />
           ),
        }}  component={TabStackNavigator} />
        <Tab.Screen options={{
           tabBarIcon: ({ color, size }) => (
             <Image source={CART}
             style={commonStyles.icon} />
           ),
        }} name="Cart" component={Cart} />
        <Tab.Screen options={{
           tabBarIcon: ({ color, size }) => (
             <Image source={HOME} style={commonStyles.largeIcon} />
           ),
        }} name="TabHome3" component={Chat} />
        <Tab.Screen name="TabHome4" options={{
           tabBarIcon: ({ color, size }) => (
             <Image source={CHAT} style={commonStyles.icon} />
           ),
        }} component={Chat} />
        <Tab.Screen options={{
           tabBarIcon: ({ color, size }) => (
             <Image source={MAIL} style={commonStyles.icon} />
           ),
        }} name="TabHome5" component={Chat} />
      </Tab.Navigator>
      );
}

function DrawerNavigator() {
  return (
    <Drawer.Navigator  drawerStyle={{ borderWidth: 1,backgroundColor : PINK_COLOR, borderColor : PINK_COLOR, borderTopRightRadius: moderateScale(25), borderBottomRightRadius: moderateScale(25) }} drawerContent={(props) => <Sidebar {...props} />}>
      <Drawer.Screen name="Drawer" component={TabNavigator} />
     </Drawer.Navigator>
  );
}

function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator   screenOptions={{    headerShown: false }}>
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Home" component={DrawerNavigator} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default AppNavigator;
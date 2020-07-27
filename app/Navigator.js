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
import AllOrders from './screens/orders/AllOrders';
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
import StatusWiseUsers from './screens/user/StatusWiseUsers';
import StatusWiseQuotes from './screens/quotes/StatusWiseQuotes';
import AddQuoteClient from './screens/common/AddQuoteClient';
import ResourceHub from './screens/user/ResourceHub';
import ChatScreen from './screens/chat/ChatScreen';
import Icon from 'react-native-vector-icons/AntDesign';
// import Icon2 from 'react-native-vector-icons/Entypo';
// import Icon3 from 'react-native-vector-icons/MaterialIcons';
// import Icon4 from 'react-native-vector-icons/MaterialCommunityIcons';
import commonStyles from './commonStyles/commonStyles';
import {HOME, CART, CHAT, SETTING, MAIL, CALCULATOR} from './constants/Images';
import {ROUTES} from './constants/routes';
import {PINK_COLOR, WHITE} from './constants/colors';
import Sidebar from './screens/Sidebar';
import {ScaledSheet, moderateScale} from 'react-native-size-matters';
import StatusWiseOrders from './screens/orders/StatusWiseOrders';

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();
const Tab = createBottomTabNavigator();

// Stack Navigator inside Tab Navigator  for initial screens
function TabStackNavigator() {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name={ROUTES.Tab1} component={Home} />
      <Stack.Screen name={ROUTES.Search} component={Search} />
      <Stack.Screen name={ROUTES.Quotes} component={QuoteStackNavigator} />
      <Stack.Screen name={ROUTES.Clients} component={ClientStackNavigator} />
      <Stack.Screen name={ROUTES.Users} component={UsersStackNavigator} />
      <Stack.Screen name={ROUTES.Orders} component={OrdersStackNavigator} />
      <Stack.Screen name={ROUTES.Products} component={ProductStackNavigator} />
      <Stack.Screen
        name={ROUTES.UploadOrders}
        component={UploadOrdersStackNavigator}
      />
      <Stack.Screen
        name={ROUTES.SupportRequests}
        component={RequestsStackNavigator}
      />
    </Stack.Navigator>
  );
}

function UploadOrdersStackNavigator() {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name={ROUTES.UploadOrderStack} component={UploadedOrders} />
      <Stack.Screen name={ROUTES.UploadOrder} component={UploadOrderWithFile} />
    </Stack.Navigator>
  );
}

function RequestsStackNavigator() {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name={ROUTES.RequestsStack} component={Requests} />
    </Stack.Navigator>
  );
}

function ProductStackNavigator() {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name={ROUTES.ProductsStack} component={RecentProducts} />
      <Stack.Screen name={ROUTES.AllProducts} component={AllProducts} />
      <Stack.Screen name={ROUTES.AddProduct} component={AddProduct} />
    </Stack.Navigator>
  );
}

function ClientStackNavigator() {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name={ROUTES.ClientStack} component={Clients} />
      <Stack.Screen name={ROUTES.AllClients} component={AllClients} />
      <Stack.Screen name={ROUTES.AddClient} component={AddClient} />
      <Stack.Screen name={ROUTES.Client} component={Client} />
      <Stack.Screen name={ROUTES.EditClient} component={EditClient} />
    </Stack.Navigator>
  );
}

function QuoteStackNavigator() {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name={ROUTES.QuoteStack} component={Quotes} />
      <Stack.Screen name={ROUTES.Clients} component={ClientStackNavigator} />
      <Stack.Screen name={ROUTES.Users} component={UsersStackNavigator} />
      <Stack.Screen name={ROUTES.Orders} component={OrdersStackNavigator} />
      <Stack.Screen name={ROUTES.Products} component={ProductStackNavigator} />
      <Stack.Screen
        name={ROUTES.UploadOrders}
        component={UploadOrdersStackNavigator}
      />
      <Stack.Screen
        name={ROUTES.SupportRequests}
        component={RequestsStackNavigator}
      />
      <Stack.Screen name={ROUTES.StatusQuotes} component={StatusWiseQuotes} />
      <Stack.Screen name={ROUTES.AllQuotes} component={AllQuotes} />
      <Stack.Screen name={ROUTES.AddQuote} component={AddQuote} />
      <Stack.Screen name={ROUTES.Quote} component={Quote} />
      <Stack.Screen name={ROUTES.EditQuote} component={AddQuoteClient} />
    </Stack.Navigator>
  );
}

function UsersStackNavigator() {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name={ROUTES.UsersStack} component={Users} />
      <Stack.Screen name={ROUTES.AllUsers} component={AllUsers} />
      <Stack.Screen name={ROUTES.UserDetail} component={UserDetail} />
      <Stack.Screen name={ROUTES.StatusUsers} component={StatusWiseUsers} />
    </Stack.Navigator>
  );
}

function OrdersStackNavigator() {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name={ROUTES.OrdersStack} component={Orders} />
      <Stack.Screen name={ROUTES.AddOrder} component={AddOrder} />
      <Stack.Screen name={ROUTES.AddOrderQuote} component={AddOrderQuote} />
      <Stack.Screen name={ROUTES.AllOrders} component={AllOrders} />
      <Stack.Screen name={ROUTES.StatusOrders} component={StatusWiseOrders} />
    </Stack.Navigator>
  );
}

function ChatStackNavigator() {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name={ROUTES.ChatStack} component={Chat} />
      <Stack.Screen name={ROUTES.ChatScreen} component={ChatScreen} />
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

const ChatNull = () => {
  return null;
};

selectedTab = () => {
  alert('hiiiiii');
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
      }}
      initialRouteName={ROUTES.TabHome3}>
      <Tab.Screen
        name={ROUTES.TabHome}
        options={{
          tabBarIcon: ({color, size}) => (
            <Image source={CALCULATOR} style={commonStyles.icon} />
          ),
        }}
        component={QuoteStackNavigator}
      />
      <Tab.Screen
        options={{
          tabBarIcon: ({color, size}) => (
            <Image source={CART} style={commonStyles.icon} />
          ),
        }}
        name={ROUTES.Cart}
        component={OrdersStackNavigator}
      />
      <Tab.Screen
        options={{
          tabBarIcon: ({color, size}) => (
            <Image source={HOME} style={commonStyles.largeIcon} />
          ),
        }}
        name={ROUTES.TabHome3}
        component={TabStackNavigator}
      />
      <Tab.Screen
        name={ROUTES.TabHome4}
        options={({route}) => ({
          tabBarIcon: ({color, size}) => (
            <Image source={CHAT} style={commonStyles.icon} />
          ),
          tabBarVisible: getTabBarVisibility(route),
        })}
        component={ChatNull}
      />
      <Tab.Screen
        options={{
          tabBarIcon: ({color, size}) => (
            <Image source={MAIL} style={commonStyles.smallMailIcon} />
          ),
        }}
        name={ROUTES.TabHome5}
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
      <Drawer.Screen name={ROUTES.Drawer} component={TabNavigator} />
    </Drawer.Navigator>
  );
}

function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name={ROUTES.Landing} component={Landing} />
        <Stack.Screen name={ROUTES.Help} component={HelpSteps} />
        <Stack.Screen name={ROUTES.Login} component={Login} />
        <Stack.Screen name={ROUTES.Home} component={DrawerNavigator} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default AppNavigator;

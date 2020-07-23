/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {PureComponent} from 'react';
import {
  StyleSheet
} from 'react-native';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import {
  Colors
} from 'react-native/Libraries/NewAppScreen';
import AppNavigator from './Navigator';
import SplashScreen from 'react-native-splash-screen';
import messaging, {AuthorizationStatus} from '@react-native-firebase/messaging';
import createStore from './redux/store';
import OneSignal from 'react-native-onesignal';

//import store from './redux/store';

const {store, persistor} = createStore();

class App extends PureComponent {
  componentDidMount() {
    console.disableYellowBox = true;
    OneSignal.setLogLevel(6, 0);
    OneSignal.init("6c356504-bbfc-4036-bb77-07245ccdb10e", {kOSSettingsKeyAutoPrompt : false, kOSSettingsKeyInAppLaunchURL: false, kOSSettingsKeyInFocusDisplayOption:2});
    setTimeout(()=>{
      SplashScreen.hide();
    }, 2000); 
    OneSignal.promptForPushNotificationsWithUserResponse(this.myiOSPromptCallback);

   
    
    // this.getToken();
  }
  
 myiOSPromptCallback(permission){
  
}
  handleConnectionChange = (isConnected) => {
    status = isConnected;
  };

  // checking if app opened from notification or not
  async getToken() {
    const token = await messaging().getInitialNotification();
  }

  render() {
    return (
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <AppNavigator />
        </PersistGate>
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: Colors.lighter,
  },
  engine: {
    position: 'absolute',
    right: 0,
  },
  body: {
    backgroundColor: Colors.white,
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: Colors.black,
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
    color: Colors.dark,
  },
  highlight: {
    fontWeight: '700',
  },
  footer: {
    color: Colors.dark,
    fontSize: 12,
    fontWeight: '600',
    padding: 4,
    paddingRight: 12,
    textAlign: 'right',
  },
});

export default App;

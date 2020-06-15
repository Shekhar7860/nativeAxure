'use strict';

import React, {PureComponent, Component} from 'react';

import {
  View,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Image,
  Alert,
  Text,
} from 'react-native';
import BaseScreen from '../../components/BaseScreen';
import {rightArrow} from '../../constants/Images';
import ButtonWithImage from '../../components/ButtonWithImage';
import {CheckBox} from 'react-native-elements';
import ClickableText from '../../components/ClickableText';
import commonStyles from '../../commonStyles/commonStyles';
import {
  APP_MAIN_COLOR,
  WHITE,
  APP_MAIN_COLOR_DISABLE,
  BLACK,
} from '../../constants/colors';
import InputBox from '../../components/InputBox';
import {APP_NAME} from '../../constants/const';
import {loginUser} from '../../redux/reducers/session';
import {isEmailValid, showErrorPopup} from '../../util/utils';
import StoreDB from '../../storage/StoreDB';
import {ScaledSheet, moderateScale} from 'react-native-size-matters';

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showLoading: false,
      username: '',
      password: '',
      isRememberMe: false,
      userId: '123',
      nickname: 'Ritu',
    };
  }

  componentDidMount() {
    // this.props.initLogin();
    // StoreDB.userEmail().then(email => {
    //   StoreDB.userPassword().then(password => {
    //     this.setState({
    //       username: email,
    //       password: password,
    //       isRememberMe: true,
    //     });
    //   });
    // });
  }

  login = () => {
    const {username, password, isRememberMe} = this.state;
    // console.group('username', username, 'password', password)
    if (!username) {
      Alert.alert('', 'Please enter Username.');
    } else if (!isEmailValid(username)) {
      Alert.alert('', 'Please enter valid Username.');
    } else if (!password) {
      Alert.alert('', 'Please enter Password.');
    } else {
      this.props.loginUser(username, password);
      // StoreDB.loggedInUserData({name: username});
      // this.props.navigation.navigate('Home');
    }
  };

  render() {
    const {showLoading, isRememberMe, username, password} = this.state;
    let isShowStatusBar = Platform.OS === 'android';
    return (
      <KeyboardAvoidingView
        style={commonStyles.ketboardAvoidingContainer}
        behavior={Platform.OS === 'android' ? null : 'padding'}
        enabled>
        <View style={styles.loginAppName}>
          <Text style={commonStyles.appNmetextStyle}>{APP_NAME}</Text>
          <Text style={styles.signInText}>Sign In</Text>
          <View style={styles.contentMargin}>
            <InputBox
              keyboardType="email-address"
              onChangeText={(value) => this.setState({username: value})}
              boxStyle={commonStyles.inputBoxStyle}
              value={username}
              placeHolder="Username/(Email Address)"
            />
            <InputBox
              secureTextEntry
              onChangeText={(value) => this.setState({password: value})}
              boxStyle={commonStyles.inputBoxStyle}
              value={password}
              placeHolder="Password"
            />
          </View>
          <View style={styles.forgotPassParent}>
            <CheckBox
              title="Remember Me"
              checked={isRememberMe}
              onPress={() => this.setState({isRememberMe: !isRememberMe})}
              checkedColor={BLACK}
              containerStyle={commonStyles.checkBoxContainer}
              uncheckedIcon="square"
              size={15}
              textStyle={commonStyles.checkBoxText}
            />
            <View style={{width: '5%'}} />
            <ClickableText
              textStyle={styles.forgotPassText}
              isBoldText={false}
              onPress={this.startForgotPassword}>
              Forgot Your Password?
            </ClickableText>
          </View>
          <View style={styles.topMargin}>
            <ButtonWithImage
              onPress={() => this.login()}
              isShowRightIcon
              style={commonStyles.otherButtons}
              textStyle={commonStyles.otherButtonText}
              rightImage={rightArrow}>
              LOGIN
            </ButtonWithImage>
          </View>
          <ClickableText textStyle={styles.registerText} isBoldText={true}>
            REGISTER
          </ClickableText>
        </View>
      </KeyboardAvoidingView>
    );
  }
}

const styles = ScaledSheet.create({
  loginAppName: {
    marginTop: moderateScale(130),
  },
  signInText: {
    marginTop: moderateScale(10),
    textAlign: 'center',
    fontSize: moderateScale(18),
    fontWeight: 'normal',
  },
  contentMargin: {
    marginTop: moderateScale(30),
  },
  forgotPassParent: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: moderateScale(5),
    marginBottom: moderateScale(10),
    width: '100%',
    marginHorizontal: moderateScale(20),
  },
  registerText: {
    marginTop: moderateScale(10),
    fontSize: moderateScale(13),
  },
  topMargin: {
    marginTop: moderateScale(20),
  },
  forgotPassText: {
    fontSize: moderateScale(11),
  },
});

export default Login;

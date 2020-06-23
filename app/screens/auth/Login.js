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
import {connect} from 'react-redux';
import {
  APP_MAIN_COLOR,
  WHITE,
  APP_MAIN_COLOR_DISABLE,
  BLACK,
} from '../../constants/colors';
import {CommonActions} from '@react-navigation/native';

import InputBox from '../../components/InputBox';
import {APP_NAME} from '../../constants/const';
import {loginUser} from '../../redux/reducers/session';
import {isEmailValid, showErrorPopup} from '../../util/utils';
import StoreDB from '../../storage/StoreDB';
import Api from '../../services/api';
import OverlaySpinner from '../../components/OverlaySpinner';
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
    // console.log(this.props);
    StoreDB.userEmail().then((email) => {
      StoreDB.userPassword().then((password) => {
        this.setState({
          username: email,
          password: password,
          isRememberMe: true,
        });
      });
    });
  }

  login = () => {
    const {username, password, isRememberMe} = this.state;
    const {online} = this.props;

    if (online) {
      // console.group('username', username, 'password', password)
      if (!username) {
        Alert.alert('', 'Please enter Username.');
      } else if (!isEmailValid(username)) {
        Alert.alert('', 'Please enter valid Username.');
      } else if (!password) {
        Alert.alert('', 'Please enter Password.');
      } else {
        this.setState({showLoading: true});
        this.props
          .loginUser(username, password)
          .then((response) => {
            this.setState({showLoading: false});
            if (response.code === 200) {
              if (isRememberMe) {
                StoreDB.userEmail(username);
                StoreDB.userPassword(password);
              } else {
                StoreDB.userEmail('');
                StoreDB.userPassword('');
              }
              Api.setAuthToken(response.data.auth_token);
              StoreDB.loggedInUserData(response.data);
              const userId = response.data.id.toString();
              const nickname = response.data.name;
              this.props.navigation.navigate('Home');
              this.props.navigation.reset({
                routes: [{name: 'Home'}],
              });
            } else {
              if (response.validation_errors) {
                showErrorPopup(response.validation_errors);
              } else {
                showErrorPopup(response.message);
              }
            }
          })
          .catch((error) => {
            this.setState({showLoading: false});
            if (error.code === 'unauthorized') {
              showErrorPopup(
                "Couldn't validate those credentials.\nPlease try again",
              );
            } else {
              showErrorPopup(
                'There was an unexpected error.\nPlease wait a few minutes and try again.',
              );
            }
          });
      }
    } else {
      Alert.alert('', 'No Internet Connection');
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
            <View style={{width: '5%'}} />
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
        <OverlaySpinner
          cancelable
          visible={showLoading}
          color={WHITE}
          textContent="Please wait..."
          textStyle={{color: WHITE}}
        />
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
    justifyContent: 'space-around',
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

const mapStateToProps = (state) => ({
  online: state.netInfo.online,
});

const mapDispatchToProps = {
  loginUser,
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);


import React, {PureComponent} from 'react';

import {StyleSheet, View, Platform, StatusBar, SafeAreaView} from 'react-native';
import {DRAWER_MENU, BACK, SEARCH} from '../constants/Images';
import SafeArea from './SafeArea';
import SubHeader from './SubHeader';
import TouchableImage from './TouchableImage';
import {
  WHITE
} from '../constants/colors';
import BoldText from './BoldText';
import BaseScreen from '../components/BaseScreen';
import {getStatusBarHeight, isIphoneX} from 'react-native-iphone-x-helper';
import {HEADER_ITEMS_MARGIN_LEFT_RIGHT} from '../constants/const';
import {ScaledSheet, moderateScale} from 'react-native-size-matters';
const THEME_COLOR = '#285E29';
const HEADER_IMAGE_WIDTH_HEIGHT = moderateScale(25);
const HEADER_HEIGHT = moderateScale(45);
const PROFILE_IMAGE_SIZE = moderateScale(20);

class Header extends PureComponent {
  static defaultProps = {
    isShowDrawer: true,
    isShowBack: false,
    isShowSubHeader: true,
    title: '',
  };

  getStatusBarHeight() {
    const {isLandscape} = this.props;

    if (isLandscape && isIphoneX()) {
      return 0;
    }

    return getStatusBarHeight();
  }

  handleDrawerMenuClick = (img) => {
    console.log('prssed', img);
    if (img === 25) {
      this.props.navigation.goBack();
    } else {
      this.props.navigation.openDrawer();
    }
  };

  handleGoBack = () => {
    const {backPressed} = this.props;
    if (backPressed) {
      backPressed();
    }

    this.props.navigation.goBack();
  };

  imageFunction = (img) => {
    console.log('selected', img);
    if (img === 10) {
      this.props.navigation.navigate('Search');
    } else if (img === 11) {
      this.props.navigation.goBack();
    } else {
    }
  };

  render() {
    const {
      isShowDrawer,
      isShowBack,
      title,
      isShowAdd,
      isShowSubHeader,
      addAction,
      isShowSecondLine,
      secondLine,
      onPress,
      isDisableClickText,
      subHeaderTitleStyle,
      isShowButton,
      buttonText,
      buttonPress,
      navigation,
      rightImage,
      leftImage,
    } = this.props;
    const statusBarHeight = this.getStatusBarHeight();
    const paddingTop = {marginTop: moderateScale(10)};
    return (
      <>
      <SafeAreaView style={styles.topSafeArea} />
      <SafeArea style={[styles.container, paddingTop]}>
      <StatusBar backgroundColor={WHITE} barStyle="dark-content"/>
        <View style={{ overflow: 'hidden', paddingBottom: 5}}>
          <View style={styles.header}>
            <View style={styles.leftView}>
              {isShowDrawer && (
                <TouchableImage
                  onPress={() => this.handleDrawerMenuClick(leftImage)}
                  image={leftImage}
                  imageStyle={styles.image}
                />
              )}
              {isShowBack && (
                <TouchableImage
                  onPress={this.handleGoBack}
                  image={BACK}
                  imageStyle={styles.image}
                />
              )}
            </View>
            <BoldText style={{fontSize: moderateScale(20)}}>{title}</BoldText>
            <View style={styles.lastView}>
              <TouchableImage
                image={rightImage}
                imageStyle={styles.profile}
                onPress={() => this.imageFunction(rightImage)}
              />
            </View>
          </View>
        </View>
      </SafeArea>
      </>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'transparent',
  },
  header: {
    height: HEADER_HEIGHT,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'transparent',
    borderBottomWidth : 0,
    borderTopColor : "white",
    backgroundColor: '#fff',
        shadowColor: '#000',
        shadowOffset: { width: 1, height: 1 },
        shadowOpacity:  0.4,
        shadowRadius: 3,
        elevation: 5,
  },
  leftView: {
    flex: 1,
  },
  image: {
    width: HEADER_IMAGE_WIDTH_HEIGHT,
    height: HEADER_IMAGE_WIDTH_HEIGHT,
  },
  lastView: {
    flex: 1,
    alignItems: 'flex-end',
  },
  profile: {
    width: PROFILE_IMAGE_SIZE,
    height: PROFILE_IMAGE_SIZE,
    marginRight: HEADER_ITEMS_MARGIN_LEFT_RIGHT,
  },
  styleStatusBar : {
    color : 'red'
  },
  topSafeArea: {
    flex: 0, 
    backgroundColor: WHITE
}, 
});

export default Header;
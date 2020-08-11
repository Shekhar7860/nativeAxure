'use strict';

import React, {PureComponent} from 'react';

import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Platform,
  StatusBar,
  Image,
  ImageBackground,
} from 'react-native';
import {ScaledSheet, moderateScale} from 'react-native-size-matters';
import FastImage from 'react-native-fast-image';
import Swiper from 'react-native-swiper';
import BaseScreen from '../components/BaseScreen';
import {isIphoneX} from 'react-native-iphone-x-helper';
import BoldText from '../components/BoldText';
import ButtonWithImage from '../components/ButtonWithImage';
import commonStyles from '../commonStyles/commonStyles';
import NormalText from '../components/NormalText';
import StoreDB from '../storage/StoreDB';
import TouchableImage from '../components/TouchableImage';
import {TEST, HELP_STEP_2, HELP_STEP_3, rightArrow} from '../constants/Images';
import {WHITE, LIGHT_GREEN, APP_MAIN_COLOR} from '../constants/colors';



const DOTS_WIDTH_HEIGHT = 12;
const NEXT = 'NEXT';
const TOTAL_SLIDES = 3;
const BUTTON_HEIGHT = 50;
const CROSS_IMG_SIZE = 25;
const HIT_SLOP = 15;

class HelpSteps extends PureComponent {
  state = {
    buttonLabel: NEXT,
    currentIndex: 0,
    isLoadingHelpStepsDone: true,
    isLandscapeDone: true,
  };

  constructor(props) {
    super(props);

    // if (Platform.isPad) {
    //   portraitHelpSteps = IPAD_PORTRAIT_HELP_STEPS;
    //   landscapeHelpSteps = IPAD_LANDSCAPE_HELP_STEPS;
    // } else if (isIphoneX()) {
    //   portraitHelpSteps = IPHONEX_PORTRAIT_HELP_STEPS;
    //   landscapeHelpSteps = IPHONEX_LANDSCAPE_HELP_STEPS;
    // } else {
    //   portraitHelpSteps = MOBILE_PORTRAIT_HELP_STEPS;
    //   landscapeHelpSteps = MOBILE_LANDSCAPE_HELP_STEPS;
    // }
  }

  // componentWillMount() {
  //   this.getPortraitHelpSteps();
  //   this.getLandscapeHelpSteps();
  // }

  _navigateToLandingOnBack = () => {
    const {params} = this.props.navigation.state;

    if (params && params.isFromPreferences) {
      this.props.navigation.goBack();
      this._swiper.scrollTo(0);
    } else {
      this._navigateToLanding();
    }
  };

  renderInactiveDot() {
    return <View style={styles.inactiveDotStyle} />;
  }

  renderActiveDot() {
    return <View style={styles.activeDotStyle} />;
  }

  goToLanding = () => {
    StoreDB.appIntroStatus(true).then(() => {
      this.props.navigation.navigate('Login');
    });
  };

  handleButtonPress = () => {
    if (this.state.currentIndex === TOTAL_SLIDES - 1) {
      this._navigateToLandingOnBack();
    } else {
      this._swiper.scrollBy(1);
    }
  };

  handleIndexChanged = (index) => {
    this.setState({currentIndex: index});
  };

  render() {
    const {isLandscape} = this.props;
    const {isLoadingHelpStepsDone, isLandscapeDone} = this.state;
    const isPortrait = !isLandscape;

    if (!isLoadingHelpStepsDone || !isLandscapeDone) {
      return <Loading />;
    }
    return (
      <BaseScreen
        blackElements
        header={false}
        safeArea={false}
        ParentStyle={styles.BasescreenStyle}>
        <StatusBar hidden />
        <Swiper
          ref={(swiper) => {
            this._swiper = swiper;
          }}
          onIndexChanged={this.handleIndexChanged}
          index={this.state.currentIndex}
          loop={false}
          dot={this.renderInactiveDot()}
          activeDot={this.renderActiveDot()}
          style={styles.wrapper}
          paginationStyle={{ marginLeft : moderateScale(-160) }}
          showsButtons={false}>

          <ImageBackground
            resizeMode="cover"
            style={styles.image}
            source={TEST}>
            <Text style={styles.labelTextStyle}>
              Create and {'\n'} view Quotes
            </Text>
          </ImageBackground>
          <ImageBackground
            resizeMode="cover"
            style={styles.image}
            source={HELP_STEP_2}>
            <Text style={styles.labelTextStyle}>
              Access list {'\n'} of Orders
            </Text>
          </ImageBackground>
          <ImageBackground
            resizeMode="cover"
            style={styles.image}
            source={HELP_STEP_3}>
            <Text style={styles.labelTextStyle}>View Invoices</Text>
          </ImageBackground>
        </Swiper>

        <TouchableOpacity
          style={
            isPortrait ? styles.buttonContainer : styles.buttonContainerLand
          }>
          {this.state.currentIndex !== 2 ? (
            <TouchableOpacity onPress={() => this.goToLanding()}>
              <Text style={styles.skipText}>SKIP</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity>
              <ButtonWithImage
                onPress={() => this.goToLanding()}
                isShowRightIcon
                style={commonStyles.otherButtons}
                textStyle={commonStyles.otherButtonText}
                rightImage={rightArrow}>
                GET STARTED
              </ButtonWithImage>
            </TouchableOpacity>
          )}
        </TouchableOpacity>
      </BaseScreen>
    );
  }
}

const styles = StyleSheet.create({
  wrapper: {
    alignSelf : 'flex-start'
  },
  image: {
    flex: 1,
    width: '100%',
    height: '100%',
    justifyContent: 'center'
  },
  BasescreenStyle: {
    marginTop: isIphoneX ? -30 : 0
  },
  buttonContainer: {
    width: 280,
    height: BUTTON_HEIGHT,
    position: 'absolute',
    bottom: 20,
    justifyContent: 'center',
    alignContent: 'center',
    alignSelf: 'center',
  },
  buttonContainerLand: {
    width: 200,
    height: BUTTON_HEIGHT,
    position: 'absolute',
    bottom: 40,
    justifyContent: 'center',
    alignContent: 'center',
    alignSelf: 'center',
    backgroundColor: LIGHT_GREEN,
    borderRadius: BUTTON_HEIGHT / 2,
  },
  activeDotStyle: {
    width: moderateScale(35),
    height: moderateScale(10),
    backgroundColor: APP_MAIN_COLOR,
    borderRadius: moderateScale(10) / 2,
    marginLeft: moderateScale(5),
    marginBottom: moderateScale(70),
  },
  inactiveDotStyle: {
    width: moderateScale(10),
    height: moderateScale(10),
    backgroundColor: WHITE,
    borderRadius: moderateScale(10) / 2,
    marginLeft: moderateScale(5),
    marginBottom: moderateScale(70),
  },
  buttonText: {
    color: WHITE,
    textAlign: 'center',
    fontSize: 16,
  },
  labelTextStyle: {
    fontSize: moderateScale(35),
    textAlign: 'center',
    color: WHITE,
    fontWeight : 'bold',
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
  textShadowOffset: {width: moderateScale(-1), height: moderateScale(1)},
  textShadowRadius: moderateScale(10)
  },
  skipText: {
    textAlign: 'center',
    color: WHITE,
    fontSize: moderateScale(18),
  },
});

export default HelpSteps;

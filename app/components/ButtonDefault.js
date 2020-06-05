'use strict';

import React, {PureComponent} from 'react';

import {StyleSheet, View, TouchableOpacity, Image} from 'react-native';
import {PHONE} from '../constants/Images';
import BoldText from './BoldText';
import {WHITE, APP_MAIN_COLOR, GRAY} from '../constants/colors';
const BUTTON_HEIGHT = 40;
const BUTTON_TEXT_SIZE = 16;

class ButtonDefault extends PureComponent {
  static defaultProps = {
    isShowLoading: false,
    disable: false,
    isShowImage: false,
    source: PHONE,
  };
  render() {
    const {isShowLoading, disable, isShowImage, source} = this.props;
    let isDisable = isShowLoading || disable;
    let buttonMainStyle = styles.SubmitButtonStyle;
    if (isDisable) {
      buttonMainStyle = styles.SubmitButtonDisable;
    }
    return (
      <TouchableOpacity
        disabled={isDisable}
        {...this.props}
        onPress ={this.props.onPress}
        style={[buttonMainStyle, this.props.style]}>
        <View style={styles.viewStyle}>
          {isShowImage && <Image source={source} style={styles.buttonImage} />}
          <BoldText style={[styles.TextStyle, this.props.textStyle]}>
            {this.props.children}
          </BoldText>
          {isShowLoading && (
            <Loading indicatorColor={APP_MAIN_COLOR} style={styles.loading} />
          )}
        </View>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  SubmitButtonStyle: {
    justifyContent: 'center',
    backgroundColor: WHITE,
    borderRadius: BUTTON_HEIGHT / 2,
    width: '100%',
    height: BUTTON_HEIGHT,
  },
  SubmitButtonDisable: {
    justifyContent: 'center',
    backgroundColor: GRAY,
    borderRadius: BUTTON_HEIGHT / 2,
    width: '100%',
    height: BUTTON_HEIGHT,
  },
  TextStyle: {
    color: APP_MAIN_COLOR,
    fontSize: BUTTON_TEXT_SIZE,
    textAlign: 'center',
  },
  viewStyle: {
    flexDirection: 'row',
    height: BUTTON_HEIGHT,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: BUTTON_HEIGHT / 2,
  },
  loading: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
  buttonImage: {
    width: BUTTON_TEXT_SIZE,
    height: BUTTON_TEXT_SIZE,
    marginRight: 10,
  },
});

export default ButtonDefault;

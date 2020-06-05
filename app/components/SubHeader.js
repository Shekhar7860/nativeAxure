'use strict';

import React, {PureComponent} from 'react';

import {StyleSheet, View} from 'react-native';
import {ADD} from '../constants/Images';
import ClickableText from './ClickableText';
import TouchableImage from './TouchableImage';
import {APP_MAIN_BLUE_COLOR, WHITE, APP_MAIN_COLOR} from '../constants/colors';
import BoldText from './BoldText';
import {HEADER_ITEMS_MARGIN_LEFT_RIGHT} from '../constants/const';

const ADD_IMAGE_WIDTH_HEIGHT = 25;
const HEADER_HEIGHT = 40;
const TITLE_FONT_SIZE = 16;
const BUTTON_HEIGHT = 24;

class SubHeader extends PureComponent {
  static defaultProps = {
    isShowAdd: false,
    isShowButton: false,
    isShowSecondLine: false,
    title: 'Health Care',
    secondLine: 'Click here...',
    isDisableClickText: true,
    buttonText: 'Add Appt.',
  };

  handleAddAction = () => {
    // this.props.addAction();
    this.props.onPress();
  };

  handleButtonPress = () => {
    this.props.buttonPress();
  };

  handleTextClickAction = () => {
    this.props.onPress();
  };

  render() {
    const {
      isShowAdd,
      title,
      subHeaderTitleStyle,
      isShowSecondLine,
      secondLine,
      isDisableClickText,
      isShowButton,
      buttonText,
    } = this.props;
    return (
      <View style={styles.parent}>
        <View style={styles.firstView} />
        <View>
          <BoldText
            style={[styles.title, subHeaderTitleStyle]}
            numberOfLines={1}>
            {title}
          </BoldText>
          {isShowSecondLine && (
            <ClickableText
              isDisable={isDisableClickText}
              onPress={this.handleTextClickAction}
              isBoldText={false}
              textStyle={styles.clickText}>
              {secondLine}
            </ClickableText>
          )}
        </View>
        <View style={styles.lastView}>
          {isShowAdd && (
            <TouchableImage
              onPress={this.handleAddAction}
              image={ADD}
              imageStyle={styles.addImage}
            />
          )}
          {isShowButton && (
            <ClickableText
              onPress={this.handleButtonPress}
              style={styles.buttonStyle}
              textStyle={styles.buttonText}>
              {buttonText}
            </ClickableText>
          )}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  parent: {
    minHeight: HEADER_HEIGHT,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: WHITE,
  },
  title: {
    fontSize: TITLE_FONT_SIZE,
    color: APP_MAIN_BLUE_COLOR,
    marginLeft: 50,
    marginRight: 50,
    textAlign: 'center',
  },
  firstView: {
    flex: 1,
  },
  lastView: {
    flex: 1,
    alignItems: 'flex-end',
  },
  addImage: {
    width: ADD_IMAGE_WIDTH_HEIGHT,
    height: ADD_IMAGE_WIDTH_HEIGHT,
    marginRight: HEADER_ITEMS_MARGIN_LEFT_RIGHT,
  },
  clickText: {
    color: APP_MAIN_BLUE_COLOR,
    fontSize: 12,
    marginBottom: 5,
  },
  buttonStyle: {
    backgroundColor: APP_MAIN_COLOR,
    height: BUTTON_HEIGHT,
    minWidth: 65,
    borderRadius: BUTTON_HEIGHT / 2,
    marginRight: HEADER_ITEMS_MARGIN_LEFT_RIGHT,
    justifyContent: 'center',
  },
  buttonText: {
    fontSize: 10,
    marginTop: -2,
  },
});

export default SubHeader;

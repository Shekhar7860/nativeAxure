'use strict';

import React, {Component} from 'react';
import {StyleSheet, Image} from 'react-native';
import {Input} from 'react-native-elements';
import {ScaledSheet, moderateScale} from 'react-native-size-matters';
import Icon from 'react-native-vector-icons/Feather';
import {
  APP_MAIN_BLUE_COLOR,
  APP_MAIN_COLOR_DISABLE,
  TRANSPARENT_COLOR,
  LINE_COLOR,
} from '../constants/colors';

const INPUT_BOX_HEIGHT = 50;

class InputBox extends Component {
  static defaultProps = {
    placeHolder: 'Input here...',
    boxStyle: {},
    inputStyle: {},
    maxLines: 0,
    placeHolderTextColor: TRANSPARENT_COLOR,
  };

  render() {
    const {
      placeHolder,
      boxStyle,
      inputStyle,
      maxLines,
      isSearch,
      rightIcon,
      searchImageStyle,
      placeHolderTextColor,
    } = this.props;
    return (
      <Input
        {...this.props}
        multiline={maxLines > 1}
        numberOfLines={maxLines > 0 ? maxLines : null}
        placeholder={placeHolder}
        placeholderTextColor={placeHolderTextColor}
        containerStyle={[styles.box, {...boxStyle}]}
        inputStyle={[styles.input, inputStyle]}
        inputContainerStyle={styles.inputContainerStyle}
        rightIcon={{type: 'feather', name: rightIcon}}
      />
    );
  }
}

const styles = ScaledSheet.create({
  box: {
    paddingLeft: moderateScale(20),
    height: INPUT_BOX_HEIGHT,
    borderRadius: INPUT_BOX_HEIGHT / 2,
    borderBottomWidth: 0,
  },
  input: {
    fontSize: moderateScale(14),
    fontWeight: 'bold',
  },
  inputContainerStyle: {
    borderColor: LINE_COLOR,
  },
  searchImage: {
    width: 16,
    height: 16,
    alignSelf: 'center',
  },
});

export default InputBox;

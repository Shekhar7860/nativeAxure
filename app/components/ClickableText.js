'use strict';

import React, {PureComponent} from 'react';
import { ScaledSheet, moderateScale } from 'react-native-size-matters';
import {StyleSheet, TouchableOpacity} from 'react-native';
import {WHITE} from '../constants/colors';
import BoldText from './BoldText';
import NormalText from './NormalText';

class ClickableText extends PureComponent {
  static defaultProps = {
    isBoldText: true,
    isDisable: false,
  };
  render() {
    const {isBoldText, textStyle, onPress, isDisable} = this.props;
    return (
      <TouchableOpacity
        {...this.props}
        disabled={isDisable}
        hitSlop={{top: 10, bottom: 10, left: 10, right: 10}}
        onPress={onPress}>
        {isBoldText ? (
          <BoldText style={[styles.textStyle, textStyle]}>
            {this.props.children}
          </BoldText>
        ) : (
          <NormalText style={[styles.textStyle, textStyle]}>
            {this.props.children}
          </NormalText>
        )}
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  textStyle: {
    fontSize: moderateScale(8),
    color: 'black',
    textAlign: 'center',
  },
});

export default ClickableText;

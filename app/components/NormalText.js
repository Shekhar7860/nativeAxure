import React, {PureComponent} from 'react';

import {StyleSheet, Text} from 'react-native';
import {WHITE} from '../constants/colors';

// const BASE_FONT = 'Roboto-Regular';

class NormalText extends PureComponent {
  render() {
    return (
      <Text {...this.props} style={[styles.myAppText, this.props.style]}>
        {this.props.children}
      </Text>
    );
  }
}

const styles = StyleSheet.create({
  myAppText: {
    color: WHITE,
    // fontFamily: BASE_FONT,
  },
});

export default NormalText;

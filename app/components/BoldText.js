import React, {PureComponent} from 'react';

import {StyleSheet, Text} from 'react-native';

// const BASE_FONT = 'Roboto-Bold';

class BoldText extends PureComponent {
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
    // fontFamily: BASE_FONT,
    fontWeight: 'bold',
  },
});

export default BoldText;

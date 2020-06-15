import React, {Component} from 'react';
import {ActivityIndicator, StyleSheet} from 'react-native';

export default class extends Component {
  render() {
    return (
      <ActivityIndicator
        {...this.props}
        style={[styles.indicator, this.props.style]}
        color={this.props.indicatorColor}
      />
    );
  }
}

const styles = StyleSheet.create({
  indicator: {},
});

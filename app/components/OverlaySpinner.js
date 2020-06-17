import React from 'react';
import {StyleSheet, View, Text, ActivityIndicator} from 'react-native';

const transparent = 'transparent';
export default class OverlaySpinner extends React.PureComponent {
  static defaultProps = {
    visible: false,
    cancelable: false,
    textContent: '',
    animation: 'none',
    color: 'white',
    size: 'large',
    overlayColor: 'rgba(0, 0, 0, 0.25)',
  };

  state = {
    visible: this.props.visible,
    textContent: this.props.textContent,
  };

  close() {
    this.setState({visible: false});
  }

  static getDerivedStateFromProps(props, state) {
    const newState = {};
    if (state.visible !== props.visible) {
      newState.visible = props.visible;
    }
    if (state.textContent !== props.textContent) {
      newState.textContent = props.textContent;
    }
    return newState;
  }

  handleOnRequestClose() {
    if (this.props.cancelable) {
      this.close();
    }
  }

  renderDefaultContent() {
    const {
      customIndicator,
      indicatorStyle,
      color,
      size,
      textStyle,
    } = this.props;
    const {textContent} = this.state;

    return (
      <View style={styles.background}>
        {customIndicator || (
          <ActivityIndicator
            color={color}
            size={size}
            style={[styles.activityIndicator, indicatorStyle]}
          />
        )}
        <View style={[styles.textContainer, indicatorStyle]}>
          <Text style={[styles.textContent, textStyle]}>{textContent}</Text>
        </View>
      </View>
    );
  }

  render() {
    const {children, overlayColor} = this.props;
    if (!this.state.visible) {
      return null;
    }

    return (
      <View style={[styles.container, {backgroundColor: overlayColor}]}>
        {children || this.renderDefaultContent()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: transparent,
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 100,
  },
  background: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textContainer: {
    flex: 1,
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
  },
  textContent: {
    top: 80,
    height: 50,
    fontSize: 18,
    fontWeight: 'bold',
  },
  activityIndicator: {
    flex: 1,
  },
});

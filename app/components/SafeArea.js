import React, { PureComponent } from 'react';
import { View, SafeAreaView } from 'react-native';
import { getStatusBarHeight, isIphoneX } from 'react-native-iphone-x-helper';

const defaultSafeAreaConfig = {
  top: true,
  bottom: false,
  left: true,
  right: true,
};

function getInsetConfig(inset = {}, enableTop) {
  const safeAreaInsetConfig = { top: enableTop };

  if (inset === false) {
    Object.keys(defaultSafeAreaConfig).forEach((key) => {
      safeAreaInsetConfig[key] = 'never';
    });
  } else {
    const saConfig = { ...defaultSafeAreaConfig, ...inset };

    Object.entries(saConfig).forEach(([key, val]) => {
      if (typeof val === 'boolean') {
        safeAreaInsetConfig[key] = val ? 'always' : 'never';
      } else {
        delete safeAreaInsetConfig[key];
      }
    });
  }

  return safeAreaInsetConfig;
}

class SafeArea extends PureComponent {
  static defaultProps = {
    inset: defaultSafeAreaConfig,
    checkOrientation: true,
  }

  state = {
    forceInset: getInsetConfig(this.props.inset),
  }


  getStatusBarHeight() {
    const { isLandscape } = this.props;

    if (isLandscape && isIphoneX()) {
      return 0;
    }

    return getStatusBarHeight();
  }

  componentDidMount = () => {
    const { checkOrientation, isLandscape, inset } = this.props;

    if (checkOrientation && isLandscape && isIphoneX()) {
      this.setState({ forceInset: getInsetConfig(inset, false) });
    }
  }

  componentDidUpdate = (prevProps, prevState) => {
    const { inset, checkOrientation, isLandscape } = this.props;

    const shouldUpdateInset = inset !== prevProps.inset ||
      (checkOrientation && (isLandscape !== prevProps.isLandscape));

    if (shouldUpdateInset) {
      let topInset = true;

      if (checkOrientation && isLandscape && isIphoneX()) {
        topInset = topInset;
      }
      this.setState({ forceInset: getInsetConfig(inset, topInset) });
    }
  }

  render() {
    const { inset, ...otherProps } = this.props;
    const { forceInset } = this.state;

    if (inset === false) {
      return (
        <View {...otherProps} />
      );
    }
    return (
      <SafeAreaView
        {...otherProps}
        forceInset={forceInset}
      />
    );
  }
}

export default SafeArea;

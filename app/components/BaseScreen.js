import React, {PureComponent} from 'react';

import {StyleSheet, View, StatusBar, Platform} from 'react-native';
import SafeArea from './SafeArea';
import {APP_MAIN_COLOR} from '../constants/colors';
import {getStatusBarHeight} from 'react-native-iphone-x-helper';

const MyStatusBar = props => {
  const {
    backgroundColor,
    barHeight,
    isStatusBarTranslucent,
    statusbarPadding,
    ...otherProps
  } = props;
  return (
    <View
      style={{
        paddingTop: statusbarPadding,
        backgroundColor: backgroundColor,
        height: Platform.OS === 'ios' ? barHeight : 0,
      }}>
      <StatusBar
        translucent={isStatusBarTranslucent}
        backgroundColor={backgroundColor}
        {...otherProps}
      />
    </View>
  );
};

const defaultSafeAreaConfig = {
  top: false,
  bottom: false,
  left: true,
  right: true,
};

class BaseScreen extends PureComponent {
  static defaultProps = {
    isAddStatusBarPadding: false,
    isStatusBarTranslucent: true,
    statusBarBGColor: 'transparent',
    isShowStatusBar: true,
    safeArea: defaultSafeAreaConfig,
    blackElements: false,
    safeAreaStyle: {backgroundColor: APP_MAIN_COLOR},
  };

  render() {
    const {
      isShowStatusBar,
      isStatusBarTranslucent,
      children,
      isAddStatusBarPadding,
      safeArea,
      safeAreaStyle,
      blackElements,
      statusBarBGColor,
      ParentStyle
    } = this.props;
    let statusbarPadding;
    if (Platform.OS === 'ios') {
      statusbarPadding = isStatusBarTranslucent ? StatusBar.currentHeight : 0;
    } else {
      statusbarPadding = isAddStatusBarPadding
        ? isStatusBarTranslucent
          ? StatusBar.currentHeight
          : 0
        : null;
    }

    return (
      <View style={[styles.parent, ParentStyle]}>
        {isShowStatusBar && (
          <MyStatusBar
            backgroundColor={statusBarBGColor}
            barStyle={blackElements ? 'dark-content' : 'light-content'}
            barHeight={getStatusBarHeight()}
            statusbarPadding={statusbarPadding}
            isStatusBarTranslucent={isStatusBarTranslucent}
          />
        )}
        <SafeArea inset={safeArea} style={[styles.container, safeAreaStyle]}>
          {children}
        </SafeArea>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  parent: {
    flex: 1,
    backgroundColor: APP_MAIN_COLOR,
  
  },
  container: {
    flex: 1,
    
  },
  body: {
    flex: 1,
  },
});

export default BaseScreen;

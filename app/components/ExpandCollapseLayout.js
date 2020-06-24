'use strict';

import React, {PureComponent} from 'react';
import {ScaledSheet, moderateScale} from 'react-native-size-matters';
import {StyleSheet, View, TouchableOpacity, Image} from 'react-native';
import {
  APP_COMMON_BORDER_RADIUS,
  APPT_DETAILS_ITEMS_MARGIN_LEFT_RIGHT,
} from '../constants/const';
import {UP_ARROW_BLUE, DOWN_ARROW_BLUE} from '../constants/Images';
import BoldText from './BoldText';
import {WHITE, APP_MAIN_BLUE_COLOR, CARD_DARK_BLUE} from '../constants/colors';
const BUTTON_HEIGHT = moderateScale(50);
const BUTTON_TEXT_SIZE = moderateScale(12);

class ExpandCollapseLayout extends PureComponent {
  state = {
    isExpand: false,
  };

  expandCollapseLayout = () => {
    this.setState({isExpand: !this.state.isExpand});
  };

  render() {
    const {isExpand} = this.state;
    const {children, title, expandView} = this.props;
    return (
      <View style={styles.parent}>
        <TouchableOpacity
          {...this.props}
          onPress={this.expandCollapseLayout}
          style={[styles.buttonStyle, this.props.style]}>
          <View style={styles.viewStyle}>
            <BoldText style={[styles.textStyle, this.props.textStyle]}>
              {title}
            </BoldText>
            <Image
              source={isExpand ? UP_ARROW_BLUE : DOWN_ARROW_BLUE}
              style={[styles.buttonImage, this.props.rightImageStyle]}
            />
          </View>
        </TouchableOpacity>
        {isExpand && (
          <View style={[styles.expandView, expandView]}>{children}</View>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  parent: {
    marginBottom: 20,
  },
  buttonStyle: {
    justifyContent: 'center',
    backgroundColor: CARD_DARK_BLUE,
    flex: 1,
    height: BUTTON_HEIGHT,
    marginLeft: APPT_DETAILS_ITEMS_MARGIN_LEFT_RIGHT,
    marginRight: APPT_DETAILS_ITEMS_MARGIN_LEFT_RIGHT,
  },
  textStyle: {
    color: WHITE,
    fontSize: BUTTON_TEXT_SIZE,
    marginLeft: 20,
    flex: 1,
    alignSelf: 'center',
  },
  viewStyle: {
    flexDirection: 'row',
    height: BUTTON_HEIGHT,
    justifyContent: 'space-between',
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
    marginRight: 15,
  },
  expandView: {
    marginLeft: APPT_DETAILS_ITEMS_MARGIN_LEFT_RIGHT + 10,
    marginRight: APPT_DETAILS_ITEMS_MARGIN_LEFT_RIGHT + 10,
    borderBottomLeftRadius: APP_COMMON_BORDER_RADIUS,
    borderBottomRightRadius: APP_COMMON_BORDER_RADIUS,

    marginTop: -5,
    paddingBottom: 5,
  },
});

export default ExpandCollapseLayout;

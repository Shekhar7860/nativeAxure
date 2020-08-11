import React, {PureComponent} from 'react';
import ModalDropdown from 'react-native-modal-dropdown';
import {StyleSheet, View, Image} from 'react-native';
import commonStyles from '../commonStyles/commonStyles';
import {BLACK, APP_MAIN_BLUE_COLOR, DARK_GRAY} from '../constants/colors';
import {DOWN_ARROW} from '../constants/Images';

const SINGLE_DROP_DOWN_HEIGHT = 45;
const PARENT_PADDING = 20;
const DOWN_ARROW_SIZE = 15;

class SimpleDropdown extends PureComponent {
  static defaultProps = {
    defaultValue: '',
  };

  showDropdown = () => {
    this.dropDown.show();
    if (this.props.showDropDown !== undefined) {
      this.props.showDropDown();
    }
  };

  hideDropdown = () => {
    //this.dropDown.hide();
    // this.props.hideDropDown()
  };
  handleDropdownSelect = (index, value) => {
    const {onSelect} = this.props;
    if (onSelect) {
      onSelect(index, value);
    }
  };

  render() {
    const {
      drowdownArray,
      placeHolder,
      style,
      textStyle,
      isIconVisible,
      dropDownWidth,
      imageStyle,
      defaultIndex,
    } = this.props;
    let dropDownHeight = 0;
    if (drowdownArray) {
      dropDownHeight =
        drowdownArray.length > 3
          ? null
          : drowdownArray.length * SINGLE_DROP_DOWN_HEIGHT;
    }

    return (
      <View>
        <View style={([commonStyles.shadowLayout, styles.flexRow], style)}>
          <ModalDropdown
            ref={(obj) => {
              this.dropDown = obj;
            }}
            defaultValue={placeHolder}
            style={styles.dropdownBtn}
            onDropdownWillShow={() => this.showDropdown()}
            onDropdownWillHide={() => this.hideDropdown()}
            onSelect={(index, value) => this.handleDropdownSelect(index, value)}
            dropdownStyle={[
              styles.dropdownView,
              {height: dropDownHeight},
              {width: dropDownWidth},
            ]}
            dropdownTextStyle={styles.dropDownListTextStyle}
            dropdownTextHighlightStyle={styles.dropDownSelectedListTextStyle}
            textStyle={
              ([commonStyles.nurseAppotNotesAndOtherText, styles.textBold],
              textStyle)
            }
            options={drowdownArray}
            accessible={false}
          />
          {isIconVisible && (
            <Image
              style={([styles.downArrow], imageStyle)}
              source={DOWN_ARROW}
            />
          )}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  textBold: {
    fontWeight: 'bold',
    flex: 1,
    color: DARK_GRAY,
  },
  dropdownBtn: {
    flex: 1,
    paddingTop: 10,
    paddingBottom: 10,
  },
  flexRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginLeft: PARENT_PADDING,
    marginRight: PARENT_PADDING,
    alignItems: 'center',
    paddingTop: 0,
    paddingBottom: 0,
  },
  dropdownView: {
    minWidth: 150,
    marginTop: -15,
  },
  dropDownListTextStyle: {
    color: BLACK,
    fontSize: 16,
    marginRight: 5,
  },
  dropDownSelectedListTextStyle: {
    color: APP_MAIN_BLUE_COLOR,
    fontSize: 16,
    marginRight: 5,
  },
  downArrow: {
    width: DOWN_ARROW_SIZE,
    height: DOWN_ARROW_SIZE,
    marginRight: 20,
  },
});

export default SimpleDropdown;

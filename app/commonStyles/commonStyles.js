import {StyleSheet, Dimensions} from 'react-native';
import {ScaledSheet, moderateScale} from 'react-native-size-matters';
import {
  WHITE,
  APP_MAIN_COLOR,
  BLACK,
  PINK_COLOR,
  LIGHTEST_GRAY,
  APP_MAIN_BLUE_COLOR,
  RED,
  LINE_COLOR,
} from '../constants/colors';
import {fonts} from '../constants/fonts';
import {fontSizes} from '../constants/fontSizes';

const ADD_NOTE_BTN = fontSizes.font40;
const NOTES_TEXT_PADDING = fontSizes.font25;

const commonStyles = ScaledSheet.create({
  ketboardAvoidingContainer: {
    flex: 1,
    backgroundColor: WHITE,
  },
  appNmetextStyle: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: fontSizes.font30,
  },
  inputBoxStyle: {
    marginBottom: fontSizes.font40,
    height: fontSizes.font15,
    borderRadius: fontSizes.font25,
  },
  scroll: {flexGrow: 1},
  checkBoxContainer: {
    backgroundColor: 'transparent',
    borderWidth: 0,
    marginLeft: 0,
    paddingHorizontal: 0,
  },
  rowItem: {
    marginHorizontal: fontSizes.font20,
    marginBottom: fontSizes.font25,
  },
  itemText: {
    color: WHITE,
    fontSize: fontSizes.font15,
  },
  checkBoxText: {
    color: WHITE,
    fontWeight: null,
    fontSize: fontSizes.font14,
  },
  forgotPassText: {
    fontSize: fontSizes.fontTen,
  },
  checkBoxText: {
    fontWeight: null,
    fontSize: fontSizes.font11,
  },
  otherButtons: {
    backgroundColor: PINK_COLOR,
    height: fontSizes.font60,
    flex: null,
    marginBottom: fontSizes.fontTen,
    borderRadius: fontSizes.font30,
    width: '80%',
    alignSelf: 'center',
  },
  otherButtonText: {
    color: 'white',
    fontSize: fontSizes.font13,
    textAlign: 'center',
  },
  icon: {
    width: fontSizes.font20,
    height: fontSizes.font20,
  },
  smallIcon: {
    width: fontSizes.fontTen,
    height: fontSizes.fontTen,
  },
  smallMailIcon: {
    width: fontSizes.font35,
    height: fontSizes.font35,
    tintColor: '#2d3436',
  },
  largeIcon: {
    width: fontSizes.font56,
    height: fontSizes.font57,
  },
  content: {
    marginHorizontal: fontSizes.fontTen,
  },
  space: {
    marginTop: fontSizes.font20,
  },
  shadowLayout: {
    marginTop: fontSizes.fontTen,
    justifyContent: 'center',
    borderRadius: ADD_NOTE_BTN / 2,
    flex: 1,
    shadowColor: LIGHTEST_GRAY,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.5,
    elevation: 2,
    paddingTop: fontSizes.fontTen,
    paddingBottom: fontSizes.fontTen,
    paddingLeft: NOTES_TEXT_PADDING,
  },
  textWhite: {
    color: WHITE,
  },
  redColor: {
    color: RED,
  },
  dropDownStyle: {
    marginHorizontal: fontSizes.font20,
    marginTop: fontSizes.negativeFont20,
    flexDirection: 'row',
    borderBottomWidth: moderateScale(1),
    borderBottomColor: LINE_COLOR,
  },
  topMargin: {
    marginTop: fontSizes.font30,
  },
  noRecordFound: {
    marginTop: fontSizes.font20,
    textAlign: 'center',
    fontSize: fontSizes.font20,
  },
  logoIcon: {
    alignSelf: 'center',
  },
  smallLogoIcon: {
    alignSelf: 'center',
  },
  boldText: {
    color: WHITE,
    fontWeight: 'bold',
    fontSize: fontSizes.font20,
  },
  marginTop20: {
    marginTop: fontSizes.font20,
  },
  commonRow: {
    flexDirection: 'row',
    marginHorizontal: fontSizes.font20,
    marginTop: fontSizes.negativeFont30,
  },
  commonTextBorder: {
    width: '88%',
    marginTop: moderateScale(0),
    borderBottomWidth: 1,
  },
});

export default commonStyles;

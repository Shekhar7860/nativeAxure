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


const ADD_NOTE_BTN = 40;
const NOTES_TEXT_PADDING = 25;


const commonStyles = ScaledSheet.create({
  ketboardAvoidingContainer: {
    flex: 1,
    backgroundColor : WHITE
  },
  appNmetextStyle: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: moderateScale(30),
  },
  inputBoxStyle: {
    marginBottom: moderateScale(40),
    height: moderateScale(15),
    borderRadius: 25,
  },
  scroll: {flexGrow: 1},
  checkBoxContainer: {
    backgroundColor: 'transparent',
    borderWidth: 0,
    marginLeft: 0,
    paddingHorizontal: 0,
  },
  checkBoxText: {
    color: WHITE,
    fontWeight: null,
    fontSize: moderateScale(14),
  },
  forgotPassText: {
    fontSize: moderateScale(14),
  },
  checkBoxText: {
    fontWeight: null,
    fontSize: moderateScale(11),
  },
  otherButtons: {
    backgroundColor: PINK_COLOR,
    height: 60,
    flex: null,
    marginBottom: 10,
    borderRadius: 30,
    width: '80%',
    alignSelf: 'center',
  },
  otherButtonText: {
    color: 'white',
    fontSize: 13,
    textAlign: 'center',
  },
  icon: {
    width: moderateScale(20),
    height: moderateScale(20),
  },
  smallIcon: {
    width: moderateScale(10),
    height: moderateScale(10),
  },
  smallMailIcon : {
    width: moderateScale(35),
    height: moderateScale(35),
    tintColor : "#b2bec3"
    
  },
  largeIcon: {
    width: moderateScale(56),
    height: moderateScale(57),
  },
  content: {
    marginHorizontal: moderateScale(10),
  },
  space: {
    marginTop: moderateScale(20),
  },
  shadowLayout: {
    marginTop: 10,
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
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: NOTES_TEXT_PADDING,
  },
  nurseAppotNotesAndOtherText: {
    fontSize: 12,
    color: APP_MAIN_BLUE_COLOR,
    paddingTop: 3,
    paddingBottom: 3,
  },
  textWhite: {
    color: WHITE,
  },
  redColor: {
    color: RED,
  },
  dropDownStyle: {
    marginHorizontal: moderateScale(20),
    marginTop: moderateScale(-20),
    flexDirection: 'row',
    borderBottomWidth: moderateScale(1),
    borderBottomColor: LINE_COLOR,
  },
  topMargin: {
    marginTop: moderateScale(30),
  },
  noRecordFound : {
    marginTop : moderateScale(20),
    textAlign : 'center',
    fontSize : moderateScale(20)
  },
  logoIcon :{
    alignSelf : 'center'
  },
  smallLogoIcon :{
    alignSelf : 'center'
    
  }
});

export default commonStyles;

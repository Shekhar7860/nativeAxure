import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {ScaledSheet, moderateScale} from 'react-native-size-matters';
import {WHITE, APP_MAIN_GREEN} from '../constants/colors';

const AddNewButtonGroup = (props) => {
  const {color} = props;
  return (
    <View>
      <TouchableOpacity
        style={{...styles.container, backgroundColor: color}}
        onPress={props.onPress}>
        <Icon
          name="ios-add-circle-outline"
          type="ionicon"
          size={moderateScale(25)}
          color={WHITE}
          style={{marginLeft : moderateScale(5), marginTop : moderateScale(2)}}
        />
        <View style={{width: '8%'}} />
        <View style={{justifyContent: 'center'}}>
          <Text style={styles.textStyle}>ADD NEW</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default AddNewButtonGroup;

const styles = ScaledSheet.create({
  container: {
    flexDirection: 'row',
    width: moderateScale(100),
    height: moderateScale(30),
    borderWidth: 1,
    borderColor: APP_MAIN_GREEN,
    borderRadius: moderateScale(15),
  },
  textStyle: {
    color: WHITE,
    fontSize: moderateScale(8),
  },
});

import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {ScaledSheet, moderateScale} from 'react-native-size-matters';
import {WHITE, APP_MAIN_GREEN, BORDER_COLOR} from '../constants/colors';
import TouchableImage from './TouchableImage';
import InputBox from './InputBox';
import commonStyles from '../commonStyles/commonStyles';
import {SEARCH, CROSS2} from '../constants/Images';

const SearchWithCross = (props) => {
	return (
			<TouchableOpacity style={styles.row} >
            <InputBox
              placeHolder="What are you searching for?"
              boxStyle={styles.inputBoxStyle}
              inputStyle={styles.input}
              onChangeText={(value) => props.onSearchPress(value)}
              />
            <TouchableImage image={CROSS2} imageStyle={styles.icon} onPress={props.onImagePress}/>
		   </TouchableOpacity>
	);
};

const styles = ScaledSheet.create({
    row: {
        flexDirection: 'row',
        borderWidth : 1,
        alignItems : 'center',
        height : moderateScale(40),
        justifyContent : 'center',
        marginTop: moderateScale(10),
        borderRadius : moderateScale(20),
        width : '100%',
        borderColor : BORDER_COLOR
      },
	icon: {
		width: moderateScale(15),
		height: moderateScale(15),
		marginTop : moderateScale(-2),
		marginRight: moderateScale(10),
    },
    inputBoxStyle: {
        marginTop: moderateScale(-10),
        height: moderateScale(40),
        width : '90%',
        
        
      },
      input: {
        fontWeight: 'normal',
        justifyContent : 'center',
        alignItems : 'center',
        fontSize: moderateScale(16),
      }
    
});

export default SearchWithCross;

import React, {PureComponent} from 'react';
import {View, Text, TouchableOpacity, Image} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { ScaledSheet, moderateScale } from 'react-native-size-matters';
import {WHITE, APP_MAIN_GREEN} from '../constants/colors';
import TouchableImage from './TouchableImage';
import 	commonStyles from '../commonStyles/commonStyles';
import {SEARCH, rightArrow} from '../constants/Images';

class CardWithIcon extends PureComponent   {

  constructor(props){
    super(props)
  }
		render (){
	const {color, count, status, amount} = this.props;
	return(
	<TouchableOpacity>
	<TouchableOpacity style={{...styles.card, backgroundColor : color, borderColor : color}} onPress={this.props.onPress}>
	<Text style={styles.text}>{count} {status}</Text>
	<Image source={rightArrow} style={{...commonStyles.icon, ...styles.imageStyle}}/>
	<Text style={styles.amount}> {amount}</Text>
	</TouchableOpacity>
	</TouchableOpacity>)
}

}

const styles = ScaledSheet.create({
	card : {
     width : moderateScale(330),
  	height : moderateScale(85),
  	borderWidth : 1,
  	borderRadius : moderateScale(15),
  	marginTop : moderateScale(17)
	},
	icon : {
	width : moderateScale(18),
	 height : moderateScale(18), 
	alignSelf : 'flex-end',
    marginRight : moderateScale(10),

	},
	text : {
	margin : moderateScale(10),
	color : WHITE,
	fontSize : moderateScale(11)
	},
	imageStyle : {
	alignSelf : 'flex-end',
		 marginRight : moderateScale(10), 
		 tintColor : WHITE,
		  marginTop : moderateScale(-10)
	},
	amount : {
		marginLeft : moderateScale(10),
		marginTop : moderateScale(-10),
		fontSize : moderateScale(15),
		color : WHITE
	}
});

export default CardWithIcon;
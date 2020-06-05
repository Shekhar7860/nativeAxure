import React, {PureComponent} from 'react'
import Header from '../../components/Header';
import commonStyles from '../../commonStyles/commonStyles';
import {APP_LIGHT_BLUE_COLOR, SEMI_TRANSPARENT, NOTIFICATION_COUNT_BG_COLOR} from '../../constants/colors'
import {USER} from '../../constants/Images';
import { ScaledSheet, moderateScale } from 'react-native-size-matters';
import TouchableImage from '../../components/TouchableImage';
import {View, Text, Button, SafeAreaView, Image} from 'react-native';

export default class Quotes extends PureComponent {
	componentDidMount = () => {
		//this.props.navigation.navigate('Cart')
	}
	render(){
	return (<SafeAreaView style={commonStyles.ketboardAvoidingContainer}><Header  navigation={this.props.navigation} rightImage={USER} title="QUOTES"/>
		    </SafeAreaView>)
	}
}

const styles = ScaledSheet.create({
  
  imageTextRow : {
  flexDirection : 'row',
  marginHorizontal : moderateScale(20)
  },
  subHeader : {
  	color : NOTIFICATION_COUNT_BG_COLOR
  },
  row : {
  	flexDirection : 'row',
  	justifyContent : 'space-between',
  	marginTop : moderateScale(20),
  	marginHorizontal : moderateScale(20)

  }
   });

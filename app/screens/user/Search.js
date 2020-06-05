import React, {PureComponent} from 'react'
import Header from '../../components/Header';
import commonStyles from '../../commonStyles/commonStyles';
import {APP_LIGHT_BLUE_COLOR, SEMI_TRANSPARENT, NOTIFICATION_COUNT_BG_COLOR} from '../../constants/colors'
import {CROSS, SEARCH} from '../../constants/Images';
import { ScaledSheet, moderateScale } from 'react-native-size-matters';
import TouchableImage from '../../components/TouchableImage';
import {View, Text, Button, SafeAreaView, Image} from 'react-native';

export default class Search extends PureComponent {
	componentDidMount = () => {
		//this.props.navigation.navigate('Cart')
	}
	render(){
	return (<SafeAreaView style={commonStyles.ketboardAvoidingContainer}><Header  navigation={this.props.navigation} rightImage={CROSS} title="SEARCH"/>
		    <View style={styles.row}>
		    <View style={{width:'20%'}}/>
		    <Text style={styles.subHeader}>What are you searching for? </Text>
		    <TouchableImage
                image={SEARCH}
                imageStyle={commonStyles.icon}
                
              />
		    </View>
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

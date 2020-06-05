import React, {PureComponent} from 'react'
import Header from '../../components/Header';
import ButtonDefault from '../../components/ButtonDefault';
import BoldText from '../../components/BoldText';
import commonStyles from '../../commonStyles/commonStyles';
import {APP_LIGHT_BLUE_COLOR, SEMI_TRANSPARENT, NOTIFICATION_COUNT_BG_COLOR, APP_MAIN_COLOR, WHITE} from '../../constants/colors'
import {USER} from '../../constants/Images';
import { ScaledSheet, moderateScale } from 'react-native-size-matters';
import TouchableImage from '../../components/TouchableImage';
import {View, Text, Button, SafeAreaView, Image, TouchableOpacity, FlatList} from 'react-native';

export default class ResourceHub extends PureComponent {

  constructor (props){
    super(props)
    this.state = {
      buttonItems :[{text : 'Home'}, {text : 'Technology'}, {text : 'Health'}]
    }
  }
	componentDidMount = () => {
		//this.props.navigation.navigate('Cart')
	}

  getButtonItem = (item, index) => {
    return (
      <View style={styles.rowItem}>
          <TouchableOpacity style={styles.button}>
           <Text style={styles.buttonText}>{item.text}</Text>
           </TouchableOpacity>
                 </View>
    );
  };

	render(){
    const {buttonItems} = this.state;

	return (
         <SafeAreaView>
          <Header  navigation={this.props.navigation} rightImage={USER} title="RESOURCE HUB"/>
          <FlatList
                  style={styles.patientFlatList}
                  horizontal={true}
                  data={buttonItems}
                  extraData={this.state}
                  keyExtractor={(item, index) => '' + index}
                  renderItem={({item, index}) => this.getButtonItem(item, index)}
                />
            <BoldText style={styles.boldTextStyle}>Content Dashboard</BoldText>
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
  boldTextStyle : {
  marginHorizontal : moderateScale(30),
  marginTop : moderateScale(30),
  fontSize : moderateScale(37)

  },
  button : {
    width : moderateScale(120),
    height : moderateScale(50),
    backgroundColor : APP_MAIN_COLOR,
    borderRadius : moderateScale(25),
    justifyContent : 'center',
    alignItems : 'center'
  },
  buttonText : {
    color : WHITE
  },
  row : {
  	flexDirection : 'row',
  	justifyContent : 'space-between',
  	marginTop : moderateScale(20),
  	marginHorizontal : moderateScale(20)

  },
  patientFlatList : {marginLeft : moderateScale(40), marginTop : moderateScale(10)},
  rowItem : {width : moderateScale(140)}
   });
  
  

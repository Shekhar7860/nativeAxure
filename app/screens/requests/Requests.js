import React, {Component} from 'react'
import Header from '../../components/Header';
import commonStyles from '../../commonStyles/commonStyles';
import {APP_LIGHT_BLUE_COLOR, LIGHTEST_GRAY, SEMI_TRANSPARENT,WHITE,DARK_BLUE, NOTIFICATION_COUNT_BG_COLOR, APP_MAIN_GREEN, APP_MAIN_BLUE, APP_MAIN_COLOR} from '../../constants/colors'
import {USER, MAIL} from '../../constants/Images';
import { ScaledSheet, moderateScale } from 'react-native-size-matters';
import AddNewButtonGroup from '../../components/AddNewButtonGroup';
import ContainerSearch from '../../components/ContainerSearch';
import CardWithIcon from '../../components/CardWithIcon';
import HR from '../../components/HR';
import {View, Text, Button, SafeAreaView, Image, TouchableOpacity, FlatList, ScrollView} from 'react-native';

export default class Requests extends Component {

  constructor(props){
    super(props)
    this.state ={
      items : [1, 2]
    }
  }
	componentDidMount = () => {
		//this.props.navigation.navigate('Cart')
	}


addQuote = () => {
 this.props.navigation.navigate('AddQuote')
}

 openQuote = () => {
    this.props.navigation.navigate('Quote')
  }

  listItem = (item, index) => {
    return (
      <TouchableOpacity style={styles.rowItem} >
          <View style={styles.card}>
           <View style={styles.newTextBackground}>
           <Text style={styles.textColor}>New</Text>
           </View>
          <View style={styles.cardRow}>
          <View style={styles.roundBackground}/>
          <View style={{width: '5%'}}/> 
          <View style={{width: '10%'}}> 
          <Image source={MAIL} style={commonStyles.icon}/>
          </View>
          <View style={{width : '40%'}}>
            <Text style={styles.labelText}>James Dean</Text>
          </View>
          <View style={{width: '10%'}}/>
          </View>

          <View style={styles.secondRow}>
          <Text>Payment failed? </Text>
          <Text> # 1</Text>
          </View>

           <View style={styles.secondRow}>
          <Text style={styles.labelText}>Created 36 minutes ago? </Text>
          <Text style={styles.labelText}>> First Response Due in 5 hours</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };
	render(){
    const {items} = this.state;

	return (<SafeAreaView style={{ ...commonStyles.ketboardAvoidingContainer, backgroundColor : LIGHTEST_GRAY}}>
        <Header  navigation={this.props.navigation} rightImage={USER} title="SUPPORT REQUESTS"/>
       
        <View style={styles.rowContent}>
        <View style={{marginLeft : moderateScale(20), justifyContent : 'center'}}>
         <Text style={{fontSize : moderateScale(10)}}> Data Created </Text>
        </View>
        <View style={{marginRight : moderateScale(-10)}}>
        
        </View>
        </View>
         <TouchableOpacity style={commonStyles.content} >
        
         
        
        <FlatList
                  style={styles.parentFlatList}
                  data={items}
                  extraData={this.state}
                  keyExtractor={(item, index) => '' + index}
                  renderItem={({item, index}) => this.listItem(item, index)}
                />
        
        </TouchableOpacity>
		    </SafeAreaView>)
	}
}

const styles = ScaledSheet.create({
  subHeader : {
  	color : NOTIFICATION_COUNT_BG_COLOR
  },
  bottomQuotesRow : {
  flexDirection : 'row',
  marginHorizontal : moderateScale(10),
  alignItems : 'center',
  justifyContent : 'center'
  },
  roundBackground : {
  height : moderateScale(30),
  width : moderateScale(30),
  borderRadius : moderateScale(15),
  backgroundColor : APP_MAIN_BLUE
  },
  parentFlatList : {
 marginTop : moderateScale(10)  },
  rowItem : {
    
  },
    rowContent : {
  	flexDirection : 'row',
  	justifyContent : 'space-between',
  	marginTop : moderateScale(10),
    backgroundColor : WHITE,
    height : moderateScale(40)
  },
   cardRow : {
    flexDirection : 'row',
    width : '100%',
    marginHorizontal : moderateScale(10),
    marginTop : moderateScale(0),
  },
    labelText : {
    fontSize : moderateScale(8)
  },
   amountText : {
    fontSize : moderateScale(10)
  },
  rowItem : {
    borderTopWidth : 1,
    borderColor : "#e6e6e6",
    justifyContent : 'center',
},
card : {
  backgroundColor : WHITE
},
newTextBackground : {
  alignSelf : 'flex-end',
   marginRight : moderateScale(10), 
   backgroundColor : APP_MAIN_GREEN, 
  width : moderateScale(40), 
  justifyContent : 'center', 
  alignItems : 'center', 
  marginTop : moderateScale(10)
},
textColor : {
  color : WHITE,
  fontSize : moderateScale(8)
},
secondRow : {
  flexDirection : 'row',
  marginHorizontal : moderateScale(10)
}
   });
  
  
  
  

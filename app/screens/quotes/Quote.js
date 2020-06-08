import React, {PureComponent} from 'react'
import Header from '../../components/Header';
import commonStyles from '../../commonStyles/commonStyles';
import {APP_LIGHT_BLUE_COLOR, SEMI_TRANSPARENT,WHITE,DARK_BLUE, NOTIFICATION_COUNT_BG_COLOR, APP_MAIN_GREEN, APP_MAIN_BLUE, APP_MAIN_COLOR} from '../../constants/colors'
import {USER, BACK, TASK} from '../../constants/Images';
import { ScaledSheet, moderateScale } from 'react-native-size-matters';
import AddNewButtonGroup from '../../components/AddNewButtonGroup';
import ContainerSearch from '../../components/ContainerSearch';
import CardWithIcon from '../../components/CardWithIcon';
import HR from '../../components/HR';
import {View, Text, Button, SafeAreaView, Image, TouchableOpacity, FlatList, ScrollView} from 'react-native';

export default class Quote extends PureComponent {

  constructor(props){
    super(props)
    this.state ={
      items : [1, 2, 3, 4]
    }
  }
  componentDidMount = () => {
    //this.props.navigation.navigate('Cart')
  }

  render(){
    const {items} = this.state;

  return (<SafeAreaView style={commonStyles.ketboardAvoidingContainer}>
        <Header  navigation={this.props.navigation} rightImage={USER} title="QUOTE" leftImage={BACK} />
        <View style={commonStyles.content}>
        <View style={styles.rowContent}>
        <View style={{marginLeft : moderateScale(-20)}}>
        
        </View>
        <View style={{marginRight : moderateScale(-10)}}>
        <ContainerSearch/>
        </View>
        </View>
        
         
        <View style={styles.content}>
        <View style={styles.bottomQuotesRow}>
           <View style = {styles.blueContentWidth}>
           <View style={styles.dotBlue}/>
          </View>
          <View style = {styles.blueContentWidth}/>
          <View style={styles.mainContentWidth}>
            <Text style={styles.labelText}>Yantra Test Reseller</Text>
          </View>
          <View style={styles.emptyWidth}/>
          <View style={styles.lastTextWidth}>
           <Image source={TASK} style={commonStyles.icon}/>
           </View>
        </View>

        <View style={styles.bottomQuotesRow}>
           <View style = {styles.blueContentWidth}>
          </View>
          <View style={styles.blueContentWidth}/> 
          <View style={styles.mainContentWidth}>
            <Text style={styles.labelText}>Client Name</Text>
          </View>
          <View style={styles.emptyWidth}/>
          <View style={styles.lastTextWidth}>
           <Text style={styles.amountText}>Yantra</Text>
           </View>
        </View>

        <View style={styles.bottomQuotesRow}>
           <View style = {styles.blueContentWidth}>
          </View>
          <View style={styles.blueContentWidth}/> 
          <View style={styles.mainContentWidth}>
            <Text style={styles.labelText}>Status</Text>
          </View>
          <View style={styles.emptyWidth}/>
          <View style={styles.lastTextWidth}>
           <Text style={styles.amountText}>Pending</Text>
           </View>
        </View>

        <View style={styles.bottomQuotesRow}>
           <View style = {styles.blueContentWidth}>
          </View>
          <View style={styles.blueContentWidth}/> 
          <View style={styles.mainContentWidth}>
            <Text style={styles.labelText}>PO Reference</Text>
          </View>
          <View style={styles.emptyWidth}/>
          <View style={styles.lastTextWidth}>
           <Text style={styles.amountText}></Text>
           </View>
        </View>

        <View style={styles.bottomQuotesRow}>
           <View style = {styles.blueContentWidth}>
          </View>
          <View style={styles.blueContentWidth}/> 
          <View style={styles.mainContentWidth}>
            <Text style={styles.labelText}>Created At</Text>
          </View>
          <View style={styles.emptyWidth}/>
          <View style={styles.lastTextWidth}>
           <Text style={styles.dateText}>19-05-2020 17-41-40</Text>
           </View>
        </View>

         <View style={styles.bottomQuotesRow}>
           <View style = {styles.blueContentWidth}>
          </View>
          <View style={styles.blueContentWidth}/> 
          <View style={styles.mainContentWidth}>
            <Text style={styles.labelText}>Amount</Text>
          </View>
          <View style={styles.emptyWidth}/>
          <View style={styles.lastTextWidth}>
           <Text style={styles.amountTextLast}>£1494.00</Text>
           </View>
        </View>








        </View>







        


        </View>
        </SafeAreaView>)
  }
}

const styles = ScaledSheet.create({
  subHeader : {
    color : NOTIFICATION_COUNT_BG_COLOR
  },
  bottomQuotesRow : {
     borderTopWidth : 1,
    borderColor : "#e6e6e6",
  flexDirection : 'row',
  marginHorizontal : moderateScale(10),
  alignItems : 'center',
  justifyContent : 'center',
  height : moderateScale(40)
  },
  
  dotBlue : {
  marginTop : moderateScale(5),
  height : moderateScale(12),
  width : moderateScale(12),
  borderRadius : moderateScale(6),
  backgroundColor : APP_MAIN_BLUE
  },
   
  rowContent : {
    flexDirection : 'row',
    justifyContent : 'space-between',
    marginTop : moderateScale(20),
    marginHorizontal : moderateScale(20)

  },
   quotesRow : {
    flexDirection : 'row',
    width : '100%',
    marginHorizontal : moderateScale(10),
    marginTop : moderateScale(10),
 
  },
  button : {
    backgroundColor : DARK_BLUE,
    width : moderateScale(90),
    height : moderateScale(25),
    alignItems : 'center',
    justifyContent : 'center',
    borderWidth : 1,
    borderColor : DARK_BLUE,
    borderRadius : moderateScale(15)
  },
  labelText : {
    fontSize : moderateScale(10),
    fontWeight : 'bold'
  },
   amountText : {
    fontSize : moderateScale(10)
  },
    amountTextLast : {
    fontSize : moderateScale(12),
    fontWeight : 'bold'

  },
   dateText : {
    fontSize : moderateScale(7)
  },
  content : {
    marginTop : moderateScale(20)
},
blueContentWidth : {
  width : '5%'
},
emptyWidth : {
  width : '10%'
},
emptyWidth2 : {
  width : '10%'
},

mainContentWidth : {
  width : '50%',
  justifyContent : 'center'
},
lastTextWidth : {
  width : '30%'
},
lastTextWidth2 : {
  width : '30%'
}



   });
  
  
  
  

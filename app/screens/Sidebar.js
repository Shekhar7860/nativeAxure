import React, {PureComponent} from 'react';
import {View, Text, SafeAreaView, Image, TouchableOpacity, FlatList} from 'react-native';
import commonStyles from '../commonStyles/commonStyles';
import BoldText from '../components/ClickableText';
import {
  APP_MAIN_COLOR,
  WHITE,
  APP_MAIN_COLOR_DISABLE,
} from '../constants/colors';
import {PROFILE_PIC} from '../constants/Images';
import { useIsDrawerOpen } from '@react-navigation/drawer';
import { ScaledSheet, moderateScale } from 'react-native-size-matters';

const ITEMS = [{'name' : 'Profile'},
               {'name' : 'Clients'},
               {'name' : 'Quotes'},
               {'name' : 'Orders'},
               {'name' : 'Products'},
               {'name' : 'Support Requests'},
               {'name' : 'Upload Orders'},
               {'name' : 'Users'},
               {'name' : 'Reports'},
               {'name' : 'Resource Hub'},
               {'name' : 'Logout'}
               ]

  getRowItem = (item, index) => {
    return (
      <View style={styles.rowItem}>
      <Text style={styles.itemText}>{item.name}</Text>
      </View>
    );
  };
export default  Sidebar  = props =>  {
   const isDrawerOpen = useIsDrawerOpen();
	return(<SafeAreaView style={commonStyles.ketboardAvoidingContainer}>
		    <View style={styles.menuMargin}>
		     <View style={styles.imageTextRow}>
		     <View style={{flexDirection : 'column'}}>
		     <Text style={styles.boldText}>Seemant Verma</Text>
		     <Text style={styles.partnerText}>Partner</Text>
		     </View>
		     <View style={{width : '20%'}}/>
         {isDrawerOpen ? <TouchableOpacity>
          <Image source={PROFILE_PIC}/>
          </TouchableOpacity> : null}
		     		     </View>
	        <FlatList
                  style={styles.patientFlatList}
                  showsVerticalScrollIndicator={false}
                  data={ITEMS}
                  keyExtractor={(item, index) => '' + index}
                  renderItem={({item, index}) => getRowItem(item, index)}
                />
	        </View>
	        </SafeAreaView>)
	
}

const styles = ScaledSheet.create({
  
  imageTextRow : {
  flexDirection : 'row',
  marginHorizontal : moderateScale(20)
  },
  boldText : {
  color : WHITE,
  fontWeight : 'bold',
  fontSize : moderateScale(20)
  },
  partnerText : {
  color : WHITE,
  fontWeight : 'normal',
  fontSize : moderateScale(15),
  marginTop : moderateScale(5)
  },
    signInText : {
  marginTop : moderateScale(10),
  textAlign : 'center',
  fontSize : moderateScale(18),
  fontWeight : 'normal'
  },
  menuMargin : {
    marginTop : moderateScale(50)
  },
 rowItem : {
 	marginHorizontal : moderateScale(20),
 	marginBottom : moderateScale(15)
 },
 itemText : {
 	color : WHITE,
 	fontSize : moderateScale(15)
 },
 patientFlatList : {
 	marginTop : moderateScale(10)
 }
   });

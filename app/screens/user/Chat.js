import React, {PureComponent} from 'react';
import Header from '../../components/Header';
import TouchableImage from '../../components/TouchableImage';
import commonStyles from '../../commonStyles/commonStyles';
import {SEARCH, SLIDE_1, SLIDE_2} from '../../constants/Images';
import {View, Text, Button, SafeAreaView, FlatList} from 'react-native';
import {ScaledSheet, moderateScale} from 'react-native-size-matters';
import {FRESH_CHAT_APP_ID, FRESH_CHAT_ID_APP_KEY} '../../constants/config';
import { Freshchat, FreshchatConfig } from 'react-native-freshchat-sdk';

export default class Chat extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      imagesList: [{image: SLIDE_1}, {image: SLIDE_2}],
    };
  }
  componentDidMount = () => {
    var freshchatConfig = new FreshchatConfig(FRESH_CHAT_APP_ID, FRESH_CHAT_ID_APP_KEY);
    Freshchat.init(freshchatConfig);
    //this.props.navigation.navigate('Cart')
  };

  openScreen = (index) => {
    if (index == 0) {
      this.props.navigation.navigate('Quotes');
    } else {
      this.props.navigation.navigate('Resource');
    }
  };

  getImageItem = (item, index) => {
    return (
      <View style={styles.rowItem}>
        <TouchableImage
          image={item.image}
          imageStyle={styles.image}
          onPress={() => this.openScreen(index)}
        />
      </View>
    );
  };

  render() {
    const {imagesList} = this.state;
    return (
      <SafeAreaView style={commonStyles.ketboardAvoidingContainer}>
        <Header
          navigation={this.props.navigation}
          title="MPH GROUP"
          rightImage={SEARCH}
        />
        {/* horizontal list */}
        <FlatList
          style={styles.patientFlatList}
          horizontal={true}
          data={imagesList}
          extraData={this.state}
          keyExtractor={(item, index) => '' + index}
          renderItem={({item, index}) => this.getImageItem(item, index)}
        />
      </SafeAreaView>
    );
  }
}

const styles = ScaledSheet.create({
  patientFlatList: {
    marginTop: moderateScale(10),
  },
  rowItem: {
    marginRight: moderateScale(-20),
  },
  image: {
    height: moderateScale(500),
    width: moderateScale(310),
  },
});

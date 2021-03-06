import React, {PureComponent} from 'react';
import Header from '../../components/Header';
import TouchableImage from '../../components/TouchableImage';
import commonStyles from '../../commonStyles/commonStyles';
import {
  SEARCH,
  SLIDE_1,
  SLIDE_2,
  BACK,
  CHAT_PIC,
  DRAWER_MENU,
} from '../../constants/Images';
import {
  View,
  Text,
  Button,
  SafeAreaView,
  FlatList,
  Image,
  TouchableOpacity,
} from 'react-native';
import {APP_MAIN_BLUE} from '../../constants/colors';
import {ScaledSheet, moderateScale} from 'react-native-size-matters';
import {FRESH_CHAT_APP_ID, FRESH_CHAT_ID_APP_KEY} from '../../constants/config';
// import {Freshchat, FreshchatConfig} from 'react-native-freshchat-sdk';

export default class Chat extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      imagesList: [1, 2],
    };
  }
  componentDidMount = () => {
    // var freshchatConfig = new FreshchatConfig(
    //   FRESH_CHAT_APP_ID,
    //   FRESH_CHAT_ID_APP_KEY,
    // );
    // Freshchat.init(freshchatConfig);
    //this.props.navigation.navigate('Cart')
  };

  openScreen = (screen, param) => {
    this.props.navigation.navigate(screen, {clientData: param});
  };

  getChatItem = (item, index) => {
    return (
      <View style={styles.rowItem}>
        <TouchableOpacity
          style={styles.chatRow}
          onPress={() => this.openScreen('ChatScreen', 'Jane')}>
          <TouchableImage image={CHAT_PIC} imageStyle={styles.chatImage} />

          <View style={styles.textColumn}>
            <Text style={styles.name}>Jenet Fowler </Text>
            <Text style={styles.message}>I am going to San Francisco.... </Text>
          </View>

          <View style={styles.textColumn}>
            <Text style={styles.message}>now</Text>
            <View style={styles.dotBlue} />
          </View>

          <View style={{width: '5%'}} />
        </TouchableOpacity>
      </View>
    );
  };

  render() {
    const {imagesList} = this.state;
    return (
      <SafeAreaView style={commonStyles.ketboardAvoidingContainer}>
        <Header
          navigation={this.props.navigation}
          title="CHAT"
          rightImage={SEARCH}
          leftImage={DRAWER_MENU}
        />
        {/* horizontal list */}
        <FlatList
          style={styles.patientFlatList}
          data={imagesList}
          extraData={this.state}
          keyExtractor={(item, index) => '' + index}
          renderItem={({item, index}) => this.getChatItem(item, index)}
        />
      </SafeAreaView>
    );
  }
}

const styles = ScaledSheet.create({
  patientFlatList: {
    marginTop: moderateScale(40),
  },
  rowItem: {
    marginRight: moderateScale(-20),
    marginBottom: moderateScale(20),
  },
  image: {
    height: moderateScale(500),
    width: moderateScale(310),
  },
  chatRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  chatImage: {
    width: moderateScale(50),
    height: moderateScale(50),
  },
  textColumn: {
    flexDirection: 'column',
  },
  name: {
    fontWeight: 'bold',
    fontSize: moderateScale(10),
  },
  message: {
    fontSize: moderateScale(8),
  },
  dotBlue: {
    marginTop: moderateScale(5),
    height: moderateScale(12),
    width: moderateScale(12),
    borderRadius: moderateScale(6),
    backgroundColor: APP_MAIN_BLUE,
  },
});

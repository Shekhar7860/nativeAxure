import React, {PureComponent} from 'react';
import Header from '../../components/Header';
import TouchableImage from '../../components/TouchableImage';
import commonStyles from '../../commonStyles/commonStyles';
import {SEARCH, SLIDE_1, SLIDE_2, BACK, CHAT_PIC} from '../../constants/Images';
import {View, Text, Button, SafeAreaView, FlatList, Image} from 'react-native';
import {APP_MAIN_BLUE} from '../../constants/colors';
import {ScaledSheet, moderateScale} from 'react-native-size-matters';

export default class Chat extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      imagesList: [1, 2],
    };
  }
  componentDidMount = () => {
    //this.props.navigation.navigate('Cart')
  };

  openScreen = (index) => {
    if (index == 0) {
      this.props.navigation.navigate('Quotes');
    } else {
      this.props.navigation.navigate('Resource');
    }
  };

  getChatItem = (item, index) => {
    return (
      <View style={styles.rowItem}>
        <View style={styles.chatRow}>
          <TouchableImage
            image={CHAT_PIC}
            imageStyle={styles.chatImage}
            onPress={() => this.openScreen(index)}
          />

          <View style={styles.textColumn}>
            <Text style={styles.name}>Jenet Fowler </Text>
            <Text style={styles.message}>I am going to San Francisco.... </Text>
          </View>

          <View style={styles.textColumn}>
            <Text style={styles.message}>now</Text>
            <View style={styles.dotBlue} />
          </View>

          <View style={{width: '5%'}} />
        </View>
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
          leftImage={BACK}
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

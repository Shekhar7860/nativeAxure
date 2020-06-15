import React, {PureComponent} from 'react';
import Header from '../../components/Header';
import TouchableImage from '../../components/TouchableImage';
import commonStyles from '../../commonStyles/commonStyles';
import {
  SEARCH,
  SLIDE_1,
  SLIDE_2,
  SLIDE_3,
  SLIDE_4,
  SLIDE_5,
  SLIDE_6,
} from '../../constants/Images';
import {View, Text, Button, SafeAreaView, FlatList} from 'react-native';
import BaseScreen from '../../components/BaseScreen';
import {ScaledSheet, moderateScale} from 'react-native-size-matters';

export default class Chat extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      imagesList: [
        {image: SLIDE_1},
        {image: SLIDE_2},
        {image: SLIDE_3},
        {image: SLIDE_4},
        {image: SLIDE_5},
        {image: SLIDE_6},
      ],
    };
  }
  componentDidMount = () => {
    //this.props.navigation.navigate('Cart')
  };

  openScreen = (index) => {
    switch (index) {
      case 0:
        this.props.navigation.navigate('Quotes');
        break;
      case 2:
        this.props.navigation.navigate('Users');
        break;
      case 5:
        this.props.navigation.navigate('Resource');
        break;
      default:
      // code block
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

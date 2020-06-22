import React, {PureComponent} from 'react';
import Header from '../../components/Header';
import ButtonDefault from '../../components/ButtonDefault';
import BoldText from '../../components/BoldText';
import commonStyles from '../../commonStyles/commonStyles';
import {
  APP_LIGHT_BLUE_COLOR,
  SEMI_TRANSPARENT,
  NOTIFICATION_COUNT_BG_COLOR,
  APP_MAIN_COLOR,
  WHITE,
  BORDER_COLOR,
  DARK_TEXT_COLOR,
} from '../../constants/colors';
import {USER} from '../../constants/Images';
import {ScaledSheet, moderateScale} from 'react-native-size-matters';
import TouchableImage from '../../components/TouchableImage';
import {
  View,
  Text,
  Button,
  SafeAreaView,
  Image,
  TouchableOpacity,
  FlatList,
} from 'react-native';

export default class Notifications extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      buttonItems: [1, 2, 3, 4],
    };
  }
  componentDidMount = () => {
    // alert(JSON.stringify(this.props));
    //this.props.navigation.navigate('Cart')
  };

  getNotificationItem = (item, index) => {
    return (
      <View style={styles.rowItem}>
        <TouchableOpacity style={styles.notificationCard}>
          <Text style={styles.buttonText}>Order 51 has been shipped</Text>
        </TouchableOpacity>
      </View>
    );
  };

  render() {
    const {buttonItems} = this.state;

    return (
      <SafeAreaView>
        <Header
          navigation={this.props.navigation}
          rightImage={USER}
          title="NOTIFICATIONS"
        />
        <FlatList
          style={styles.patientFlatList}
          data={buttonItems}
          extraData={this.state}
          keyExtractor={(item, index) => '' + index}
          renderItem={({item, index}) => this.getNotificationItem(item, index)}
        />
      </SafeAreaView>
    );
  }
}

const styles = ScaledSheet.create({
  imageTextRow: {
    flexDirection: 'row',
    marginHorizontal: moderateScale(20),
  },
  subHeader: {
    color: NOTIFICATION_COUNT_BG_COLOR,
  },
  boldTextStyle: {
    marginHorizontal: moderateScale(30),
    marginTop: moderateScale(30),
    fontSize: moderateScale(37),
  },
  notificationCard: {
    width: '90%',
    height: moderateScale(70),
    justifyContent: 'center',
    alignSelf: 'center',
    borderWidth: 1,
    borderColor: BORDER_COLOR,
    borderRadius: moderateScale(10),
  },
  buttonText: {
    color: DARK_TEXT_COLOR,
    marginHorizontal: moderateScale(5),
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: moderateScale(20),
    marginHorizontal: moderateScale(20),
  },
  patientFlatList: {
    marginTop: moderateScale(30),
  },
  rowItem: {
    marginBottom: moderateScale(20),
  },
});

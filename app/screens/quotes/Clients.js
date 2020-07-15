import React, {PureComponent} from 'react';
import Header from '../../components/Header';
import commonStyles from '../../commonStyles/commonStyles';
import {
  APP_LIGHT_BLUE_COLOR,
  SEMI_TRANSPARENT,
  WHITE,
  DARK_BLUE,
  NOTIFICATION_COUNT_BG_COLOR,
  APP_MAIN_GREEN,
  APP_MAIN_BLUE,
  APP_MAIN_COLOR,
  SEE_ALL_BUTTON_COLOR
} from '../../constants/colors';
import {USER} from '../../constants/Images';
import {ScaledSheet, moderateScale} from 'react-native-size-matters';
import AddNewButtonGroup from '../../components/AddNewButtonGroup';
import ContainerSearch from '../../components/ContainerSearch';
import CardWithIcon from '../../components/CardWithIcon';
import HR from '../../components/HR';
import {
  View,
  Text,
  Button,
  SafeAreaView,
  Image,
  TouchableOpacity,
  FlatList,
  ScrollView,
} from 'react-native';

export default class Quote extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      items: [1, 2, 3, 4],
    };
  }
  componentDidMount = () => {
    //this.props.navigation.navigate('Cart')
  };

  listItem = (item, index) => {
    return (
      <View style={styles.rowItem}>
        <View style={styles.bottomQuotesRow}>
          <View style={index == 0 ? styles.dotBlue : styles.dotGreen} />
          <View style={{width: '5%'}} />
          <View style={{width: '50%', justifyContent: 'center'}}>
            <Text style={styles.labelText}>Yantra Test Reseller</Text>
          </View>
          <View style={{width: '20%'}} />
          <View style={{width: '25%'}}>
            <Text style={styles.amountText}>£1494.00</Text>
          </View>
        </View>
      </View>
    );
  };
  render() {
    const {items} = this.state;

    return (
      <SafeAreaView style={commonStyles.ketboardAvoidingContainer}>
        <Header
          navigation={this.props.navigation}
          rightImage={USER}
          title="QUOTES"
        />
        <View style={commonStyles.content}>
          <View style={styles.rowContent}>
            <View style={{marginLeft: moderateScale(-20)}}>
              <AddNewButtonGroup color={APP_MAIN_GREEN} />
            </View>
            <View style={{marginRight: moderateScale(-10)}}>
              <ContainerSearch />
            </View>
          </View>
          <CardWithIcon
            color={APP_MAIN_BLUE}
            count={1}
            status={'Pending'}
            amount={'£1494.00'}
          />
          <CardWithIcon
            color={APP_MAIN_GREEN}
            count={3}
            status={'Accepted'}
            amount={'£4482.00'}
          />
          <CardWithIcon
            color={APP_MAIN_COLOR}
            count={1}
            status={'Rejected'}
            amount={'£2274.00'}
          />

          <View style={styles.quotesRow}>
            <View style={{width: '60%'}}>
              <Text style={styles.recentText}>RECENT QUOTES</Text>
            </View>
            <View style={{width: '10%'}} />
            <View style={{width: '30%'}}>
              <TouchableOpacity style={styles.button}>
                <Text style={styles.seeText}>SEE ALL</Text>
              </TouchableOpacity>
            </View>
          </View>
          <FlatList
            style={styles.parentFlatList}
            data={items}
            extraData={this.state}
            keyExtractor={(item, index) => '' + index}
            renderItem={({item, index}) => this.listItem(item, index)}
          />
        </View>
      </SafeAreaView>
    );
  }
}

const styles = ScaledSheet.create({
  subHeader: {
    color: NOTIFICATION_COUNT_BG_COLOR,
  },
  bottomQuotesRow: {
    flexDirection: 'row',
    marginHorizontal: moderateScale(10),
    alignItems: 'center',
    justifyContent: 'center',
  },
  parentFlatList: {
    marginTop: moderateScale(10),
  },
  rowItem: {
    height: moderateScale(30),
  },
  dotBlue: {
    marginTop: moderateScale(5),
    height: moderateScale(12),
    width: moderateScale(12),
    borderRadius: moderateScale(6),
    backgroundColor: APP_MAIN_BLUE,
  },
  dotGreen: {
    marginTop: moderateScale(5),
    height: moderateScale(12),
    width: moderateScale(12),
    borderRadius: moderateScale(6),
    backgroundColor: APP_MAIN_GREEN,
  },
  rowContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: moderateScale(20),
    marginHorizontal: moderateScale(20),
  },
  recentText: {
    fontSize: moderateScale(12),
    fontWeight: 'bold',
  },
  seeText: {
    fontSize: moderateScale(11),
    color: WHITE,
  },
  quotesRow: {
    flexDirection: 'row',
    width: '100%',
    marginHorizontal: moderateScale(10),
    marginTop: moderateScale(10),
  },
  button: {
    backgroundColor: SEE_ALL_BUTTON_COLOR,
    width: moderateScale(90),
    height: moderateScale(25),
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: SEE_ALL_BUTTON_COLOR,
    borderRadius: moderateScale(15),
  },
  labelText: {
    fontSize: moderateScale(10),
  },
  amountText: {
    fontSize: moderateScale(10),
  },
  rowItem: {
    borderTopWidth: 1,
    borderColor: '#e6e6e6',
    height: moderateScale(30),
    justifyContent: 'center',
  },
});

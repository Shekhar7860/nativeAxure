import React, {Component} from 'react';
import Header from '../../components/Header';
import commonStyles from '../../commonStyles/commonStyles';
import {
  APP_LIGHT_BLUE_COLOR,
  SEMI_TRANSPARENT,
  WHITE,
  DARK_BLUE,
  ORANGE_COLOR,
  NOTIFICATION_COUNT_BG_COLOR,
  APP_MAIN_GREEN,
  APP_MAIN_BLUE,
  APP_MAIN_COLOR,
} from '../../constants/colors';
import {USER, BACK} from '../../constants/Images';
import {ScaledSheet, moderateScale} from 'react-native-size-matters';
import AddNewButtonGroup from '../../components/AddNewButtonGroup';
import ContainerSearch from '../../components/ContainerSearch';
import CardWithIcon from '../../components/CardWithIcon';
import HR from '../../components/HR';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
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
import {connect} from 'react-redux';
import OverlaySpinner from '../../components/OverlaySpinner';

class StatusWiseOrders extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items : [],
      showLoading: false,
      status : ""
    };
  }
  componentDidMount = () => {
    if (this.props.route.params) {
        console.log('pareama', this.props.route.params)
        this.setState({items : this.props.route.params.orderStatusData.list.reverse(), status : this.props.route.params.orderStatusData.status})
      }
  };

  openScreen = (screen, param) => {
    this.props.navigation.navigate(screen, {clientData: param});
  };

  dotStyle = (status) => {
    let style = styles.dotRed
    switch(status) {
      case "Shipped":
        style = styles.dotOrange;
        break;
      case "Accepted":
        style = styles.dotGreen;
        break;
      case "Partially_Shipped":
          style = styles.dotDarkblue;
          break;
      case "Completed":
       style = styles.dotLightBlue;
          break;
      default:
        style = styles.dotRed;
        // code block
    } 
    return style
  }

  listItem = (item) => {
      console.log('status', item.status)
    return (
      <TouchableOpacity style={styles.rowItem} onPress={() => this.openScreen('Quote', item)}>
        <View style={styles.bottomQuotesRow}>
        <View style={this.dotStyle(item.status)}  />
          <View style={{width: '5%'}} />
          <View style={{width: '50%', justifyContent: 'center'}}>
            <Text style={styles.labelText}>{item.name}</Text>
          </View>
          <View style={{width: '20%'}} />
          <View style={{width: '25%'}}>
            <Text style={styles.amountText}>£{item.grand_total}</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };
  render() {
    const {
      items,
      status,
      showLoading,
    } = this.state;

    return (
      <SafeAreaView style={{flex :1}}>
      <KeyboardAwareScrollView style={commonStyles.ketboardAvoidingContainer}>
        <Header
          navigation={this.props.navigation}
          rightImage={USER}
          title={status + " " +  'ORDERS'}
          leftImage={BACK}
        />

        <KeyboardAwareScrollView
          contentContainerStyle={{...commonStyles.content, flex: 1}}>
          <TouchableOpacity style={commonStyles.content}>
            <View style={styles.rowContent}>
              <View style={{marginLeft: moderateScale(-20)}}>
                <AddNewButtonGroup
                  color={APP_MAIN_GREEN}
                  onPress={() => this.openScreen('AddQuote')}
                />
              </View>
              <View style={{marginRight: moderateScale(-10)}}>
                <ContainerSearch />
              </View>
            </View>

            <TouchableOpacity style={styles.quotesRow}>
              <View style={{width: '60%'}}>
                <Text style={styles.recentText}>{status}</Text>
              </View>
              <View style={{width: '10%'}} />
              <View style={{width: '30%'}}></View>
            </TouchableOpacity>
            <FlatList
              style={styles.parentFlatList}
              data={items}
              extraData={this.state}
              keyExtractor={(item, index) => '' + index}
              renderItem={({item, index}) =>
                this.listItem(item, index)
              }
            />

            
          </TouchableOpacity>
        </KeyboardAwareScrollView>
      </KeyboardAwareScrollView>
      <OverlaySpinner
          cancelable
          visible={showLoading}
          color={WHITE}
          textContent="Please wait..."
          textStyle={{color: WHITE}}
        />
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
    backgroundColor: DARK_BLUE,
    width: moderateScale(90),
    height: moderateScale(25),
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: DARK_BLUE,
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
  dotOrange: {
    marginTop: moderateScale(5),
    height: moderateScale(12),
    width: moderateScale(12),
    borderRadius: moderateScale(6),
    backgroundColor: ORANGE_COLOR,
  },
  dotGreen: {
    marginTop: moderateScale(5),
    height: moderateScale(12),
    width: moderateScale(12),
    borderRadius: moderateScale(6),
    backgroundColor: APP_MAIN_GREEN,
  },
  dotDarkblue: {
    marginTop: moderateScale(5),
    height: moderateScale(12),
    width: moderateScale(12),
    borderRadius: moderateScale(6),
    backgroundColor: DARK_BLUE,
  },
  dotLightBlue: {
    marginTop: moderateScale(5),
    height: moderateScale(12),
    width: moderateScale(12),
    borderRadius: moderateScale(6),
    backgroundColor: APP_MAIN_BLUE,
  },
  dotRed: {
    marginTop: moderateScale(5),
    height: moderateScale(12),
    width: moderateScale(12),
    borderRadius: moderateScale(6),
    backgroundColor: APP_MAIN_COLOR,
  },
});

const mapStateToProps = (state) => ({
  quotes: state.quotes.quotesList,
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(StatusWiseOrders);

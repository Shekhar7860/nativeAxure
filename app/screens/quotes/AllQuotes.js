import React, {Component} from 'react';
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

class AllQuotes extends Component {
  constructor(props) {
    super(props);
    this.state = {
      acceptedItems: [],
      pendingItems: [],
      rejectedItems: [],
      showLoading: false,
    };
  }
  componentDidMount = () => {
    console.group('prii', this.props.quotes);
    for (var i = 0; i < this.props.quotes.items.length; i++) {
      if (this.props.quotes.items[i].status == 'Pending') {
        this.state.pendingItems.push(this.props.quotes.items[i]);
      } else if (this.props.quotes.items[i].status == 'Accepted') {
        console.log('fired', this.props.quotes.items[i] )
        this.state.acceptedItems.push(this.props.quotes.items[i]);
      } else {
        this.state.rejectedItems.push(this.props.quotes.items[i]);
      }
    }
    console.log('this', this.state.acceptedItems);
    this.setState({showLoading: true});
    setTimeout(() => {
      this.setState({
        showLoading: false,
        pendingItems: this.state.pendingItems,
        acceptedItems: this.state.acceptedItems,
        rejectedItems: this.state.rejectedItems,
      });
    }, 2000);
    // this.props.navigation.navigate('Cart')
  };

  openScreen = (screen, param) => {
    this.props.navigation.navigate(screen, {clientData: param});
  };

  listItem = (item, index, status) => {
    return (
      <TouchableOpacity style={styles.rowItem} onPress={() => this.openScreen('Quote', item)}>
        <View style={styles.bottomQuotesRow}>
          <View
            style={
              status == 'PENDING'
                ? styles.dotBlue
                : status == 'ACCEPTED'
                ? styles.dotGreen
                : styles.dotRed
            }
          />
          <View style={{width: '5%'}} />
          <View style={{width: '50%', justifyContent: 'center'}}>
            <Text style={styles.labelText}>{item.billing_company_name}</Text>
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
      acceptedItems,
      pendingItems,
      rejectedItems,
      showLoading,
    } = this.state;

    return (
      <KeyboardAwareScrollView style={commonStyles.ketboardAvoidingContainer}>
        <Header
          navigation={this.props.navigation}
          rightImage={USER}
          title="ALL QUOTES"
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
                <Text style={styles.recentText}>PENDING</Text>
              </View>
              <View style={{width: '10%'}} />
              <View style={{width: '30%'}}></View>
            </TouchableOpacity>
            <FlatList
              style={styles.parentFlatList}
              data={pendingItems}
              extraData={this.state}
              keyExtractor={(item, index) => '' + index}
              renderItem={({item, index}) =>
                this.listItem(item, index, 'PENDING')
              }
            />

            <TouchableOpacity style={styles.quotesRow}>
              <View style={{width: '60%'}}>
                <Text style={styles.recentText}>ACCEPTED</Text>
              </View>
              <View style={{width: '10%'}} />
              <View style={{width: '30%'}}></View>
            </TouchableOpacity>
            <FlatList
              style={styles.parentFlatList}
              data={acceptedItems}
              extraData={this.state}
              keyExtractor={(item, index) => '' + index}
              renderItem={({item, index}) =>
                this.listItem(item, index, 'ACCEPTED')
              }
            />

            <TouchableOpacity style={styles.quotesRow}>
              <View style={{width: '60%'}}>
                <Text style={styles.recentText}>REJECTED</Text>
              </View>
              <View style={{width: '10%'}} />
              <View style={{width: '30%'}}></View>
            </TouchableOpacity>

            <FlatList
              style={styles.parentFlatList}
              data={rejectedItems}
              extraData={this.state}
              keyExtractor={(item, index) => '' + index}
              renderItem={({item, index}) =>
                this.listItem(item, index, 'REJECTED')
              }
            />
          </TouchableOpacity>
        </KeyboardAwareScrollView>
        <OverlaySpinner
          cancelable
          visible={showLoading}
          color={WHITE}
          textContent="Please wait..."
          textStyle={{color: WHITE}}
        />
      </KeyboardAwareScrollView>
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
  dotRed: {
    marginTop: moderateScale(5),
    height: moderateScale(12),
    width: moderateScale(12),
    borderRadius: moderateScale(6),
    backgroundColor: APP_MAIN_COLOR,
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
});

const mapStateToProps = (state) => ({
  quotes: state.quotes.quotesList,
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(AllQuotes);

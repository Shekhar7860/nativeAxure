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
import {USER, leftArrow} from '../../constants/Images';
import {ScaledSheet, moderateScale} from 'react-native-size-matters';
import AddNewButtonGroup from '../../components/AddNewButtonGroup';
import ContainerSearch from '../../components/ContainerSearch';
import CardWithIcon from '../../components/CardWithIcon';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import HR from '../../components/HR';
import {getQuotesList} from '../../redux/reducers/quotes';
import {connect} from 'react-redux';
import OverlaySpinner from '../../components/OverlaySpinner';


import {
  View,
  Text,
  Alert,
  Button,
  SafeAreaView,
  Image,
  TouchableOpacity,
  FlatList,
  ScrollView
} from 'react-native';

class Quotes extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      items: [1, 2, 3, 4],
      showLoading: false,
      pendingItems: [],
      acceptedItems: [],
      rejectedItems: [],
      pendingItemsCount: 0,
      acceptedItemsCount: 0,
      rejectedItemsCount: 0,
      pendingItemsTotal: 0,
      acceptedItemsTotal: 0,
      rejectedItemsTotal: 0,
      quoteCurrency : ""
    };
  }
  componentDidMount = () => {
    this.init();
    this._sub = this.props.navigation.addListener('didFocus', () => {
      this.init();
    });
     
  };

  init = () => {
      const {online} = this.props;
      if (online) {
        this.setState({showLoading: true});
        this.props
          .getQuotesList()
          .then((response) => {
            console.log('quotes', response);
            this.setState({showLoading: false});
            if (response.code === 200) {
              let pendingSum = 0;
              let acceptedSum = 0;
              let rejectedSum = 0;
              let arr = response.data.items
                .slice(Math.max(response.data.items.length - 5, 1))
                .reverse();
              this.setState({items: arr});
              for (var i = 0; i < response.data.items.length; i++) {
                if (response.data.items[i].status == 'Pending') {
                  this.state.pendingItems.push(response.data.items[i]);
                  pendingSum += response.data.items[i].grand_total;
                } else if (response.data.items[i].status == 'Accepted') {
                  acceptedSum += response.data.items[i].grand_total;
                  this.state.acceptedItems.push(
                    response.data.items[i]
                  );
                } else {
                  rejectedSum += response.data.items[i].grand_total;
                  this.state.rejectedItems.push(
                    response.data.items[i]
                  );
                }
              }
              //  alert(pendingSum);
              this.setState({
                pendingItemsCount: this.state.pendingItems.length,
                acceptedItemsCount: this.state.acceptedItems.length,
                rejectedItemsCount: this.state.rejectedItems.length,
                pendingItemsTotal: pendingSum.toFixed(2),
                acceptedItemsTotal: acceptedSum.toFixed(2),
                rejectedItemsTotal: rejectedSum.toFixed(2),
                pendingItems: this.state.pendingItems,
                acceptedItems: this.state.acceptedItems,
                rejectedItems: this.state.rejectedItems,
              });
            }
          })
          .catch((error) => {
            this.setState({showLoading: false});
            if (error.code === 'unauthorized') {
              showErrorPopup(
                "Couldn't validate those credentials.\nPlease try again",
              );
            } else {
              showErrorPopup(
                'There was an unexpected error.\nPlease wait a few minutes and try again.',
              );
            }
          });
      } else {
        Alert.alert('', 'No Internet Connection');
      }
   
   
  
 
  }

  openScreen = (screen, param, status) => {
    let data = {
      'status' : status,
      'list' : param
    }
    this.props.navigation.navigate(screen, {quoteStatusData: data});
  };

  listItem = (item, index) => {

    return (
      <TouchableOpacity
        style={styles.rowItem}
        >
        <View style={styles.bottomQuotesRow}>
          <View
            style={
              item.status == 'Pending'
                ? styles.dotBlue
                : item.status == 'Accepted'
                ? styles.dotGreen
                : styles.dotPink
            }
          />
          <View style={{width: '5%'}} />
          <View style={{width: '50%', justifyContent: 'center'}}>
            <Text style={styles.labelText}>{item.name}</Text>
          </View>
          <View style={{width: '20%'}} />
          <View style={{width: '15%'}}>
            <Text style={styles.amountText}>£{item.grand_total}</Text>
          </View>
          <View style={{width: '5%'}} />
          <View style={{width:'5%'}}>
          <Image source={leftArrow} style={commonStyles.smallIcon}/>
          </View>
        </View>
      </TouchableOpacity>
    );
  };
  render() {
    const {
      items,
      showLoading,
      pendingItemsCount,
      acceptedItemsCount,
      rejectedItemsCount,
      pendingItemsTotal,
      acceptedItemsTotal,
      rejectedItemsTotal,
      pendingItems,
      acceptedItems, 
      rejectedItems
    } = this.state;

    return (
      <SafeAreaView style={commonStyles.ketboardAvoidingContainer}>
        <Header
          navigation={this.props.navigation}
          rightImage={USER}
          title="QUOTES"
        />
        <KeyboardAwareScrollView
          contentContainerStyle={{...commonStyles.content}}>
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
          <CardWithIcon
            color={APP_MAIN_BLUE}
            count={pendingItemsCount}
            status={'Pending'}
            amount={'£' + ' ' + pendingItemsTotal}
            onPress={() => this.openScreen('StatusQuotes', pendingItems, 'PENDING')}
            amountStyle={styles.amountTextStyle}
            statusStyle={styles.statusTextStyle}
          />
          <CardWithIcon
            color={APP_MAIN_GREEN}
            count={acceptedItemsCount}
            status={'Accepted'}
            amount={'£' + ' ' + acceptedItemsTotal}
            onPress={() => this.openScreen('StatusQuotes', acceptedItems, 'ACCEPTED')}
            amountStyle={styles.amountTextStyle}
            statusStyle={styles.statusTextStyle}
          />
          <CardWithIcon
            color={APP_MAIN_COLOR}
            count={rejectedItemsCount}
            status={'Rejected'}
            amount={'£' + ' ' + rejectedItemsTotal}
            onPress={() => this.openScreen('StatusQuotes', rejectedItems, 'REJECTED')}
            amountStyle={styles.amountTextStyle}
            statusStyle={styles.statusTextStyle}
          />

          <TouchableOpacity style={styles.quotesRow}>
            <View style={{width: '60%'}}>
              <Text style={styles.recentText}>RECENT QUOTES</Text>
            </View>
            <View style={{width: '20%'}} />
            <View style={{width: '20%'}}>
              <TouchableOpacity
                style={styles.button}
                onPress={() => this.openScreen('AllQuotes')}>
                <Text style={styles.seeText}>SEE ALL</Text>
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
          <FlatList
            style={styles.parentFlatList}
            data={items}
            extraData={this.state}
            keyExtractor={(item, index) => '' + index}
            renderItem={({item, index}) => this.listItem(item, index)}
          />
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
    marginTop: moderateScale(10)
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
  dotPink: {
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
    backgroundColor: SEE_ALL_BUTTON_COLOR,
    width: moderateScale(55),
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
  amountTextStyle : {
    fontSize : moderateScale(20),
    fontWeight : 'bold'
  },
  statusTextStyle : {
    fontSize : moderateScale(13),
    fontWeight : 'bold'
  }
});

const mapStateToProps = (state) => ({
  online: state.netInfo.online
});

const mapDispatchToProps = {
  getQuotesList
};

export default connect(mapStateToProps, mapDispatchToProps)(Quotes);

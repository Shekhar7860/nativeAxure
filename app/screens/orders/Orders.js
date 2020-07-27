import React, {Component} from 'react';
import Header from '../../components/Header';
import commonStyles from '../../commonStyles/commonStyles';
import {
  APP_LIGHT_BLUE_COLOR,
  ORANGE_COLOR,
  CARD_DARK_BLUE,
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
import SearchWithCross from '../../components/SearchWithCross';
import HR from '../../components/HR';
import {commafy} from '../../util/utils';
import {connect} from 'react-redux';
import {getOrdersList, searchOrder} from '../../redux/reducers/orders';
import OverlaySpinner from '../../components/OverlaySpinner';
import {
  View,
  Text,
  Button,
  SafeAreaView,
  Image,
  TouchableOpacity,
  FlatList,
  ScrollView,
  Dimensions,
  Alert,
} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {isEmailValid, showErrorPopup} from '../../util/utils';

class Orders extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [1,2,3],
      showLoading: false,
      shippedItems: [],
      acceptedItems: [],
      partiallyShippedItems: [],
      completedItems: [],
      cancelledItems: [],
      shippedItemsCount: 0,
      acceptedItemsCount: 0,
      partiallyShippedItemsCount: 0,
      completedItemsCount: 0,
      cancelledItemsCount: 0,
      shippedItemsTotal: 0,
      acceptedItemsTotal: 0,
      partiallyShippedItemsTotal: 0,
      completedItemsTotal: 0,
      cancelledItemsTotal: 0,
      searchBar : false,
      searchResult : false
    };
  }
  componentDidMount = () => {
    const {online} = this.props;

    if (online) {
      this.setState({showLoading: true});
      this.props
        .getOrdersList()
        .then((response) => {
        //  console.group('responseOrders', response);
          this.setState({showLoading: false});
          if (response.code === 200) {
            let shippedSum = 0;
            let acceptedSum = 0;
            let partiallyShippedSum = 0;
            let completedSum = 0;
            let cancelledSum = 0;

            for (var i = 0; i < response.data.items.length; i++) {
              if (response.data.items[i].status == 'Shipped') {
                this.state.shippedItems.push(response.data.items[i]);
                shippedSum += response.data.items[i].grand_total;
              } else if (response.data.items[i].status == 'Accepted') {
                acceptedSum += response.data.items[i].grand_total;
                this.state.acceptedItems.push(
                  response.data.items[i],
                );
              } else if (response.data.items[i].status == 'Partially_Shipped') {
                partiallyShippedSum += response.data.items[i].grand_total;
                this.state.partiallyShippedItems.push(
                  response.data.items[i],
                );
              } else if (response.data.items[i].status == 'Completed') {
                completedSum += response.data.items[i].grand_total;
                this.state.completedItems.push(
                  response.data.items[i],
                );
              } else {
                cancelledSum += response.data.items[i].grand_total;
                this.state.cancelledItems.push(
                  response.data.items[i],
                );
              }
            }
            //  alert(pendingSum);
            this.setState({
              shippedItemsCount: this.state.shippedItems.length,
              acceptedItemsCount: this.state.acceptedItems.length,
              partiallyShippedItemsCount: this.state.partiallyShippedItems
                .length,
              completedItemsCount: this.state.completedItems.length,
              cancelledItemsCount: this.state.cancelledItems.length,
              shippedItemsTotal: shippedSum.toFixed(2),
              acceptedItemsTotal: acceptedSum.toFixed(2),
              partiallyShippedItemsTotal: partiallyShippedSum.toFixed(2),
              completedItemsTotal: completedSum.toFixed(2),
              cancelledItemsTotal: cancelledSum.toFixed(2),
              shippedItems: this.state.shippedItems.reverse(),
              acceptedItems: this.state.acceptedItems.reverse(),
              partiallyShippedItems: this.state.partiallyShippedItems.reverse(),
              completedItems: this.state.completedItems.reverse(),
              cancelledItems: this.state.cancelledItems.reverse(),
            });
            let arr = response.data.items
              .slice(Math.max(response.data.items.length - 5, 1))
              .reverse();
            //  console.log('this is array', arr);
           this.setState({items: arr});
          //  this.setState({items: response.data.items});
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
  };

  addQuote = () => {
    this.props.navigation.navigate('AddQuote');
  };

  showSearch = () => {
    this.setState({searchBar : true})
  }

  imagePressed = () => {
    this.setState({searchBar : false, searchResult : false})
    this.componentDidMount()
  }

  searchText = (value) => {
    this.setState({searchResult : true});
    const {online} = this.props;
    if (online) {
      this.setState({showLoading: true});
      this.props
        .searchOrder(value)
        .then((response) => {
         // console.log('response', response);
          if (response.code === 200) {
             this.setState({showLoading: false, searchResult : true, items: response.data.items.reverse()});
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


  goToScreen = (screen, param) => {
    this.props.navigation.navigate(screen, {orderData: param});
  };

  openScreen = (screen, param, status) => {
    let data = {
      'status' : status,
      'list' : param
    }
    this.props.navigation.navigate(screen, {orderStatusData: data});
  };

  

  listItem = (item, index) => {
    return (
      <TouchableOpacity style={styles.rowItem} onPress={() => this.goToScreen('AddOrderQuote', item)}>
        <View style={styles.bottomQuotesRow}>
          <View style={!item.is_active == 1 ? styles.dotRed : styles.dotGreen}  />
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
      searchBar,
      searchResult,
      showLoading,
      shippedItemsCount,
      acceptedItemsCount,
      partiallyShippedItemsCount,
      completedItemsCount,
      cancelledItemsCount,
      shippedItemsTotal,
      acceptedItemsTotal,
      partiallyShippedItemsTotal,
      completedItemsTotal,
      cancelledItemsTotal,
      shippedItems,
      acceptedItems,
      partiallyShippedItems,
      completedItems,
      cancelledItems
    } = this.state;

    return (
      <SafeAreaView style={commonStyles.ketboardAvoidingContainer}>
        <Header
          navigation={this.props.navigation}
          rightImage={USER}
          title="ORDERS"
        />
        <TouchableOpacity style={{...commonStyles.content, flex : 1}}>
        {!searchBar ? <TouchableOpacity style={styles.rowContent}>
            <View style={{marginLeft: moderateScale(-20)}}>
              {/* <AddNewButtonGroup
                color={APP_MAIN_GREEN}
                onPress={() => this.openScreen('AddOrder')}
              /> */}
            </View>
            <View style={{marginRight: moderateScale(-10)}}>
              <ContainerSearch onPress={() => this.showSearch()}/>
            </View>
          </TouchableOpacity> : <TouchableOpacity style={styles.rowContent2}><SearchWithCross onSearchPress={(value) => this.searchText(value)} onImagePress={() => this.imagePressed()}/></TouchableOpacity>}

          <KeyboardAwareScrollView>
          {!searchResult ?
          <>
              <CardWithIcon
                color={ORANGE_COLOR}
                count={shippedItemsCount}
                status={'Shipped'}
                amount={'£' + ' ' + commafy(shippedItemsTotal)}
                amountStyle={styles.amountTextStyle}
                statusStyle={styles.statusTextStyle}
                onPress={() => this.openScreen('StatusOrders', shippedItems, 'SHIPPED')}
              />
              <CardWithIcon
                color={APP_MAIN_GREEN}
                count={acceptedItemsCount}
                status={'Accepted'}
                amount={ '£' + ' ' + commafy(acceptedItemsTotal)}
                amountStyle={styles.amountTextStyle}
                statusStyle={styles.statusTextStyle}
                onPress={() => this.openScreen('StatusOrders', acceptedItems, 'ACCEPTED')}
              />
              <CardWithIcon
                color={CARD_DARK_BLUE}
                count={partiallyShippedItemsCount}
                status={'Partially Shipped'}
                amount={'£' + ' ' + commafy(partiallyShippedItemsTotal)}
                amountStyle={styles.amountTextStyle}
                statusStyle={styles.statusTextStyle}
                onPress={() => this.openScreen('StatusOrders', partiallyShippedItems, 'PARTIALLY SHIPPED')}
              />
              <CardWithIcon
                color={APP_MAIN_BLUE}
                count={completedItemsCount}
                status={'Completed'}
                amount={'£' + ' ' + commafy(completedItemsTotal)}
                amountStyle={styles.amountTextStyle}
                statusStyle={styles.statusTextStyle}
                onPress={() => this.openScreen('StatusOrders', completedItems, 'COMPLETED')}
              />
              <CardWithIcon
                color={APP_MAIN_COLOR}
                count={cancelledItemsCount}
                status={'Cancelled'}
                amount={'£' + ' ' + commafy(cancelledItemsTotal)}
                amountStyle={styles.amountTextStyle}
                statusStyle={styles.statusTextStyle}
                onPress={() => this.openScreen('StatusOrders', cancelledItems, 'CANCELLED')}
              />
              <TouchableOpacity style={styles.quotesRow}>
                <View style={{width: '60%'}}>
                  <Text style={styles.recentText}>RECENT ORDERS</Text>
                </View>
                <View style={{width: '20%'}} />
                <View style={{width: '20%'}}>
                  <TouchableOpacity
                    style={styles.button}
                    onPress={() => this.openScreen('AllOrders')}>
                    <Text style={styles.seeText}>SEE ALL</Text>
                  </TouchableOpacity>
                </View>
              </TouchableOpacity></>
              : null}
            {items.length !==0 ? <>
              <FlatList
                style={styles.parentFlatList}
                data={items}
                extraData={this.state}
                keyExtractor={(item, index) => '' + index}
                renderItem={({item, index}) => this.listItem(item, index)}
              /></> : <><Text style={commonStyles.noRecordFound}>No Order Found </Text></>}
          </KeyboardAwareScrollView>
        </TouchableOpacity>

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
  quotesRow: {
    flexDirection: 'row',
    width: '100%',
    marginHorizontal: moderateScale(10),
    marginTop: moderateScale(10),
  },
  amountTextStyle : {
    fontSize : moderateScale(20),
    fontWeight : 'bold'
  },
  statusTextStyle : {
    fontSize : moderateScale(13),
    fontWeight : 'bold'
  },
  rowContent2: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: moderateScale(10),
    marginHorizontal: moderateScale(5)
  },
});

const mapStateToProps = (state) => ({
  online: state.netInfo.online,
});

const mapDispatchToProps = {
  getOrdersList,
  searchOrder
};

export default connect(mapStateToProps, mapDispatchToProps)(Orders);

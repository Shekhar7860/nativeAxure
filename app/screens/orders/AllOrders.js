import React, {PureComponent} from 'react';
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
  RED,
} from '../../constants/colors';
import {USER} from '../../constants/Images';
import {ScaledSheet, moderateScale} from 'react-native-size-matters';
import AddNewButtonGroup from '../../components/AddNewButtonGroup';
import ContainerSearch from '../../components/ContainerSearch';
import CardWithIcon from '../../components/CardWithIcon';
import {connect} from 'react-redux';
import OverlaySpinner from '../../components/OverlaySpinner';
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
  Dimensions,
  Alert,
} from 'react-native';
import {getProductsList} from '../../redux/reducers/products';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';


class AllOrders extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      items: [1, 2, 3, 4],
      showLoading: false,
      shippedItems: [],
      acceptedItems: [],
      partiallyShippedItems: [],
      completedItems: [],
      cancelledItems: [],
    };
  }
  componentDidMount = () => {
    const {online, orders} = this.props;
   // console.log('orders', orders);
    for (var i = 0; i < orders.items.length; i++) {
      if (orders.items[i].status == 'Shipped') {
        this.state.shippedItems.push(orders.items[i]);
      } else if (orders.items[i].status == 'Accepted') {
        this.state.acceptedItems.push(
          orders.items[i]
        );
      } else if (orders.items[i].status == 'Partially_Shipped') {
        this.state.partiallyShippedItems.push(
          orders.items[i]
        );
      } else if (orders.items[i].status == 'Completed') {
        this.state.completedItems.push(
         orders.items[i]
        );
      } else {
        this.state.cancelledItems.push(
          orders.items[i]
        );
      }
    }
   // console.log('shippedItems', this.state.shippedItems)
    if (online) {
      this.setState({showLoading: true});
      setTimeout(() => {
        this.setState({
          showLoading: false,
          shippedItems: this.state.shippedItems,
          acceptedItems: this.state.acceptedItems,
          partiallyShippedItems: this.state.partiallyShippedItems,
         completedItems: this.state.completedItems,
         cancelledItems: this.state.cancelledItems
        });
        this.setState({items:orders.items});
      }, 2000);
    } else {
      Alert.alert('', 'No Internet Connection');
    }
    //this.props.navigation.navigate('Cart')
  };

  openScreen = (screen, param) => {
    this.props.navigation.navigate(screen, {orderData: param});
  };

  dotStyle = (status) => {
    let style = styles.dotRed
    switch(status) {
      case "SHIPPED":
        style = styles.dotOrange;
        break;
      case "ACCEPTED":
        style = styles.dotGreen;
        break;
      case "P_SHIPPED":
          style = styles.dotDarkblue;
          break;
      case "COMPLETED":
       style = styles.dotLightBlue;
          break;
      default:
        style = styles.dotRed;
        // code block
    } 
    return style
  }

  listItem = (item, index, status) => {
    return (
      <TouchableOpacity
        style={styles.rowItem}
        onPress={() => this.openScreen('AddOrderQuote', item)}>
        <View style={styles.bottomQuotesRow}>
          <View style={this.dotStyle(status)}  />
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
    const {items, showLoading, shippedItems, acceptedItems,  partiallyShippedItems, completedItems, cancelledItems } = this.state;

    return (
      <SafeAreaView style={commonStyles.ketboardAvoidingContainer}>
         <KeyboardAwareScrollView style={commonStyles.ketboardAvoidingContainer}>
        <Header
          navigation={this.props.navigation}
          rightImage={USER}
          title="ALL ORDERS"
        />
        <TouchableOpacity style={commonStyles.content}>
          <View style={styles.rowContent}>
            <View style={{marginLeft: moderateScale(-20)}}></View>
            <View style={{marginRight: moderateScale(-10)}}>
              {/* <ContainerSearch /> */}
            </View>
          </View>

          <TouchableOpacity style={styles.quotesRow}>
            <View style={{width: '60%'}}>
              <Text style={styles.recentText}>SHIPPED</Text>
            </View>
            <View style={{width: '10%'}} />
            <View style={{width: '30%'}}></View>
          </TouchableOpacity>
           <FlatList
                style={styles.parentFlatList}
                data={shippedItems}
                extraData={this.state}
                keyExtractor={(item, index) => '' + index}
                renderItem={({item, index}) => this.listItem(item, index, 'SHIPPED')}
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
                <Text style={styles.recentText}>PARTIALLY SHIPPED</Text>
              </View>
              <View style={{width: '10%'}} />
              <View style={{width: '30%'}}></View>
            </TouchableOpacity>
            <FlatList
              style={styles.parentFlatList}
              data={partiallyShippedItems}
              extraData={this.state}
              keyExtractor={(item, index) => '' + index}
              renderItem={({item, index}) =>
                this.listItem(item, index, 'P_SHIPPED')
              }
            />
            <TouchableOpacity style={styles.quotesRow}>
              <View style={{width: '60%'}}>
                <Text style={styles.recentText}>COMPLETED</Text>
              </View>
              <View style={{width: '10%'}} />
              <View style={{width: '30%'}}></View>
            </TouchableOpacity>
            <FlatList
              style={styles.parentFlatList}
              data={completedItems}
              extraData={this.state}
              keyExtractor={(item, index) => '' + index}
              renderItem={({item, index}) =>
                this.listItem(item, index, 'COMPLETED')
              }
            />
            <TouchableOpacity style={styles.quotesRow}>
              <View style={{width: '60%'}}>
                <Text style={styles.recentText}>CANCELLED</Text>
              </View>
              <View style={{width: '10%'}} />
              <View style={{width: '30%'}}></View>
            </TouchableOpacity>
            <FlatList
              style={styles.parentFlatList}
              data={cancelledItems}
              extraData={this.state}
              keyExtractor={(item, index) => '' + index}
              renderItem={({item, index}) =>
                this.listItem(item, index, 'CANCELLED')
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
    marginTop: moderateScale(20),
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
    fontSize: moderateScale(8),
  },
  amountText: {
    fontSize: moderateScale(10),
  },
  rowItem: {
    borderTopWidth: 1,
    borderColor: '#e6e6e6',
    height: moderateScale(50),
    justifyContent: 'center',
  },
});

const mapStateToProps = (state) => ({
  online: state.netInfo.online,
  orders : state.orders.ordersList
});

const mapDispatchToProps = {
  getProductsList,
};

export default connect(mapStateToProps, mapDispatchToProps)(AllOrders);

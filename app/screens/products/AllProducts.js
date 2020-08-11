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
import {isEmailValid, showErrorPopup} from '../../util/utils';

class AllProducts extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [1, 2, 3, 4],
      showLoading: false,
    };
  }
  componentDidMount = () => {
    const {online, products} = this.props;
   // console.log('productsss', products);
    if (online) {
      this.setState({showLoading: true});
      setTimeout(() => {
        this.setState({
          showLoading: false
        });
        this.setState({items:products.items.reverse()});
      }, 2000);
    } else {
      Alert.alert('', 'No Internet Connection');
    }
    //this.props.navigation.navigate('Cart')
  };

  openScreen = (screen, param) => {
    this.props.navigation.navigate(screen, {productData: param});
  };

  listItem = (item, index) => {
    return (
      <TouchableOpacity
        style={styles.rowItem}
        onPress={() => this.openScreen('AddProduct', item)}>
        <View style={styles.bottomQuotesRow}>
          <View style={styles.dotGreen} />
          <View style={{width: '5%'}} />
          <View style={{width: '95%', justifyContent: 'center'}}>
            <Text style={styles.labelText}>{item.name}</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };
  render() {
    const {items, showLoading} = this.state;

    return (
      <SafeAreaView style={commonStyles.ketboardAvoidingContainer}>
        <Header
          navigation={this.props.navigation}
          rightImage={USER}
          title="PRODUCTS"
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
              <Text style={styles.recentText}>ALL PRODUCTS</Text>
            </View>
            <View style={{width: '10%'}} />
            <View style={{width: '30%'}}></View>
          </TouchableOpacity>
          <ScrollView>
            <View
              style={{
                height: Dimensions.get('window').height,
                marginBottom: moderateScale(20),
              }}>
              <FlatList
                style={styles.parentFlatList}
                data={items}
                extraData={this.state}
                keyExtractor={(item, index) => '' + index}
                renderItem={({item, index}) => this.listItem(item, index)}
              />
            </View>
          </ScrollView>
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
  products : state.products.productsList
});

const mapDispatchToProps = {
  getProductsList,
};

export default connect(mapStateToProps, mapDispatchToProps)(AllProducts);

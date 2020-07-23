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
  SEE_ALL_BUTTON_COLOR
} from '../../constants/colors';
import SearchWithCross from '../../components/SearchWithCross';
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
  ScrollView
} from 'react-native';
import {getProductsList, searchProduct} from '../../redux/reducers/products';
import {connect} from 'react-redux';
import {isEmailValid, showErrorPopup} from '../../util/utils';
import OverlaySpinner from '../../components/OverlaySpinner';

class RecentProducts extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [1, 2],
      showLoading: false,
      searchBar : false,
      searchResult : false
    };
  }
  componentDidMount = () => {
    const {online, products} = this.props;
    if (online) {
      this.setState({showLoading: true});
      setTimeout(() => {
        this.setState({
          showLoading: false
        });
        let arr = products.items
                .slice(Math.max(products.items.length - 5, 1))
                .reverse();
        this.setState({items:arr});
      }, 2000);

    } else {
      Alert.alert('', 'No Internet Connection');
    }
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
        .searchProduct(value)
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



  addQuote = () => {
    this.props.navigation.navigate('AddQuote');
  };

  openQuote = () => {
    this.props.navigation.navigate('Quote');
  };

  openScreen = (screen, param) => {
    this.props.navigation.navigate(screen, {clientData: param});
  };

  listItem = (item, index) => {
    return (
      <TouchableOpacity style={styles.rowItem}>
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
    const {items, showLoading, searchBar, searchResult} = this.state;

    return (
      <SafeAreaView style={commonStyles.ketboardAvoidingContainer}>
        <Header
          navigation={this.props.navigation}
          rightImage={USER}
          title="PRODUCTS"
        />
        <TouchableOpacity style={commonStyles.content}>
        {!searchBar ?  <TouchableOpacity style={styles.rowContent}>
            <View style={{marginLeft: moderateScale(-20)}}>
              <AddNewButtonGroup
                color={APP_MAIN_GREEN}
                onPress={this.addQuote}
              />
            </View>
            <View style={{marginRight: moderateScale(-10)}}>
              <ContainerSearch onPress={() => this.showSearch()}/>
            </View>
          </TouchableOpacity>  : <TouchableOpacity style={styles.rowContent2}><SearchWithCross onSearchPress={(value) => this.searchText(value)} onImagePress={() => this.imagePressed()}/></TouchableOpacity>}
          {!searchResult ?
          <TouchableOpacity style={styles.quotesRow}>
            <View style={{width: '60%'}}>
              <Text style={styles.recentText}>RECENT PRODUCTS</Text>
            </View>
            <View style={{width: '20%'}} />
            <View style={{width: '20%'}}>
              <TouchableOpacity
                style={styles.button}
                onPress={() => this.openScreen('AllProducts')}>
                <Text style={styles.seeText}>SEE ALL</Text>
              </TouchableOpacity>
            </View>
          </TouchableOpacity> : null}
          {items.length !==0 ? <>
          <FlatList
            style={styles.parentFlatList}
            data={items}
            extraData={this.state}
            keyExtractor={(item, index) => '' + index}
            renderItem={({item, index}) => this.listItem(item, index)}
          /></> :<><Text style={commonStyles.noRecordFound}>No Product Found </Text></>}
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
    fontSize: moderateScale(8),
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
  rowContent2: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: moderateScale(10),
    marginHorizontal: moderateScale(5),
  },
});

const mapStateToProps = (state) => ({
  online: state.netInfo.online,
  products : state.products.productsList
});

const mapDispatchToProps = {
  getProductsList,
  searchProduct
};

export default connect(mapStateToProps, mapDispatchToProps)(RecentProducts);

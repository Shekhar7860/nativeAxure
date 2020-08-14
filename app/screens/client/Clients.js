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
  SEE_ALL_BUTTON_COLOR,
} from '../../constants/colors';
import {USER} from '../../constants/Images';
import SearchWithCross from '../../components/SearchWithCross';
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
  Alert,
} from 'react-native';
import {connect} from 'react-redux';
import OverlaySpinner from '../../components/OverlaySpinner';
import {getClientsList, searchClient} from '../../redux/reducers/clients';
import {isEmailValid, showErrorPopup} from '../../util/utils';

class Clients extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      showLoading: false,
      searchBar: false,
      searchResult: false,
    };
  }
  componentDidMount = () => {
    const {online, clients} = this.props;
    console.log('hshshs', this.props);
    // if (online) {
    //   this.setState({showLoading: true});
    //   setTimeout(() => {
    //     this.setState({
    //       showLoading: false,
    //     });

    //     let arr = clients.items
    //       .slice(Math.max(clients.items.length - 5, 1))
    //       .reverse();
    //     this.setState({items: arr});
    //   }, 2000);
    // } else {
    //   Alert.alert('', 'No Internet Connection');
    // }
  };

  goToScreen = (screen, param) => {
    this.props.navigation.navigate(screen, {clientData: param});
  };

  showSearch = () => {
    this.setState({searchBar: true});
  };

  openScreen = (screen, param) => {
    this.props.navigation.navigate(screen, {clientData: param});
  };

  imagePressed = () => {
    this.setState({searchBar: false, searchResult: false});
    this.componentDidMount();
  };

  searchText = (value) => {
    this.setState({searchResult: true});
    const {online} = this.props;
    if (online) {
      this.setState({showLoading: true});
      this.props
        .searchClient(value)
        .then((response) => {
          // console.log('response', response);
          if (response.code === 200) {
            this.setState({
              showLoading: false,
              searchResult: true,
              items: response.data.items.reverse(),
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
  };

  listItem = (item, index) => {
    return (
      <TouchableOpacity
        style={styles.rowItem}
        onPress={() => this.goToScreen('Client', item)}>
        <View style={styles.bottomQuotesRow}>
          <View
            style={item.is_active == 1 ? styles.dotBlue : styles.dotGreen}
          />
          <View style={{width: '5%'}} />
          <View style={{width: '50%', justifyContent: 'center'}}>
            <Text style={styles.labelText}>{item.name}</Text>
          </View>
          <View style={{width: '20%'}} />
          <View style={{width: '25%'}}>
            <Text style={styles.amountText}></Text>
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
          title="CLIENTS"
        />
        <View style={commonStyles.content}>
          {!searchBar ? (
            <TouchableOpacity style={styles.rowContent}>
              <>
                <View style={{marginLeft: moderateScale(-20)}}>
                  <AddNewButtonGroup
                    color={APP_MAIN_GREEN}
                    onPress={() => this.openScreen('AddClient')}
                  />
                </View>
                <View style={{marginRight: moderateScale(-10)}}>
                  <ContainerSearch onPress={() => this.showSearch()} />
                </View>
              </>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity style={styles.rowContent2}>
              <SearchWithCross
                onSearchPress={(value) => this.searchText(value)}
                onImagePress={() => this.imagePressed()}
              />
            </TouchableOpacity>
          )}
          {!searchResult ? (
            <View style={styles.quotesRow}>
              <View style={{width: '60%'}}>
                <Text style={styles.recentText}>RECENT CLIENTS</Text>
              </View>
              <View style={{width: '20%'}} />
              <View style={{width: '20%'}}>
                <TouchableOpacity
                  style={styles.button}
                  onPress={() => this.openScreen('AllClients')}>
                  <Text style={styles.seeText}>SEE ALL</Text>
                </TouchableOpacity>
              </View>
            </View>
          ) : null}
          {items.length !== 0 ? (
            <>
              <FlatList
                style={styles.parentFlatList}
                data={items}
                extraData={this.state}
                keyExtractor={(item, index) => '' + index}
                renderItem={({item, index}) => this.listItem(item, index)}
              />
            </>
          ) : (
            <>
              <Text style={commonStyles.noRecordFound}>No Client Found </Text>
            </>
          )}
        </View>
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
    backgroundColor: APP_MAIN_GREEN,
  },
  dotGreen: {
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
  rowContent2: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: moderateScale(10),
    marginHorizontal: moderateScale(5),
  },
});

const mapState = (state) => ({
  online: state.userData.online.online,
  clients: state.userData.clientsList,
});

const mapDispatchToProps = {
  getClientsList,
  searchClient,
};

export default connect(mapState, mapDispatchToProps)(Clients);

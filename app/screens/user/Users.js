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
import {USER, leftArrow} from '../../constants/Images';
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
  Alert
} from 'react-native';
import {connect} from 'react-redux';
import OverlaySpinner from '../../components/OverlaySpinner';
import {getUsersList} from '../../redux/reducers/users';
import {isEmailValid, showErrorPopup} from '../../util/utils';

class Users extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      showLoading : false,
      activeUsersCount: 0,
      inActiveUsersCount: 0,
      activeUsers : [],
      inActiveUsers : []
    };
  }
  componentDidMount = () => {
    const {online} = this.props;

    if (online) {
      this.setState({showLoading: true});
      this.props
        .getUsersList()
        .then((response) => {
          console.log('response', response);
          this.setState({showLoading: false});
          if (response.code === 200) {

            let arr = response.data.items
              .slice(Math.max(response.data.items.length - 5, 1))
              .reverse();
            this.setState({items: arr});
            for (var i = 0; i < response.data.items.length; i++) {
              if (response.data.items[i].is_active == 1) {
                this.state.activeUsers.push(response.data.items[i]);
              } else {
                this.state.inActiveUsers.push(
                  response.data.items[i].grand_total,
                );
              }
            }
            //  alert(pendingSum);
            this.setState({
              activeUsersCount: this.state.activeUsers.length,
              inActiveUsersCount: this.state.inActiveUsers.length
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

  openScreen = (screen, param) => {
    this.props.navigation.navigate(screen, {clientData: param});
  };

  listItem = (item, index) => {
    return (
      <TouchableOpacity style={styles.rowItem} >
        <View style={styles.bottomQuotesRow}>
          <View style={!item.is_active == 1 ? styles.dotRed : styles.dotGreen} />
          <View style={{width: '5%'}} />
          <View style={{width: '50%', justifyContent: 'center'}}>
            <Text style={styles.labelText}>{item.name}</Text>
          </View>
          <View style={{width: '35%'}} />
          <View style={{width: '10%'}}>
            <Image source={leftArrow} style={commonStyles.icon}/>
          </View>
        </View>
      </TouchableOpacity>
    );
  };
  render() {
    const {items, showLoading, activeUsersCount, inActiveUsersCount} = this.state;

    return (
      <SafeAreaView style={commonStyles.ketboardAvoidingContainer}>
        <Header
          navigation={this.props.navigation}
          rightImage={USER}
          title="USERS"
        />
        <TouchableOpacity style={commonStyles.content}>
          <View style={styles.rowContent}>
            <View style={{marginLeft: moderateScale(-20)}}>
              <AddNewButtonGroup
                color={APP_MAIN_GREEN}
                onPress={() => this.openScreen('UserDetail')}
              />
            </View>
            <View style={{marginRight: moderateScale(-10)}}>
              <ContainerSearch />
            </View>
          </View>

          <CardWithIcon
            color={APP_MAIN_GREEN}
            count={''}
            status={''}
            amount={activeUsersCount + ' ' + 'Active'}
            amountStyle={styles.amountStyle}
            onPress={this.onClickListen}
          />
          <CardWithIcon
            color={APP_MAIN_COLOR}
            count={''}
            status={''}
            amount={inActiveUsersCount + ' ' +  'InActive'}
            amountStyle={styles.amountStyle}
            onPress={this.onClickListen}
          />

          <TouchableOpacity style={styles.quotesRow}>
            <View style={{width: '60%'}}>
              <Text style={styles.recentText}>RECENT USERS</Text>
            </View>
            <View style={{width: '10%'}} />
            <View style={{width: '30%'}}>
              <TouchableOpacity
                style={styles.button}
                onPress={() => this.openScreen('AllUsers')}>
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
  dotRed: {
    marginTop: moderateScale(5),
    height: moderateScale(12),
    width: moderateScale(12),
    borderRadius: moderateScale(6),
    backgroundColor: APP_MAIN_COLOR,
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
  amountStyle: {
    marginLeft: moderateScale(10),
    marginTop: moderateScale(-20),
    fontSize: moderateScale(15),
    color: WHITE,
  },
});
const mapStateToProps = (state) => ({
  online: state.netInfo.online,
});

const mapDispatchToProps = {
  getUsersList,
};

export default connect(mapStateToProps, mapDispatchToProps)(Users);

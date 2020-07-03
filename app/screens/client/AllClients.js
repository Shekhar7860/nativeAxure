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
import OverlaySpinner from '../../components/OverlaySpinner';
import {getClientsList} from '../../redux/reducers/clients';

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
import {isEmailValid, showErrorPopup} from '../../util/utils';
import {connect} from 'react-redux';

class AllClients extends Component {
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
    this.setState({showLoading: true});
    this.props
      .getClientsList()
      .then((response) => {
        console.group('responseAll', response);
        this.setState({showLoading: false});
        if (response.code === 200) {
          this.setState({items: response.data.items});

          for (var i = 0; i <= response.data.items.length; i++) {
            console.group('ddd', response.data.items[i].is_active);
            if (response.data.items[i].is_active == 1) {
              this.state.acceptedItems.push(response.data.items[i]);
            } else {
              this.state.rejectedItems.push(response.data.items[i]);
            }
          }
        }
      })
      .catch((error) => {
        this.setState({showLoading: false});
        if (error.code === 'unauthorized') {
          showErrorPopup(
            "Couldn't validate those credentials.\nPlease try again",
          );
        } else {
        }
      });
    console.group(this.state.acceptedItems, 'ssjsjsj');
    this.setState({
      acceptedItems: this.state.acceptedItems,
      rejectedItems: this.state.rejectedItems,
    });
  };

  openScreen = (screen, param) => {
    this.props.navigation.navigate(screen, {clientData: param});
  };

  listItem = (item, index, status) => {
    return (
      <TouchableOpacity style={styles.rowItem}>
        <View style={styles.bottomQuotesRow}>
          <View
            style={
              status == 'ACTIVE'
                ? styles.dotGreen
                : status == 'INACTIVE'
                ? styles.dotRed
                : styles.dotBlue
            }
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
    console.group('stts', this.state.acceptedItems);
    const {
      acceptedItems,
      pendingItems,
      rejectedItems,
      showLoading,
    } = this.state;

    return (
      <SafeAreaView style={commonStyles.ketboardAvoidingContainer}>
        <Header
          navigation={this.props.navigation}
          rightImage={USER}
          title="ALL CLIENTS"
          leftImage={BACK}
        />
        <TouchableOpacity style={commonStyles.content}>
          <View style={styles.rowContent}>
            <View style={{marginLeft: moderateScale(-20)}}>
              <AddNewButtonGroup
                color={APP_MAIN_GREEN}
                onPress={() => this.openScreen('AddClient')}
              />
            </View>
            <View style={{marginRight: moderateScale(-10)}}>
              <ContainerSearch />
            </View>
          </View>

          <TouchableOpacity style={styles.quotesRow}>
            <View style={{width: '60%'}}>
              <Text style={styles.recentText}>ACTIVE</Text>
            </View>
            <View style={{width: '10%'}} />
            <View style={{width: '30%'}}></View>
          </TouchableOpacity>
          <FlatList
            style={styles.parentFlatList}
            data={acceptedItems}
            extraData={this.state}
            keyExtractor={(item, index) => '' + index}
            renderItem={({item, index}) => this.listItem(item, index, 'ACTIVE')}
          />

          <TouchableOpacity style={styles.quotesRow}>
            <View style={{width: '60%'}}>
              <Text style={styles.recentText}>INACTIVE</Text>
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
              this.listItem(item, index, 'INACTIVE')
            }
          />
          <OverlaySpinner
            cancelable
            visible={showLoading}
            color={WHITE}
            textContent="Please wait..."
            textStyle={{color: WHITE}}
          />
        </TouchableOpacity>
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
  online: state.netInfo.online,
});

const mapDispatchToProps = {
  getClientsList,
};

export default connect(mapStateToProps, mapDispatchToProps)(AllClients);

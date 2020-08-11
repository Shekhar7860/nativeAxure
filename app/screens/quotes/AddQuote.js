import React, {PureComponent} from 'react';
import Header from '../../components/Header';
import commonStyles from '../../commonStyles/commonStyles';
import {
  APP_LIGHT_BLUE_COLOR,
  LINE_COLOR,
  SEMI_TRANSPARENT,
  WHITE,
  DARK_BLUE,
  NOTIFICATION_COUNT_BG_COLOR,
  APP_MAIN_GREEN,
  APP_MAIN_BLUE,
  APP_MAIN_COLOR,
} from '../../constants/colors';
import {USER, BACK, TASK, DRAWER_MENU, LISTINGICON} from '../../constants/Images';
import {ScaledSheet, moderateScale} from 'react-native-size-matters';
import AddNewButtonGroup from '../../components/AddNewButtonGroup';
import SimpleDropdown from '../../components/SimpleDropdown';
import ClickableText from '../../components/ClickableText';
import TouchableImage from '../../components/TouchableImage';
import ButtonDefault from '../../components/ButtonDefault';
import ContainerSearch from '../../components/ContainerSearch';
import InputBox from '../../components/InputBox';
import HR from '../../components/HR';
import {connect} from 'react-redux';
import ExpandCollapseLayout from '../../components/ExpandCollapseLayout';
import {
  View,
  Text,
  Button,
  ScrollView,
  SafeAreaView,
  Image,
  TouchableOpacity,
  FlatList,
  Dimensions,
  Alert,
} from 'react-native';
const arrDataType = ['Partner'];
const arrDataStatus = ['Pending'];
import {getClientsList} from '../../redux/reducers/clients';
import {addQuote} from '../../redux/reducers/quotes';
import Toast from 'react-native-simple-toast';
import {isEmailValid, showErrorPopup} from '../../util/utils';
import OverlaySpinner from '../../components/OverlaySpinner';

class AddQuote extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      items: [1, 2, 3, 4],
      clientItems: [],
      clientIds: [],
      type: '',
      client: '',
      status: '',
      clientId: '',
      showLoading : false,
    };
  }
  componentDidMount = () => {
    const {username, password, isRememberMe} = this.state;
    const {online} = this.props;

    if (online) {
      this.props
        .getClientsList()
        .then((response) => {
          // console.log('clientssss', response);
          if (response.code === 200) {
            this.setState({items: response.data.items});
            for (var i = 0; i <= response.data.items.length; i++) {
              this.state.clientItems.push(response.data.items[i].name);
              this.state.clientIds.push(response.data.items[i].id);
            }
          }
          this.setState({clientItems: this.state.clientItems, clientIds: this.state.clientIds});
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
    } else {
      Alert.alert('', 'No Internet Connection');
    }

    //this.props.navigation.navigate('Cart')
  };

  openScreen = (screen, data) => {
    this.props.navigation.navigate(screen, {params: data});
  }

  createQuote = (screen) => {

    const {
      clientId,
      type,
      status
    } = this.state;
  //  console.log('selected', clientId, status, type)
    if(clientId !== "" && status !== "" && type !== "")
    {
    const {
      clientId,
      type,
    } = this.state;
    const {online} = this.props;
    if (online) {
      this.setState({showLoading: true});
      this.props
        .addQuote(
          this.props.userInfo.reseller_id,
          clientId,
          type
        )
        .then((response) => {
          if (response.code === 200) {
            this.setState({showLoading: false});
            Toast.show(response.message)
            this.props.navigation.navigate(screen, {quoteData: response.data})
          } else {
            if (response.validation_errors) {
              showErrorPopup(response.validation_errors);
            } else {
              showErrorPopup(response.message);
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
            showErrorPopup(
              'There was an unexpected error.\nPlease wait a few minutes and try again.',
            );
          }
        });
    } else {
      Alert.alert('', 'No Internet Connection');
    }
  }
  else {
  Alert.alert('', 'Please Select Fields');
  }

  };

  selectData = (val, type) => {
    if (type == 'type') {
      this.setState({type: arrDataType[val]});
    } else if (type == 'status') {
      this.setState({status: arrDataStatus[val]});
    } else {
      this.setState({clientId: this.state.clientIds[val]});
      this.setState({client: this.state.clientItems[val]});
    }
  };


  navigateScreen = (screen, param) => {
    this.props.navigation.navigate(screen, {clientData: param});
  };
  render() {
  //  console.log('hhhh', this.state.clientitems);
    const {items, clientItems, showLoading} = this.state;

    return (
      <SafeAreaView style={commonStyles.ketboardAvoidingContainer}>
        <Header
          navigation={this.props.navigation}
          rightImage={USER}
          title="CREATE NEW"
          leftImage={BACK}
        />
        <TouchableOpacity style={commonStyles.content}>
          <TouchableOpacity style={styles.rowContent}>
            <View style={{marginLeft: moderateScale(-20)}}>
              <AddNewButtonGroup color={APP_MAIN_GREEN} />
            </View>
            <TouchableImage
              image={LISTINGICON}
              onPress={() => this.openScreen('AllQuotes')}
              imageStyle={{
                ...commonStyles.icon,
                marginLeft: moderateScale(-18),
                marginTop: moderateScale(2),
              }}
            />
            <View style={{marginRight: moderateScale(-10)}}>
              {/* <ContainerSearch /> */}
            </View>
          </TouchableOpacity>
        </TouchableOpacity>
        <ScrollView>
          <View
            style={{...commonStyles.content, marginBottom: moderateScale(40)}}>
            <Text style={styles.labelText}>Type</Text>
            <SimpleDropdown
              placeHolder="Please select type"
             
              style={commonStyles.dropDownStyle}
              drowdownArray={arrDataType}
              dropDownWidth={'85%'}
              imageStyle={{marginTop: moderateScale(10), ...commonStyles.icon}}
              isIconVisible={true}
              onSelect={(value) => this.selectData(value, 'type')}
            />
            <TouchableOpacity style={{flexDirection: 'row'}}>
              <Text style={styles.labelText}>Client</Text>
              <View style={{width: '2%'}} />
              <Text
                style={{
                  fontSize: moderateScale(10),
                  marginTop: moderateScale(20),
                  color: APP_MAIN_BLUE,
                }}>
                + Add New{' '}
              </Text>
            </TouchableOpacity>
            <SimpleDropdown
              placeHolder="Please select client"
              style={commonStyles.dropDownStyle}
              drowdownArray={clientItems}
              dropDownWidth={'85%'}
              imageStyle={{marginTop: moderateScale(10), ...commonStyles.icon}}
              isIconVisible={true}
              onSelect={(value) => this.selectData(value, 'client')}
            />

            <Text style={styles.labelText}>Status</Text>
            <SimpleDropdown
              placeHolder="Please select status"
              style={commonStyles.dropDownStyle}
              drowdownArray={arrDataStatus}
              dropDownWidth={'85%'}
              imageStyle={{marginTop: moderateScale(10), ...commonStyles.icon}}
              isIconVisible={true}
              onSelect={(value) => this.selectData(value, 'status')}
            />

            <ButtonDefault onPress={() => this.createQuote('EditQuote')}>
              NEXT
            </ButtonDefault>
          </View>
        </ScrollView>
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
    borderTopWidth: 1,
    borderColor: '#e6e6e6',
    flexDirection: 'row',
    marginHorizontal: moderateScale(10),
    alignItems: 'center',
    justifyContent: 'center',
    height: moderateScale(40),
  },

  dotBlue: {
    marginTop: moderateScale(5),
    height: moderateScale(12),
    width: moderateScale(12),
    borderRadius: moderateScale(6),
    backgroundColor: APP_MAIN_BLUE,
  },
  rowContent: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: moderateScale(20),
    marginHorizontal: moderateScale(0),
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
    margin: moderateScale(20),
  },
  amountText: {
    fontSize: moderateScale(10),
  },
  amountTextLast: {
    fontSize: moderateScale(12),
    fontWeight: 'bold',
  },
  dateText: {
    fontSize: moderateScale(7),
  },
  content: {
    marginTop: moderateScale(20),
  },
  inputBoxStyle: {
    marginTop: moderateScale(-20),
    height: moderateScale(30),
  },
  input: {
    fontWeight: 'normal',
    fontSize: moderateScale(10),
  },
});

const mapStateToProps = (state) => ({
  userInfo: state.session.userInfo,
  online: state.netInfo.online,
});

const mapDispatchToProps = {
  getClientsList,
  addQuote
};

export default connect(mapStateToProps, mapDispatchToProps)(AddQuote);

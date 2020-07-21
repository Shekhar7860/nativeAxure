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
import {USER, BACK, TASK, DRAWER_MENU} from '../../constants/Images';
import {ScaledSheet, moderateScale} from 'react-native-size-matters';
import AddNewButtonGroup from '../../components/AddNewButtonGroup';
import SimpleDropdown from '../../components/SimpleDropdown';
import ClickableText from '../../components/ClickableText';
import TouchableImage from '../../components/TouchableImage';
import ButtonDefault from '../../components/ButtonDefault';
import ContainerSearch from '../../components/ContainerSearch';
import InputBox from '../../components/InputBox';
import HR from '../../components/HR';
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
  Alert
} from 'react-native';
const arrDataStatus = ['Draft'];
const arrDataType = ['Partner', 'Client', 'User'];
const arrDataClient = ['Anil', 'Akram', 'Sagar', 'Sanjeev'];;
import {connect} from 'react-redux';
import {addOrder} from '../../redux/reducers/orders';
import Toast from 'react-native-simple-toast';
import {showErrorPopup} from '../../util/utils';
import OverlaySpinner from '../../components/OverlaySpinner';
class AddOrder extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      items: [1, 2, 3, 4],
      clientItems: [],
      clientIds: [],
      clientId : '',
      mphId : '',
      poPreference : '',
      status : ''
    };
  }
  componentDidMount = () => {
    console.log('reseller_id',this.props.userInfo.reseller_id)
    const {online} = this.props;
      if (online) {
    for(var i = 0; i< this.props.clients.items.length; i++) {
      console.log('skskks')
     this.state.clientItems.push(this.props.clients.items[i].name);
     this.state.clientIds.push(this.props.clients.items[i].id);
    }
  }
    else {
      Alert.alert('', 'No Internet Connection');
    }
    this.setState({clientItems: this.state.clientItems, clientIds: this.state.clientIds});
  };

  addClientQuote = () => {
    this.props.navigation.navigate('AddQuoteClient');
  };

  openScreen = (screen, param) => {
    const {
      clientId,
      type,
      status
    } = this.state;
  //  console.log('selected', clientId, status, type)
    if(clientId !== "" && status !== "" && type !== "")
    {
    const {online} = this.props;
    if (online) {
      this.setState({showLoading: true});
      this.props
        .addOrder(
          clientId,
          this.props.userInfo.reseller_id,
          status
        )
        .then((response) => {
          if (response.code === 200) {
            this.setState({showLoading: false});
            Toast.show(response.message)
            this.props.navigation.navigate(screen, {orderData: response.data})
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

  render() {
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
          <View style={styles.rowContent}>
            <View style={{marginLeft: moderateScale(-20)}}>
              <AddNewButtonGroup color={APP_MAIN_GREEN} />
            </View>
            <TouchableImage
              image={DRAWER_MENU}
              imageStyle={{
                ...commonStyles.icon,
                marginLeft: moderateScale(-18),
                marginTop: moderateScale(2),
              }}
            />
            <View style={{marginRight: moderateScale(-10)}}>
              <ContainerSearch />
            </View>
          </View>
        </TouchableOpacity>
        <ScrollView>
          <View
            style={{...commonStyles.content, marginBottom: moderateScale(40)}}>
            <View style={{flexDirection: 'row'}}>
              <Text style={styles.labelText}>Client</Text>
              <View style={{width: '2%'}} />
              <Text
                style={{
                  fontSize: moderateScale(10),
                  marginTop: moderateScale(20),
                  color: APP_MAIN_BLUE,
                }}>
                {' '}
                + Add New{' '}
              </Text>
            </View>
            <SimpleDropdown
              placeHolder="Please select client"
              style={styles.dropDownStyle}
              drowdownArray={clientItems}
              dropDownWidth={'85%'}
              imageStyle={{marginTop: moderateScale(10), ...commonStyles.icon}}
              isIconVisible={true}
              onSelect={(value) => this.selectData(value, 'client')}
            />
            <View>
              <Text style={styles.labelText}>MPH ID</Text>
              <InputBox
                disabled
                placeHolder=""
                boxStyle={styles.inputBoxStyle}
                inputStyle={styles.input}
                onChangeText={(value) => this.setState({mphId: value})}
              />
            </View>

            <View style={commonStyles.space}>
              <Text style={styles.labelText}>PO Reference</Text>
              <InputBox
                placeHolder=""s
                boxStyle={styles.inputBoxStyle}
                inputStyle={styles.input}
                onChangeText={(value) => this.setState({poPreference: value})}
              />
            </View>

          <View style={commonStyles.space}>
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
            </View>

            <ButtonDefault onPress={() => this.openScreen('AddOrderQuote')}>
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
    marginHorizontal: moderateScale(20),
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
  dropDownStyle: {
    marginHorizontal: moderateScale(20),
    marginTop: moderateScale(-20),
    flexDirection: 'row',
    borderBottomWidth: moderateScale(1),
    borderBottomColor: LINE_COLOR,
  },
});


const mapStateToProps = (state) => ({
  userInfo: state.session.userInfo,
  clients: state.clients.clientsList,
  online: state.netInfo.online,
});

const mapDispatchToProps = {
  addOrder
};

export default connect(mapStateToProps, mapDispatchToProps)(AddOrder);

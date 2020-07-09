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
  BLACK,
} from '../../constants/colors';
import {
  USER,
  BACK,
  TASK,
  DRAWER_MENU,
  rightArrow,
} from '../../constants/Images';
import {ScaledSheet, moderateScale} from 'react-native-size-matters';
import AddNewButtonGroup from '../../components/AddNewButtonGroup';
import SimpleDropdown from '../../components/SimpleDropdown';
import ClickableText from '../../components/ClickableText';
import TouchableImage from '../../components/TouchableImage';
import ContainerSearch from '../../components/ContainerSearch';
import CardWithIcon from '../../components/CardWithIcon';
import InputBox from '../../components/InputBox';
import ExpandCollapseLayout from '../../components/ExpandCollapseLayout';
import HR from '../../components/HR';
import {isEmailValid, showErrorPopup} from '../../util/utils';
import ButtonWithImage from '../../components/ButtonWithImage';
import ButtonDefault from '../../components/ButtonDefault';
import OverlaySpinner from '../../components/OverlaySpinner';
import {CheckBox} from 'react-native-elements';
import {connect} from 'react-redux';
import {addQuote} from '../../redux/reducers/quotes';

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
} from 'react-native';
const arrDataMethod = ['Method 1', 'Method 2', 'Method 3'];

class AddQuoteClient extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      items: [1, 2, 3, 4],
      isRememberMe: false,
      quoteField: '',
      quoteId: '',
      clientId: '',
      quoteTitle: '',
      quoteCode: '',
      mphId: '',
      poPreference: '',
      paymentCurrency: '',
      paymentTerm: '',
      paymentVat: '',
      shippingFirstName: '',
      shippingLastName: '',
      shippingEmail: '',
      shippingCost: '',
      shippingAdd1: '',
      shippingAdd2: '',
      shippingCity: '',
      shippingCountry: '',
      shippingPostalCode: '',
      billingcompanyName: '',
      billingfirstName: '',
      billingLastName: '',
      billingEmail: '',
      billingCity: '',
      billingCountry: '',
      billingPostalCode: '',
      terms: '',
      type: '',
      status: '',
      showLoading: false,
      quoteDetail: '',
    };
  }
  componentDidMount = () => {
    if (this.props.route.params) {
      if (this.props.route.params.selected !== undefined) {
        this.setState({
          clientId: this.props.route.params.selected.clientId,
          type: this.props.route.params.selected.type,
          status: this.props.route.params.selected.status,
        });
      }
      if (this.props.route.params.clientData !== undefined) {
        this.setState({
          quoteDetail: this.props.route.params.clientData.quoteDetail,
        });
      }
    }
  };

  openScreen = (screen, param) => {
    this.props.navigation.navigate(screen, {clientData: param});
  };

  listItem = (item, index) => {
    return (
      <TouchableOpacity style={styles.rowItem}>
        <View style={styles.bottomQuotesRow}>
          <View style={index == 0 ? styles.dotBlue : styles.dotGreen} />
          <View style={{width: '5%'}} />
          <View style={{width: '50%', justifyContent: 'center'}}>
            <Text style={styles.labelText}>Yantra Test Reseller</Text>
          </View>
          <View style={{width: '20%'}} />
          <View style={{width: '25%'}}>
            <Text style={styles.amountText}>£1494.00</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  addEditQuote = () => {
    const {
      clientId,
      type,
      status,
      quoteId,
      quoteTitle,
      quoteCode,
      mphId,
      poPreference,
      paymentCurrency,
      paymentTerm,
      paymentVat,
      billingcompanyName,
      billingfirstName,
      billingLastName,
      billingEmail,
      billingAdd1,
      billingAdd2,
      billingCity,
      billingCountry,
      billingPostalCode,
      shippingCost,
      shippingFirstName,
      shippingLastName,
      shippingEmail,
      shippingAdd1,
      shippingAdd2,
      shippingCity,
      shippingCountry,
      shippingPostalCode,
      terms,
    } = this.state;
    const {online} = this.props;

    if (online) {
      this.setState({showLoading: true});
      this.props
        .addQuote(
          clientId,
          type,
          status,
          quoteId,
          quoteTitle,
          quoteCode,
          mphId,
          poPreference,
          paymentCurrency,
          paymentTerm,
          paymentVat,
          billingcompanyName,
          billingfirstName,
          billingLastName,
          billingEmail,
          billingAdd1,
          billingAdd2,
          billingCity,
          billingCountry,
          billingPostalCode,
          shippingCost,
          shippingFirstName,
          shippingLastName,
          shippingEmail,
          shippingAdd1,
          shippingAdd2,
          shippingCity,
          shippingCountry,
          shippingPostalCode,
          terms,
        )
        .then((response) => {
          this.setState({showLoading: false});
          if (response.code === 200) {
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
  };

  calculateCost = () => {};
  render() {
    const {items, isRememberMe, quoteDetail, quoteId, showLoading} = this.state;
    console.group('bnbbb', quoteDetail);
    return (
      <SafeAreaView style={commonStyles.ketboardAvoidingContainer}>
        <Header
          navigation={this.props.navigation}
          rightImage={USER}
          title="QUOTE"
          leftImage={BACK}
        />
        <TouchableOpacity style={commonStyles.content}>
          <View style={styles.rowContent}>
            <View style={{marginLeft: moderateScale(-20)}}>
              <AddNewButtonGroup color={APP_MAIN_GREEN} />
            </View>
            <TouchableImage
              image={DRAWER_MENU}
              onPress={() => this.openScreen('AllQuotes')}
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
            <Text style={styles.labelText}>Quote #</Text>
            <InputBox
              placeHolder=""
              boxStyle={styles.inputBoxStyle}
              inputStyle={styles.input}
              onChangeText={(value) => this.setState({quoteId: value})}
              value={quoteDetail.code}
            />

            <View style={commonStyles.space}>
              <Text style={styles.labelText}>Quote Title</Text>
              <InputBox
                placeHolder=""
                boxStyle={styles.inputBoxStyle}
                inputStyle={styles.input}
                onChangeText={(value) => this.setState({quoteTitle: value})}
                value={quoteDetail.name}
              />
            </View>

            <View style={commonStyles.space}>
              <Text style={styles.labelText}>Quote Number/Code</Text>
              <InputBox
                placeHolder=""
                boxStyle={styles.inputBoxStyle}
                inputStyle={styles.input}
                onChangeText={(value) => this.setState({quoteCode: value})}
                value={quoteDetail.code}
              />
            </View>

            <View style={commonStyles.space}>
              <Text style={styles.labelText}>MPH ID</Text>
              <InputBox
                placeHolder=""
                boxStyle={styles.inputBoxStyle}
                inputStyle={styles.input}
                onChangeText={(value) => this.setState({mphId: value})}
                value={quoteDetail.mph_id}
              />
            </View>

            <View style={commonStyles.space}>
              <Text style={styles.labelText}>PO Preference</Text>
              <InputBox
                placeHolder=""
                boxStyle={styles.inputBoxStyle}
                inputStyle={styles.input}
                onChangeText={(value) => this.setState({poPreference: value})}
                value={quoteDetail.po_reference}
              />
            </View>

            <View style={commonStyles.space}>
              <Text style={styles.labelText}>Type</Text>
              <InputBox
                placeHolder=""
                boxStyle={styles.inputBoxStyle}
                inputStyle={styles.input}
                onChangeText={(value) => this.setState({type: value})}
                value={quoteDetail.type}
              />
            </View>

            <View style={commonStyles.space}>
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
              <InputBox
                placeHolder=""
                boxStyle={styles.inputBoxStyle}
                inputStyle={styles.input}
                onChangeText={(value) => this.setState({client: value})}
              />
            </View>

            <View style={commonStyles.space}>
              <Text style={styles.labelText}>Status</Text>
              <InputBox
                placeHolder=""
                boxStyle={styles.inputBoxStyle}
                inputStyle={styles.input}
                onChangeText={(value) => this.setState({status: value})}
                value={quoteDetail.status}
              />
            </View>

            <View style={commonStyles.space}>
              <ExpandCollapseLayout title="+ Payment & Shipping">
                <Text style={styles.labelText}>Currency</Text>
                <InputBox
                  placeHolder=""
                  boxStyle={styles.inputBoxStyle}
                  inputStyle={styles.input}
                  onChangeText={(value) =>
                    this.setState({paymentCurrency: value})
                  }
                />
                <View style={commonStyles.space}>
                  <Text style={styles.labelText}>Payment Term</Text>
                  <InputBox
                    placeHolder=""
                    boxStyle={styles.inputBoxStyle}
                    inputStyle={styles.input}
                    onChangeText={(value) =>
                      this.setState({paymentTerm: value})
                    }
                  />
                </View>
                <View style={commonStyles.space}>
                  <Text style={styles.labelText}>VAT Percentage</Text>
                  <InputBox
                    placeHolder=""
                    boxStyle={styles.inputBoxStyle}
                    inputStyle={styles.input}
                    onChangeText={(value) => this.setState({paymentVat: value})}
                  />
                </View>
                <View style={commonStyles.space}>
                  <Text style={styles.labelText}>Shipping Method</Text>
                  <SimpleDropdown
                    placeHolder="Please select Shipping Method"
                    style={commonStyles.dropDownStyle}
                    drowdownArray={arrDataMethod}
                    dropDownWidth={'85%'}
                    imageStyle={{
                      marginTop: moderateScale(10),
                      ...commonStyles.icon,
                    }}
                    isIconVisible={true}
                  />
                </View>

                <View style={commonStyles.space}>
                  <Text style={styles.labelText}>Shipping Cost</Text>
                  <InputBox
                    placeHolder=""
                    boxStyle={styles.inputBoxStyle}
                    inputStyle={styles.input}
                    onChangeText={(value) =>
                      this.setState({shippingCost: value})
                    }
                  />
                </View>

                <View style={commonStyles.topMargin}>
                  <Text style={styles.labelText}>Total Weight : 0 LB</Text>
                  <ButtonWithImage
                    onPress={() => this.calculateCost()}
                    isShowRightIcon
                    style={commonStyles.otherButtons}
                    textStyle={commonStyles.otherButtonText}
                    rightImage={rightArrow}>
                    Calculate Cost
                  </ButtonWithImage>
                </View>
              </ExpandCollapseLayout>
            </View>
            <View style={commonStyles.space}>
              <ExpandCollapseLayout title="+ Billing & Shipping Address">
                <CheckBox
                  title="Same As Billing"
                  checked={isRememberMe}
                  onPress={() => this.setState({isRememberMe: !isRememberMe})}
                  checkedColor={BLACK}
                  containerStyle={commonStyles.checkBoxContainer}
                  uncheckedIcon="square"
                  size={15}
                  textStyle={commonStyles.checkBoxText}
                />

                <Text style={styles.topLabelText}>Billing</Text>

                <Text style={styles.labelText}>Company Name</Text>
                <InputBox
                  placeHolder=""
                  boxStyle={styles.inputBoxStyle}
                  inputStyle={styles.input}
                  onChangeText={(value) =>
                    this.setState({billingcompanyName: value})
                  }
                />

                <View style={commonStyles.space}>
                  <Text style={styles.labelText}>First Name</Text>
                  <InputBox
                    placeHolder=""
                    boxStyle={styles.inputBoxStyle}
                    inputStyle={styles.input}
                    onChangeText={(value) =>
                      this.setState({billingfirstName: value})
                    }
                  />
                </View>

                <View style={commonStyles.space}>
                  <Text style={styles.labelText}>Last Name</Text>
                  <InputBox
                    placeHolder=""
                    boxStyle={styles.inputBoxStyle}
                    inputStyle={styles.input}
                    onChangeText={(value) =>
                      this.setState({billinglastName: value})
                    }
                  />
                </View>

                <View style={commonStyles.space}>
                  <Text style={styles.labelText}>Email</Text>
                  <InputBox
                    placeHolder=""
                    boxStyle={styles.inputBoxStyle}
                    inputStyle={styles.input}
                    onChangeText={(value) =>
                      this.setState({billingEmail: value})
                    }
                  />
                </View>

                <View style={commonStyles.space}>
                  <Text style={styles.labelText}>Address 1</Text>
                  <InputBox
                    placeHolder=""
                    maxLines={5}
                    maxLength={50}
                    boxStyle={styles.inputBoxStyle}
                    inputStyle={styles.input}
                    onChangeText={(value) =>
                      this.setState({billingAdd1: value})
                    }
                  />
                </View>

                <View style={commonStyles.space}>
                  <Text style={styles.labelText}>Address 2</Text>
                  <InputBox
                    placeHolder=""
                    maxLines={5}
                    maxLength={50}
                    boxStyle={styles.inputBoxStyle}
                    inputStyle={styles.input}
                    onChangeText={(value) =>
                      this.setState({billingAdd2: value})
                    }
                  />
                </View>

                <View style={commonStyles.space}>
                  <Text style={styles.labelText}>City</Text>
                  <InputBox
                    placeHolder=""
                    boxStyle={styles.inputBoxStyle}
                    inputStyle={styles.input}
                    onChangeText={(value) =>
                      this.setState({billingCity: value})
                    }
                  />
                </View>

                <View style={commonStyles.space}>
                  <Text style={styles.labelText}>Country</Text>
                  <InputBox
                    placeHolder=""
                    boxStyle={styles.inputBoxStyle}
                    inputStyle={styles.input}
                    onChangeText={(value) =>
                      this.setState({billingCountry: value})
                    }
                  />
                </View>

                <View style={commonStyles.space}>
                  <Text style={styles.labelText}>Postal Code/Zip Code</Text>
                  <InputBox
                    maxLength={6}
                    placeHolder=""
                    boxStyle={styles.inputBoxStyle}
                    inputStyle={styles.input}
                    onChangeText={(value) =>
                      this.setState({billingPostalCode: value})
                    }
                  />
                </View>

                <Text style={styles.topLabelText}>Shipping</Text>

                <Text style={styles.labelText}>Company Name</Text>
                <InputBox
                  placeHolder=""
                  boxStyle={styles.inputBoxStyle}
                  inputStyle={styles.input}
                  onChangeText={(value) =>
                    this.setState({shippingCompanyName: value})
                  }
                />

                <View style={commonStyles.space}>
                  <Text style={styles.labelText}>First Name</Text>
                  <InputBox
                    placeHolder=""
                    boxStyle={styles.inputBoxStyle}
                    inputStyle={styles.input}
                    onChangeText={(value) =>
                      this.setState({shippingFirstName: value})
                    }
                  />
                </View>

                <View style={commonStyles.space}>
                  <Text style={styles.labelText}>Last Name</Text>
                  <InputBox
                    placeHolder=""
                    boxStyle={styles.inputBoxStyle}
                    inputStyle={styles.input}
                    onChangeText={(value) =>
                      this.setState({shippingLastName: value})
                    }
                  />
                </View>

                <View style={commonStyles.space}>
                  <Text style={styles.labelText}>Email</Text>
                  <InputBox
                    placeHolder=""
                    boxStyle={styles.inputBoxStyle}
                    inputStyle={styles.input}
                    onChangeText={(value) =>
                      this.setState({shippingEmail: value})
                    }
                  />
                </View>

                <View style={commonStyles.space}>
                  <Text style={styles.labelText}>Address 1</Text>
                  <InputBox
                    placeHolder=""
                    maxLines={5}
                    maxLength={50}
                    boxStyle={styles.inputBoxStyle}
                    inputStyle={styles.input}
                    onChangeText={(value) =>
                      this.setState({shippingAdd1: value})
                    }
                  />
                </View>

                <View style={commonStyles.space}>
                  <Text style={styles.labelText}>Address 2</Text>
                  <InputBox
                    placeHolder=""
                    maxLines={5}
                    maxLength={50}
                    boxStyle={styles.inputBoxStyle}
                    inputStyle={styles.input}
                    onChangeText={(value) =>
                      this.setState({shippingAdd2: value})
                    }
                  />
                </View>

                <View style={commonStyles.space}>
                  <Text style={styles.labelText}>City</Text>
                  <InputBox
                    placeHolder=""
                    boxStyle={styles.inputBoxStyle}
                    inputStyle={styles.input}
                    onChangeText={(value) =>
                      this.setState({shippingCity: value})
                    }
                  />
                </View>

                <View style={commonStyles.space}>
                  <Text style={styles.labelText}>Country</Text>
                  <InputBox
                    placeHolder=""
                    boxStyle={styles.inputBoxStyle}
                    inputStyle={styles.input}
                    onChangeText={(value) =>
                      this.setState({shippingCountry: value})
                    }
                  />
                </View>

                <View style={commonStyles.space}>
                  <Text style={styles.labelText}>Postal Code/Zip Code</Text>
                  <InputBox
                    maxLength={6}
                    placeHolder=""
                    boxStyle={styles.inputBoxStyle}
                    inputStyle={styles.input}
                    onChangeText={(value) =>
                      this.setState({shippingPostalCode: value})
                    }
                  />
                </View>
              </ExpandCollapseLayout>
            </View>
            <View style={commonStyles.space}>
              <ExpandCollapseLayout title="+ Terms & Conditions">
                <Text style={styles.topLabelText}>Terms & Conditions</Text>
                <Text
                  style={{...styles.labelText, marginTop: moderateScale(-5)}}>
                  Note
                </Text>
                <InputBox
                  placeHolder=""
                  maxLines={5}
                  maxLength={50}
                  boxStyle={{
                    ...styles.inputBoxStyle2,
                  }}
                  inputStyle={styles.input}
                  onChangeText={(value) => this.setState({terms: value})}
                />
              </ExpandCollapseLayout>
            </View>

            <View style={commonStyles.space}>
              <Text style={styles.topLabelText}>List Of Items</Text>
              <TouchableOpacity style={styles.quotesRow}>
                <View style={styles.listWidth}>
                  <Text style={styles.listRowText}>REF/SKU</Text>
                </View>
                <View style={styles.listWidth}>
                  <Text style={styles.listRowText}>PRODUCT</Text>
                </View>
                <View style={styles.listWidth}>
                  <Text style={styles.listRowText}>UNIT PRICE</Text>
                </View>
                <View style={styles.listWidth}>
                  <Text style={styles.listRowText}>BUY PRICE</Text>
                </View>
                <View style={styles.listWidth}>
                  <Text style={styles.listRowText}>QTY</Text>
                </View>
                <View style={styles.listWidth}>
                  <Text style={styles.listRowText}>TOTAL</Text>
                </View>
              </TouchableOpacity>
            </View>
            <FlatList
              style={styles.parentFlatList}
              data={items}
              extraData={this.state}
              keyExtractor={(item, index) => '' + index}
              renderItem={({item, index}) => this.listItem(item, index)}
            />
            <ButtonDefault onPress={() => this.addEditQuote('EditQuote')}>
              SAVE
            </ButtonDefault>
          </View>
          <OverlaySpinner
            cancelable
            visible={showLoading}
            color={WHITE}
            textContent="Please wait..."
            textStyle={{color: WHITE}}
          />
        </ScrollView>
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
  bottomQuotesRow: {
    flexDirection: 'row',
    marginHorizontal: moderateScale(10),
    alignItems: 'center',
    justifyContent: 'center',
  },
  parentFlatList: {
    marginTop: moderateScale(10),
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
    justifyContent: 'space-between',
    marginTop: moderateScale(20),
    marginHorizontal: moderateScale(20),
  },
  quotesRow: {
    flexDirection: 'row',
    width: '100%',
    marginHorizontal: moderateScale(10),
    marginTop: moderateScale(10),
    justifyContent: 'space-between',
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
  topLabelText: {
    fontSize: moderateScale(15),
    margin: moderateScale(10),
    fontWeight: 'bold',
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
  inputBoxStyle2: {
    marginTop: moderateScale(-10),
    height: moderateScale(100),
    borderRadius: 0,
    borderWidth: 1,
    borderBottomWidth: 1,
    borderColor: DARK_BLUE,
  },
  input: {
    fontWeight: 'normal',
    fontSize: moderateScale(10),
  },
  recentText: {
    fontSize: moderateScale(12),
    fontWeight: 'bold',
  },
  seeText: {
    fontSize: moderateScale(11),
    color: WHITE,
  },
  listWidth: {
    width: '16%',
  },
  listRowText: {
    fontSize: moderateScale(8),
    fontWeight: 'normal',
  },
});

const mapStateToProps = (state) => ({
  online: state.netInfo.online,
});

const mapDispatchToProps = {
  addQuote,
};

export default connect(mapStateToProps, mapDispatchToProps)(AddQuoteClient);

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
import {USER, BACK, TASK, DRAWER_MENU} from '../../constants/Images';
import {ScaledSheet, moderateScale} from 'react-native-size-matters';
import AddNewButtonGroup from '../../components/AddNewButtonGroup';
import ClickableText from '../../components/ClickableText';
import SimpleDropdown from '../../components/SimpleDropdown';
import {isEmailValid, showErrorPopup} from '../../util/utils';
import moment from 'moment';
import Toast from 'react-native-simple-toast';
import InputBox from '../../components/InputBox';
import {CheckBox} from 'react-native-elements';
import TouchableImage from '../../components/TouchableImage';
import ContainerSearch from '../../components/ContainerSearch';
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
  Alert
} from 'react-native';
import ButtonDefault from '../../components/ButtonDefault';
import DateTimePicker from "react-native-modal-datetime-picker";
const arrDataDesignation = ['Pending', 'Accepted', 'Rejected'];
import OverlaySpinner from '../../components/OverlaySpinner';
import {connect} from 'react-redux';
import {updateClient} from '../../redux/reducers/clients';

class EditClient extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      items: [1, 2, 3, 4],
      clientId : "",
      clientDetail: {},
      isRememberMe: false,
      showLoading: false,
      clientname: '',
      first3letters: '',
      mphId: '',
      trading: '',
      vatReg: '',
      comRegNum: '',
      targetTech: '',
      email: '',
      currency: '',
      description: '',
      add1: '',
      add2: '',
      city: '',
      country: '',
      postalCode: '',
      phone: '',
      firstName: '',
      surName: '',
      contactEmail: '',
      contAdd1: '',
      contAdd2: '',
      contCity: '',
      contCountry: '',
      contPostalCode: '',
      contPhone: '',
      contMobile: '',
      bankName : '',
      bankSortCode : '',
      bankAccountNo : '',
      bankAddress : '',
      finYear : 'Select Financial Year End Date',
      cardLimit : '',
      holdingCompany : '',
      tradeAddress : '',
      tradePhone : '',
      tradeFax : '',
      tradeRegNumber: '',
      tradeRegDate : 'Select Registeration Date',
      tradeVatRegNumber: '',
      tradeRefName : '',
      tradeRefPhone : '',
      tradeRefAddress : '',
      tradeRefFax: '',
      tradeRefContactName : '',
      tradeRefBankerName : '',
      tradeRefBankerAddress : '',
      tradeRefBankerAccountNumber : '',
      regDatePickerVisible: false,
      yearDatePickerVisible : false,
      website : '',
      note : ''
    };
  }
  componentDidMount = () => {
    if (this.props.route.params) {
      if (this.props.route.params.clientData !== undefined) {
         console.log('djdjdjd', this.props.route.params);
        this.setState({
          clientDetail: this.props.route.params.clientData.clientDetail,
          clientname : this.props.route.params.clientData.clientDetail.name,
          first3letters : this.props.route.params.clientData.clientDetail.name_prefix,
          mphId : this.props.route.params.clientData.clientDetail.mph_id,
          trading : this.props.route.params.clientData.clientDetail.trading_as,
          vatReg : this.props.route.params.clientData.clientDetail.vat_registeration_no,
          comRegNum : this.props.route.params.clientData.clientDetail.company_registeration_no,
          targetTech: this.props.route.params.clientData.clientDetail.target_technology,
          email: this.props.route.params.clientData.clientDetail.email,
          currency: this.props.route.params.clientData.clientDetail.currency,
          description: this.props.route.params.clientData.clientDetail.company_description,
          add1: this.props.route.params.clientData.clientDetail.address1,
          add2: this.props.route.params.clientData.clientDetail.address2,
          city: this.props.route.params.clientData.clientDetail.city,
          country: this.props.route.params.clientData.clientDetail.country_name,
          postalCode: this.props.route.params.clientData.clientDetail.zip_code,
          firstName: this.props.route.params.clientData.clientDetail.contact1_first_name,
          surName: this.props.route.params.clientData.clientDetail.contact1_last_name,
          contactEmail: this.props.route.params.clientData.clientDetail.contact1_email,
          contactAdd1: this.props.route.params.clientData.clientDetail.contact1_address1,
          contactAdd2: this.props.route.params.clientData.clientDetail.contact1_address2,
          contactCity: this.props.route.params.clientData.clientDetail.contact1_city,
          contactCountry: this.props.route.params.clientData.clientDetail.contact1_country,
          contactPostalCode: this.props.route.params.clientData.clientDetail.contact1_zip_code,
          contactPhone: this.props.route.params.clientData.clientDetail.contact1_phone,
          contactMobile: this.props.route.params.clientData.clientDetail.contact1_mobile,
          bankName: this.props.route.params.clientData.clientDetail.bank_name,
          bankSortCode: this.props.route.params.clientData.clientDetail.bank_sort_code,
          bankAccountNo: this.props.route.params.clientData.clientDetail.bank_account_no,
          bankAddress: this.props.route.params.clientData.clientDetail.bank_address,
          finYearEnd: this.props.route.params.clientData.clientDetail.financial_year_end,
          cardLimit: this.props.route.params.clientData.clientDetail.anticipated_card_limit,
          holdingCompany: this.props.route.params.clientData.clientDetail.holding_company,
          tradeAddress: this.props.route.params.clientData.clientDetail.trading_address,
          tradePhone: this.props.route.params.clientData.clientDetail.trading_phone,
          tradeFax: this.props.route.params.clientData.clientDetail.trading_fax,
          tradeRegNumber:this.props.route.params.clientData.clientDetail.trading_registeration_number,
          tradeRegDate : this.props.route.params.clientData.clientDetail.trading_registeration_date,
          tradeVatRegNumber : this.props.route.params.clientData.clientDetail.trading_vat_registeration_number,
          tradeRefName: this.props.route.params.clientData.clientDetail.trade_ref_name,
          tradeRefAddress: this.props.route.params.clientData.clientDetail.trade_ref_address,
          tradeRefPhone: this.props.route.params.clientData.clientDetail.trade_ref_phone,
          tradeRefFax: this.props.route.params.clientData.clientDetail.trade_ref_fax,
          tradeRefContactName: this.props.route.params.clientData.clientDetail.trade_ref_contact_name,
          tradeRefBankerName: this.props.route.params.clientData.clientDetail.trade_ref_banker_name,
          tradeRefBankerAddress: this.props.route.params.clientData.clientDetail.trade_ref_banker_address,
          tradeRefBankerAccountNumber: this.props.route.params.clientData.clientDetail.trade_ref_banker_account_number,
          website: this.props.route.params.clientData.clientDetail.website,
          note: this.props.route.params.clientData.clientDetail.note

        });
        this.setState({clientId : this.props.route.params.clientData.clientDetail.id})
      }
    }
  };
  showDateTimePicker = (val) => {
    if(val == "regDatePickerVisible")
    {
    this.setState({ regDatePickerVisible: true })
    }
    else {
     this.setState({ yearDatePickerVisible: true })
    }
  };
 
  hideDateTimePicker = (val) => {
    if(val == "regDatePickerVisible")
    {
    this.setState({ regDatePickerVisible: false })
    }
    else {
     this.setState({ yearDatePickerVisible: false})
    }
  };
 
  handleDatePicked = (date, val) => {
    console.log("A date has been picked: ", date);
    var selectedDate= moment(date).format("MM/DD/YYYY")
    // console.log('jjs,', selectedDate)
    if(val == "regDatePickerVisible")
    {
    this.setState({ tradeRegDate: selectedDate })
    }
    else {
     this.setState({ finYear: selectedDate})
    }
    this.hideDateTimePicker(val);
  };


  updateClient = () => {
    const {
      clientId,
      clientname,
      first3letters,
      mphId,
      trading,
      vatReg,
      comRegNum,
      targetTech,
      email,
      currency,
      description,
      add1,
      add2,
      city,
      country,
      postalCode,
      phone,
      firstName,
      surName,
      contactEmail,
      contAdd1,
      contAdd2,
      contCity,
      contCountry,
      contPostalCode,
      contPhone,
      contMobile,
      bankName,
      bankSortCode,
      bankAccountNo,
      bankAddress,
      finYear,
      cardLimit,
      holdingCompany,
      tradeAddress,
      tradePhone,
      tradeFax,
      tradeRegNumber,
      tradeRegDate,
      tradeVatRegNumber,
      tradeRefName,
      tradeRefPhone,
      tradeRefAddress,
      tradeRefFax,
      tradeRefContactName,
      tradeRefBankerName,
      tradeRefBankerAddress,
      tradeRefBankerAccountNumber
    } = this.state;
    const {online} = this.props;
if(clientname && first3letters && email){
  if(isEmailValid(email) && isEmailValid(contactEmail)){
    if (online) {
      this.setState({showLoading: true});
      this.props
        .updateClient(
          clientId,
          clientname,
          first3letters,
          mphId,
          trading,
          vatReg,
          comRegNum,
          targetTech,
          email,
          currency,
          description,
          add1,
          add2,
          city,
          country,
          postalCode,
          phone,
          firstName,
          surName,
          contactEmail,
          contAdd1,
          contAdd2,
          contCity,
          contCountry,
          contPostalCode,
          contPhone,
          contMobile,
          bankName,
          bankSortCode,
          bankAccountNo,
          bankAddress,
          finYear,
          cardLimit,
          holdingCompany,
      tradeAddress,
      tradePhone,
      tradeFax,
      tradeRegNumber,
      tradeRegDate,
      tradeVatRegNumber,
      tradeRefName,
      tradeRefPhone,
      tradeRefAddress,
      tradeRefFax,
      tradeRefContactName,
      tradeRefBankerName,
      tradeRefBankerAddress,
      tradeRefBankerAccountNumber
          
        )
        .then((response) => {
          this.setState({showLoading: false});
          if (response.code === 200) {
            console.log('shhh', response)
          Toast.show(response.message)
          this.props.navigation.navigate('AllClients')
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
    Alert.alert('', 'Enter Valid Email Address');
  }
  }
  else {
    Alert.alert('', 'Please Enter Valid Details');
  }
  };

  render() {
    const {items, clientDetail, clientname, first3letters, mphId, trading, vatReg, comRegNum, targetTech, email, currency, description, add1, add2, city,country, postalCode, 
      firstName,surName,contactEmail,contAdd1,contAdd2,contCity,contCountry,contPostalCode,contPhone,
      contMobile, isRememberMe, showLoading,  bankName ,
      bankSortCode,
      bankAccountNo,
      bankAddress,
      finYear,
      cardLimit,
      holdingCompany,
      tradeAddress,
      tradePhone,
      tradeFax,
      tradeRegNumber,
      tradeRegDate,
      tradeVatRegNumber,
      tradeRefName,
      tradeRefPhone,
      tradeRefAddress,
      tradeRefFax,
      tradeRefContactName,
      tradeRefBankerName,
      tradeRefBankerAddress,
      tradeRefBankerAccountNumber,
      regDatePickerVisible,
      yearDatePickerVisible,
      website,
      note
    } = this.state;

    return (
      <SafeAreaView style={commonStyles.ketboardAvoidingContainer}>
        <Header
          navigation={this.props.navigation}
          rightImage={USER}
          title="CLIENT"
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
            <Text style={styles.labelText}>Client Name</Text>
            <InputBox
              placeHolder=""
              boxStyle={styles.inputBoxStyle}
              inputStyle={styles.input}
              onChangeText={(value) => this.setState({clientname: value})}
              value={clientname}
            />

            <View style={commonStyles.space}>
              <Text style={styles.labelText}>
                Prefix (First 3 letters of Name)
              </Text>
              <InputBox
                placeHolder=""
                boxStyle={styles.inputBoxStyle}
                inputStyle={styles.input}
                onChangeText={(value) => this.setState({first3letters: value})}
                value={first3letters}
              />
            </View>

            <View style={commonStyles.space}>
              <Text style={styles.labelText}>MPH ID</Text>
              <InputBox
              keyboardType={'numeric'}
                placeHolder=""
                boxStyle={styles.inputBoxStyle}
                inputStyle={styles.input}
                onChangeText={(value) => this.setState({mphId: value})}
                value={mphId}
              />
            </View>

            <View style={commonStyles.space}>
              <Text style={styles.labelText}>Trading As</Text>
              <InputBox
                placeHolder=""
                boxStyle={styles.inputBoxStyle}
                inputStyle={styles.input}
                onChangeText={(value) => this.setState({trading: value})}
                value={trading}
              />
            </View>

            <View style={commonStyles.space}>
              <Text style={styles.labelText}>VAT Registration</Text>
              <InputBox
                placeHolder=""
                boxStyle={styles.inputBoxStyle}
                inputStyle={styles.input}
                onChangeText={(value) => this.setState({vatReg: value})}
                value={vatReg}
                    keyboardType={'numeric'}
              />
            </View>

            <View style={commonStyles.space}>
              <Text style={styles.labelText}>Company Registration Number</Text>
              <InputBox
                placeHolder=""
                boxStyle={styles.inputBoxStyle}
                inputStyle={styles.input}
                onChangeText={(value) => this.setState({comRegNum: value})}
                value={comRegNum}
                keyboardType={'numeric'}
              />
            </View>

            <View style={commonStyles.space}>
              <Text style={styles.labelText}>Target Technology</Text>
              <InputBox
                placeHolder=""
                boxStyle={styles.inputBoxStyle}
                inputStyle={styles.input}
                onChangeText={(value) => this.setState({targetTech: value})}
                value={targetTech}
              />
            </View>

            <View style={commonStyles.space}>
              <Text style={styles.labelText}>Email</Text>
              <InputBox
                placeHolder=""
                boxStyle={styles.inputBoxStyle}
                inputStyle={styles.input}
                onChangeText={(value) => this.setState({email: value})}
                value={email}
              />
            </View>

            <View style={commonStyles.space}>
              <Text style={styles.labelText}>Currency</Text>
              <InputBox
                placeHolder=""
                boxStyle={styles.inputBoxStyle}
                inputStyle={styles.input}
                onChangeText={(value) => this.setState({currency: value})}
                value={currency}
              />
            </View>
            <View style={commonStyles.space}>
              <Text style={styles.labelText}>Website</Text>
              <InputBox
                placeHolder=""
                boxStyle={styles.inputBoxStyle}
                inputStyle={styles.input}
                onChangeText={(value) => this.setState({website: value})
              }
              value={website}
              />
            </View>

            <View style={commonStyles.space}>
              <Text style={styles.labelText}>Note</Text>
              <InputBox
                    placeHolder=""
                    maxLines={5}
                    maxLength={50}
                    boxStyle={styles.inputBoxStyle}
                    inputStyle={styles.input}
                    onChangeText={(value) => this.setState({note: value})}
                    value={note}
                  />
            </View>
            <View style={commonStyles.space}>
              <ExpandCollapseLayout title="+ Company Description">
                <Text
                  style={{
                    ...styles.topLabelText,
                    marginTop: moderateScale(10),
                  }}>
                  Description
                </Text>

                <InputBox
                  placeHolder=""
                  maxLines={5}
                  maxLength={50}
                  boxStyle={{
                    ...styles.inputBoxStyle2,
                  }}
                  inputStyle={styles.input}
                  onChangeText={(value) => this.setState({description: value})}
                  value={description}
                />
              </ExpandCollapseLayout>
            </View>

            <View style={commonStyles.space}>
              <ExpandCollapseLayout title="+ Address">
                <View style={commonStyles.space}>
                  <Text style={styles.labelText}>Address 1</Text>
                  <InputBox
                    placeHolder=""
                    maxLines={5}
                    maxLength={50}
                    boxStyle={styles.inputBoxStyle}
                    inputStyle={styles.input}
                    onChangeText={(value) => this.setState({add1: value})}
                    value={add1}
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
                    onChangeText={(value) => this.setState({add2: value})}
                    value={add2}
                  />
                </View>

                <View style={commonStyles.space}>
                  <Text style={styles.labelText}>City</Text>
                  <InputBox
                    placeHolder=""
                    boxStyle={styles.inputBoxStyle}
                    inputStyle={styles.input}
                    onChangeText={(value) => this.setState({city: value})}
                    value={city}
                  />
                </View>

                <View style={commonStyles.space}>
                  <Text style={styles.labelText}>Country</Text>
                  <InputBox
                    placeHolder=""
                    boxStyle={styles.inputBoxStyle}
                    inputStyle={styles.input}
                    onChangeText={(value) => this.setState({country: value})}
                    value={country}
                  />
                </View>

                <View style={commonStyles.space}>
                  <Text style={styles.labelText}>Postal Code/Zip Code</Text>
                  <InputBox
                    keyboardType={'numeric'}
                    maxLength={6}
                    placeHolder=""
                    boxStyle={styles.inputBoxStyle}
                    inputStyle={styles.input}
                    onChangeText={(value) => this.setState({postalCode: value})}
                    value={postalCode}
                  />
                </View>
              </ExpandCollapseLayout>
            </View>

            <View style={commonStyles.space}>
              <ExpandCollapseLayout title="+ Contact">
                <CheckBox
                  title="Same details As Address?"
                  checked={isRememberMe}
                  onPress={() => this.setState({isRememberMe: !isRememberMe})}
                  checkedColor={BLACK}
                  containerStyle={commonStyles.checkBoxContainer}
                  uncheckedIcon="square"
                  size={15}
                  textStyle={commonStyles.checkBoxText}
                />

                <View style={commonStyles.space}>
                  <Text style={styles.labelText}>First Name</Text>
                  <InputBox
                    placeHolder=""
                    boxStyle={styles.inputBoxStyle}
                    inputStyle={styles.input}
                    onChangeText={(value) => this.setState({firstName: value})}
                    value={firstName}
                  />
                </View>

                <View style={commonStyles.space}>
                  <Text style={styles.labelText}>Surname</Text>
                  <InputBox
                    placeHolder=""
                    boxStyle={styles.inputBoxStyle}
                    inputStyle={styles.input}
                    onChangeText={(value) => this.setState({surName: value})}
                    value={surName}
                  />
                </View>

                <View style={commonStyles.space}>
                  <Text style={styles.labelText}>Email</Text>
                  <InputBox
                    placeHolder=""
                    boxStyle={styles.inputBoxStyle}
                    inputStyle={styles.input}
                    onChangeText={(value) =>
                      this.setState({contactEmail: value})
                    }
                    value={contactEmail}
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
                    onChangeText={(value) => this.setState({contAdd1: value})}
                    value={contAdd1}
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
                    onChangeText={(value) => this.setState({contAdd2: value})}
                    value={contAdd2}
                  />
                </View>

                <View style={commonStyles.space}>
                  <Text style={styles.labelText}>City</Text>
                  <InputBox
                    placeHolder=""
                    boxStyle={styles.inputBoxStyle}
                    inputStyle={styles.input}
                    onChangeText={(value) => this.setState({contCity: value})}
                    value={contCity}
                  />
                </View>

                <View style={commonStyles.space}>
                  <Text style={styles.labelText}>Country</Text>
                  <InputBox
                    placeHolder=""
                    boxStyle={styles.inputBoxStyle}
                    inputStyle={styles.input}
                    onChangeText={(value) =>
                      this.setState({contCountry: value})
                    }
                    value={contCountry}
                  />
                </View>

                <View style={commonStyles.space}>
                  <Text style={styles.labelText}>Postal Code/Zip Code</Text>
                  <InputBox
                    maxLength={6}
                    keyboardType={'numeric'}
                    placeHolder=""
                    boxStyle={styles.inputBoxStyle}
                    inputStyle={styles.input}
                    onChangeText={(value) =>
                      this.setState({contPostalCode: value})
                    }
                    value={contPostalCode}
                  />
                </View>
                <View style={commonStyles.space}>
                  <Text style={styles.labelText}>Phone</Text>
                  <InputBox
                    placeHolder=""
                    keyboardType={'numeric'}
                    maxLength={10}
                    boxStyle={styles.inputBoxStyle}
                    inputStyle={styles.input}
                    onChangeText={(value) => this.setState({contPhone: value})}
                    value={contPhone}
                  />
                </View>

                <View style={commonStyles.space}>
                  <Text style={styles.labelText}>Mobile</Text>
                  <InputBox
                   keyboardType={'numeric'}
                    maxLength={10}
                    placeHolder=""
                    boxStyle={styles.inputBoxStyle}
                    inputStyle={styles.input}
                    onChangeText={(value) => this.setState({contMobile: value})}
                    value={contMobile}
                  />
                </View>
                <View style={commonStyles.space}>
                  <Text style={styles.labelText}>Designation</Text>
                  <SimpleDropdown
                    placeHolder="Please select designation"
                    style={commonStyles.dropDownStyle}
                    drowdownArray={arrDataDesignation}
                    dropDownWidth={'85%'}
                    imageStyle={{
                      marginTop: moderateScale(10),
                      ...commonStyles.icon,
                    }}
                    isIconVisible={true}
                  />
                </View>
              </ExpandCollapseLayout>
            </View>
            <View style={commonStyles.space}>
              <ExpandCollapseLayout title="+ Financial Information">
                <View style={commonStyles.space}>
                  <Text style={styles.labelText}>Bank Name</Text>
                  <InputBox
                    placeHolder=""
                    boxStyle={styles.inputBoxStyle}
                    inputStyle={styles.input}
                    onChangeText={(value) => this.setState({bankName: value})}
                    value={bankName}
                  />
                </View>

                <View style={commonStyles.space}>
                  <Text style={styles.labelText}>Bank Sort Code</Text>
                  <InputBox
                    placeHolder=""
                    keyboardType={'numeric'}
                    maxLength={10}
                    boxStyle={styles.inputBoxStyle}
                    inputStyle={styles.input}
                    onChangeText={(value) =>
                      this.setState({bankSortCode: value})
                    }
                    value={bankSortCode}
                  />
                </View>

                <View style={commonStyles.space}>
                  <Text style={styles.labelText}>Bank Account No</Text>
                  <InputBox
                    placeHolder=""
                    keyboardType={'numeric'}
                    boxStyle={styles.inputBoxStyle}
                    inputStyle={styles.input}
                    onChangeText={(value) =>
                      this.setState({bankAccountNo: value})
                    }
                    value={bankAccountNo}
                  />
                </View>

                <View style={commonStyles.space}>
                  <Text style={styles.labelText}>Bank Address</Text>
                  <InputBox
                    placeHolder=""
                    maxLines={5}
                    maxLength={50}
                    boxStyle={styles.inputBoxStyle}
                    inputStyle={styles.input}
                    onChangeText={(value) =>
                      this.setState({bankAddress: value})
                    }
                    value={bankAddress}
                  />
                </View>

                <TouchableOpacity style={commonStyles.space} onPress={this.showDateTimePicker.bind(this, 'yearDatePickerVisible')}>
                <Text style={styles.labelText}>Financial Year End</Text>
                  <Text style={styles.labelText}>{this.state.finYear}</Text>
                  <DateTimePicker
                  maximumDate={new Date()}
          isVisible={this.state.yearDatePickerVisible}
          onConfirm={(date) => this.handleDatePicked(date,  'yearDatePickerVisible')}
          onCancel={this.hideDateTimePicker.bind(this, 'yearDatePickerVisible')}
        />
                </TouchableOpacity>

                <View style={commonStyles.space}>
                  <Text style={styles.labelText}>Anticipated Card Limit</Text>
                  <InputBox
                    placeHolder=""
                    boxStyle={styles.inputBoxStyle}
                    inputStyle={styles.input}
                    onChangeText={(value) => this.setState({cardLimit: value})}
                    value={cardLimit}
                  />
                </View>
              </ExpandCollapseLayout>
            </View>
            <View style={commonStyles.space}>
              <ExpandCollapseLayout title="+ Payment Section">
                <View style={commonStyles.space}>
                  <Text style={styles.labelText}>Holding Company</Text>
                  <InputBox
                    placeHolder=""
                    boxStyle={styles.inputBoxStyle}
                    inputStyle={styles.input}
                    onChangeText={(value) =>
                      this.setState({holdingCompany: value})
                    }
                    value={holdingCompany}
                  />
                </View>

                <View style={commonStyles.space}>
                  <Text style={styles.labelText}>Trade Address</Text>
                  <InputBox
                    placeHolder=""
                    maxLines={5}
                    maxLength={50}
                    boxStyle={styles.inputBoxStyle}
                    inputStyle={styles.input}
                    onChangeText={(value) =>
                      this.setState({tradeAddress: value})
                    }
                    value={tradeAddress}
                  />
                </View>

                <View style={commonStyles.space}>
                  <Text style={styles.labelText}>Phone</Text>
                  <InputBox
                    placeHolder=""
                    keyboardType={'numeric'}
                    maxLength={10}
                    boxStyle={styles.inputBoxStyle}
                    inputStyle={styles.input}
                    onChangeText={(value) => this.setState({tradePhone: value})}
                    value={tradePhone}
                  />
                </View>

                <View style={commonStyles.space}>
                  <Text style={styles.labelText}>Fax</Text>
                  <InputBox
                    placeHolder=""
                    boxStyle={styles.inputBoxStyle}
                    inputStyle={styles.input}
                    onChangeText={(value) => this.setState({tradeFax: value})}
                    value={tradeFax}
                  />
                </View>

                <View style={commonStyles.space}>
                  <Text style={styles.labelText}>Registration No</Text>
                  <InputBox
                    placeHolder=""
                    maxLines={5}
                    maxLength={10}
                    keyboardType={'numeric'}
                    boxStyle={styles.inputBoxStyle}
                    inputStyle={styles.input}
                    onChangeText={(value) => this.setState({tradeRegNumber: value})}
                    value={tradeRegNumber}
                  />
                </View>

                <TouchableOpacity style={commonStyles.space} onPress={this.showDateTimePicker.bind(this, 'regDatePickerVisible')} >
                  <Text style={styles.labelText}>Registeration Date</Text>
                  <Text style={styles.labelText}>{this.state.tradeRegDate}</Text>
                  <DateTimePicker
                  maximumDate={new Date()}
          isVisible={this.state.regDatePickerVisible}
          onConfirm={(date) => this.handleDatePicked(date,  'regDatePickerVisible')}
          onCancel={this.hideDateTimePicker.bind(this, 'regDatePickerVisible')}
        />
                </TouchableOpacity>

                <View style={commonStyles.space}>
                  <Text style={styles.labelText}>VAT Registration No</Text>
                  <InputBox
                    placeHolder=""
                    keyboardType={'numeric'}
                    maxLength={10}
                    boxStyle={styles.inputBoxStyle}
                    inputStyle={styles.input}
                    onChangeText={(value) => this.setState({tradeVatRegNumber: value})}
                    value={tradeVatRegNumber}
                  />
                </View>
              </ExpandCollapseLayout>
            </View>
                        <View style={commonStyles.space}>
              <ExpandCollapseLayout title="+ Trade Reference">
                <View style={commonStyles.space}>
                  <Text style={styles.labelText}>Name</Text>
                  <InputBox
                    placeHolder=""
                    boxStyle={styles.inputBoxStyle}
                    inputStyle={styles.input}
                    onChangeText={(value) => this.setState({tradeRefName: value})}
                    value={tradeRefName}
                  />
                </View>

                <View style={commonStyles.space}>
                  <Text style={styles.labelText}>Address</Text>
                  <InputBox
                    placeHolder=""
                    maxLines={5}
                    maxLength={50}
                    boxStyle={styles.inputBoxStyle}
                    inputStyle={styles.input}
                    onChangeText={(value) => this.setState({tradeRefAddress: value})}
                    value={tradeRefAddress}
                  />
                </View>

                <View style={commonStyles.space}>
                  <Text style={styles.labelText}>Phone</Text>
                  <InputBox
                    placeHolder=""
                    keyboardType={'numeric'}
                    maxLength={10}
                    boxStyle={styles.inputBoxStyle}
                    inputStyle={styles.input}
                    onChangeText={(value) => this.setState({tradeRefPhone: value})}
                    value={tradeRefPhone}
                  />
                </View>

                <View style={commonStyles.space}>
                  <Text style={styles.labelText}>Fax</Text>
                  <InputBox
                    placeHolder=""
                    boxStyle={styles.inputBoxStyle}
                    inputStyle={styles.input}
                    onChangeText={(value) => this.setState({tradeRefFax: value})}
                    value={tradeRefFax}
                  />
                </View>

                <View style={commonStyles.space}>
                  <Text style={styles.labelText}>Contact Name</Text>
                  <InputBox
                    placeHolder=""
                    maxLines={5}
                    maxLength={50}
                    boxStyle={styles.inputBoxStyle}
                    inputStyle={styles.input}
                    onChangeText={(value) =>
                      this.setState({tradeRefContactName: value})
                    }
                    value={tradeRefContactName}
                  />
                </View>

                <View style={commonStyles.space}>
                  <Text style={styles.labelText}>Bankers Name</Text>
                  <InputBox
                    placeHolder=""
                    boxStyle={styles.inputBoxStyle}
                    inputStyle={styles.input}
                    onChangeText={(value) => this.setState({tradeRefBankerName: value})}
                    value={tradeRefBankerName}
                  />
                </View>

                <View style={commonStyles.space}>
                  <Text style={styles.labelText}>Bankers Address</Text>
                  <InputBox
                    placeHolder=""
                    maxLines={5}
                    maxLength={50}
                    boxStyle={styles.inputBoxStyle}
                    inputStyle={styles.input}
                    onChangeText={(value) =>
                      this.setState({tradeRefBankerAddress: value})
                    }
                    value={tradeRefBankerAddress}
                  />
                </View>

                <View style={commonStyles.space}>
                  <Text style={styles.labelText}>Account Number</Text>
                  <InputBox
                    placeHolder=""
                    keyboardType={'numeric'}
                    maxLength={16}
                    boxStyle={styles.inputBoxStyle}
                    inputStyle={styles.input}
                    onChangeText={(value) =>
                      this.setState({tradeRefBankerAccountNumber: value})
                    }
                    value={tradeRefBankerAccountNumber}
                  />
                </View>
              </ExpandCollapseLayout>
            </View>
            <ButtonDefault onPress={() => this.updateClient('EditQuote')}>
              SAVE
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
    justifyContent: 'space-between',
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
});

const mapStateToProps = (state) => ({
  online: state.netInfo.online,
});

const mapDispatchToProps = {
  updateClient,
};

export default connect(mapStateToProps, mapDispatchToProps)(EditClient);

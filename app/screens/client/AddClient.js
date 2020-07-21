import React, {PureComponent} from 'react';
import Header from '../../components/Header';
import commonStyles from '../../commonStyles/commonStyles';
import DateTimePicker from "react-native-modal-datetime-picker";
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
  GRAY
} from '../../constants/colors';
import {USER, BACK, TASK} from '../../constants/Images';
import {ScaledSheet, moderateScale} from 'react-native-size-matters';
import ExpandCollapseLayout from '../../components/ExpandCollapseLayout';
import InputBox from '../../components/InputBox';
import {CheckBox} from 'react-native-elements';
import HR from '../../components/HR';
import SimpleDropdown from '../../components/SimpleDropdown';
import {isEmailValid, showErrorPopup} from '../../util/utils';
import moment from 'moment';
import Toast from 'react-native-simple-toast';
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
import OverlaySpinner from '../../components/OverlaySpinner';
import {connect} from 'react-redux';
import {addClient} from '../../redux/reducers/clients';
import ButtonDefault from '../../components/ButtonDefault';
const arrDataDesignation = ['Head of Company', 'Head of Sales', 'Head of Marketing', 'Head of Finance', 'Head of Technical', 'Head of Purchasing', 'Business Development Mgr/Dir', 'Other'];
const arrDataCurrency = ['GBP', 'USD', 'EUR'];

class AddClient extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      items: [1, 2, 3, 4],
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
      website : "",
      note : "",
      countries : [],
      countryIndex : 0
    };
  }
  componentDidMount = () => {
    const {userInfo} = this.props;
   // console.log('userinfo', userInfo)
    const {countries} = this.props;
   // console.log('here are countries', countries);
    for (var i = 0; i < countries.items.length; i++) {
      this.state.countries.push(countries.items[i].name);
    }
    //this.props.navigation.navigate('Cart')
  };

  addEditClient = () => {
    const {
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
      tradeRefBankerAccountNumber,
      website,
      note
    } = this.state;
    const {online, userInfo} = this.props;
if(clientname && first3letters && email){
  if(isEmailValid(email) && isEmailValid(contactEmail)){
    if (online) {
      this.setState({showLoading: true});
      this.props
        .addClient(
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
      tradeRefBankerAccountNumber,
      website,
      note,
      userInfo.reseller_id
        )
        .then((response) => {
          console.log('ddd', response)
          this.setState({showLoading: false});
          if (response.code === 200) {
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

  setSame = (add1, add2, city, country, postalCode, isRememberMe) => {
    console.log('selected', this.state.countries[this.state.countryIndex])
    console.log('isRememberME', isRememberMe)
    if(isRememberMe !== true){
     this.setState({
       contAdd1 : add1,
       contAdd2 : add2,
       contCity : city,
       contCountry : this.state.countries[this.state.countryIndex],
       contPostalCode : postalCode,
       
       
     })
    }
    else {
      this.setState({
        contAdd1 : "",
       contAdd2 : "",
       contCity : "",
       contCountry : "",
       contPostalCode : ""
      })
    }

    this.setState({ isRememberMe : !isRememberMe})
    
  }
 
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

  selectData = (val, type) => {
      this.setState({currency: arrDataCurrency[val]});
  };

  selectItem = (val, type) => {
     if (type == "country"){
      this.setState({country: this.state.countries[val]});
      this.setState({countryIndex: val});
    }
    else if (type == "contCountry"){
      this.setState({contCountry: this.state.scountries[val]});
    } else {
      this.setState({clientId: this.state.clientIds[val]});
      this.setState({client: this.state.clientItems[val]});
    }
  };

  render() {
    const {countries, add1, add2, city, country, postalCode, contAdd1, contAdd2, contCity, contCountry, contPostalCode, items, isRememberMe, showLoading} = this.state;

    return (
      <SafeAreaView style={commonStyles.ketboardAvoidingContainer}>
        <Header
          navigation={this.props.navigation}
          rightImage={USER}
          title="CREATE NEW"
          leftImage={BACK}
        />
        <ScrollView>
          <View
            style={{...commonStyles.content, marginBottom: moderateScale(40)}}>
            <Text style={styles.labelText}>Client Name</Text>
            <InputBox
              placeHolder=""
              boxStyle={styles.inputBoxStyle}
              inputStyle={styles.input}
              onChangeText={(value) => this.setState({clientname: value})}
            />

            <View style={commonStyles.space}>
              <Text style={styles.labelText}>
                Prefix (First 3 letters of Name)
              </Text>
              <InputBox
              maxLength={3}
                placeHolder=""
                boxStyle={styles.inputBoxStyle}
                inputStyle={styles.input}
                onChangeText={(value) => this.setState({first3letters: value})}
              />
            </View>

            <View style={commonStyles.space}>
              <Text style={styles.labelText}>MPH ID</Text>
              <InputBox
                disabled
                placeHolder=""
                boxStyle={styles.inputBoxStyleBackground}
                inputStyle={styles.input}
                onChangeText={(value) => this.setState({mphId: value})}
              />
            </View>

            <View style={commonStyles.space}>
              <Text style={styles.labelText}>Trading As</Text>
              <InputBox
                placeHolder=""
                boxStyle={styles.inputBoxStyle}
                inputStyle={styles.input}
                onChangeText={(value) => this.setState({trading: value})}
              />
            </View>

            <View style={commonStyles.space}>
              <Text style={styles.labelText}>VAT Registration</Text>
              <InputBox
                placeHolder=""
                boxStyle={styles.inputBoxStyle}
                inputStyle={styles.input}
                keyboardType={'numeric'}
                onChangeText={(value) => this.setState({vatReg: value})}
              />
            </View>

            <View style={commonStyles.space}>
              <Text style={styles.labelText}>Company Registration Number</Text>
              <InputBox
                placeHolder=""
                boxStyle={styles.inputBoxStyle}
                inputStyle={styles.input}
                keyboardType={'numeric'}
                onChangeText={(value) => this.setState({comRegNum: value})}
              />
            </View>

            <View style={commonStyles.space}>
              <Text style={styles.labelText}>Target Technology</Text>
              <InputBox
                placeHolder=""
                boxStyle={styles.inputBoxStyle}
                inputStyle={styles.input}
                onChangeText={(value) => this.setState({targetTech: value})}
              />
            </View>

            <View style={commonStyles.space}>
              <Text style={styles.labelText}>Email</Text>
              <InputBox
                placeHolder=""
                boxStyle={styles.inputBoxStyle}
                inputStyle={styles.input}
                onChangeText={(value) => this.setState({email: value})}
              />
            </View>

            <View style={commonStyles.space}>
              <Text style={styles.labelText}>Currency</Text>
              <SimpleDropdown
                    placeHolder="Please select Currency"
                    style={commonStyles.dropDownStyle}
                    drowdownArray={arrDataCurrency}
                    dropDownWidth={'85%'}
                    imageStyle={{
                      marginTop: moderateScale(10),
                      ...commonStyles.icon,
                    }}
                    isIconVisible={true}
                    onSelect={(value) => this.selectData(value, 'currency')}
                  />
            </View>

            <View style={commonStyles.space}>
              <Text style={styles.labelText}>Website</Text>
              <InputBox
                placeHolder=""
                boxStyle={styles.inputBoxStyle}
                inputStyle={styles.input}
                onChangeText={(value) => this.setState({website: value})}
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
                    value={add2}
                    boxStyle={styles.inputBoxStyle}
                    inputStyle={styles.input}
                    onChangeText={(value) => this.setState({add2: value})}
                  />
                </View>

                <View style={commonStyles.space}>
                  <Text style={styles.labelText}>City</Text>
                  <InputBox
                    placeHolder=""
                    boxStyle={styles.inputBoxStyle}
                    inputStyle={styles.input}
                    value={city}
                    onChangeText={(value) => this.setState({city: value})}
                  />
                </View>

                <View style={commonStyles.space}>
                  <Text style={styles.labelText}>Country</Text>
                  <SimpleDropdown
              placeHolder="Please select Country"
              style={commonStyles.dropDownStyle}
              drowdownArray={countries}
              dropDownWidth={'85%'}
              imageStyle={{marginTop: moderateScale(10), ...commonStyles.icon}}
              isIconVisible={true}
              onSelect={(value) => this.selectItem(value, 'country')}
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
                    value={postalCode}
                    onChangeText={(value) => this.setState({postalCode: value})}
                  />
                </View>
              </ExpandCollapseLayout>
            </View>

            <View style={commonStyles.space}>
              <ExpandCollapseLayout title="+ Contact">
                <CheckBox
                  title="Same details As Address?"
                  checked={isRememberMe}
                  onPress={() => this.setSame(add1, add2, city, country, postalCode, isRememberMe)}
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
                  />
                </View>

                <View style={commonStyles.space}>
                  <Text style={styles.labelText}>Surname</Text>
                  <InputBox
                    placeHolder=""
                    boxStyle={styles.inputBoxStyle}
                    inputStyle={styles.input}
                    onChangeText={(value) => this.setState({surName: value})}
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
                    value={contAdd2}
                    onChangeText={(value) => this.setState({contAdd2: value})}
                  />
                </View>

                <View style={commonStyles.space}>
                  <Text style={styles.labelText}>City</Text>
                  <InputBox
                    placeHolder=""
                    boxStyle={styles.inputBoxStyle}
                    inputStyle={styles.input}
                    value={contCity}
                    onChangeText={(value) => this.setState({contCity: value})}
                  />
                </View>

                <View style={commonStyles.space}>
                  <Text style={styles.labelText}>Country</Text>
                  <SimpleDropdown
              placeHolder="Please select Country"
              style={commonStyles.dropDownStyle}
              drowdownArray={countries}
              dropDownWidth={'85%'}
              imageStyle={{marginTop: moderateScale(10), ...commonStyles.icon}}
              isIconVisible={true}
              onSelect={(value) => this.selectItem(value, 'contCountry')}
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
                    value={contPostalCode}
                    onChangeText={(value) =>
                      this.setState({contPostalCode: value})
                    }
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
                  />
                </View>

                <TouchableOpacity style={commonStyles.space} onPress={this.showDateTimePicker.bind(this, 'yearDatePickerVisible')}>
                <Text style={styles.labelText}>Financial Year End</Text>
                  <Text style={styles.labelText}>{this.state.finYear}</Text>
                  {/* <InputBox
                    placeHolder=""
                    maxLines={5}
                    maxLength={50}
                    boxStyle={styles.inputBoxStyle}
                    inputStyle={styles.input}
                    onChangeText={(value) => this.setState({finYear: value})}
                  /> */}
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
                  />
                </View>

                <View style={commonStyles.space}>
                  <Text style={styles.labelText}>Fax</Text>
                  <InputBox
                    placeHolder=""
                    boxStyle={styles.inputBoxStyle}
                    inputStyle={styles.input}
                    onChangeText={(value) => this.setState({tradeFax: value})}
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
                  />
                </View>

                <TouchableOpacity style={commonStyles.space} onPress={this.showDateTimePicker.bind(this, 'regDatePickerVisible')} >
                  <Text style={styles.labelText}>Registeration Date</Text>
                  <Text style={styles.labelText}>{this.state.tradeRegDate}</Text>
                  {/* <InputBox
                    placeHolder=""
                    boxStyle={styles.inputBoxStyle}
                    inputStyle={styles.input}
                    onChangeText={(value) => this.setState({tradeRegDate: value})}
                  /> */}
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
                    onChangeText={(value) => this.setState({tradeVatRegNo: value})}
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
                  />
                </View>

                <View style={commonStyles.space}>
                  <Text style={styles.labelText}>Fax</Text>
                  <InputBox
                    placeHolder=""
                    boxStyle={styles.inputBoxStyle}
                    inputStyle={styles.input}
                    onChangeText={(value) => this.setState({tradeRefFax: value})}
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
                  />
                </View>

                <View style={commonStyles.space}>
                  <Text style={styles.labelText}>Bankers Name</Text>
                  <InputBox
                    placeHolder=""
                    boxStyle={styles.inputBoxStyle}
                    inputStyle={styles.input}
                    onChangeText={(value) => this.setState({tradeRefBankerName: value})}
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
                      this.setState({tradeRefAccountNumber: value})
                    }
                  />
                </View>
              </ExpandCollapseLayout>
            </View>

            
            
            
            <ButtonDefault onPress={() => this.addEditClient('EditQuote')}>
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
  inputBoxStyle2: {
    marginTop: moderateScale(10),
    height: moderateScale(100),
    borderRadius: 0,
    borderWidth: 1,
    borderBottomWidth: 1,
    borderColor: DARK_BLUE,
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
  inputBoxStyleBackground: {
    marginTop: moderateScale(-10),
    height: moderateScale(45),
    backgroundColor : GRAY,
    borderBottomWidth : 0,
    borderWidth : 0,
    borderRadius : 0,
    width : '90%',
    alignSelf : 'center',
    borderBottomColor : WHITE
  },
  input: {
    fontWeight: 'normal',
    fontSize: moderateScale(10),
  },
});

const mapStateToProps = (state) => ({
  online: state.netInfo.online,
  userInfo: state.session.userInfo,
  countries: state.countries.countriesList
});

const mapDispatchToProps = {
  addClient,
};

export default connect(mapStateToProps, mapDispatchToProps)(AddClient);

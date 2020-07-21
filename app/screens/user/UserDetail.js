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
} from '../../constants/colors';
import {USER, BACK, TASK, DRAWER_MENU} from '../../constants/Images';
import {ScaledSheet, moderateScale} from 'react-native-size-matters';
import AddNewButtonGroup from '../../components/AddNewButtonGroup';
import ClickableText from '../../components/ClickableText';
import TouchableImage from '../../components/TouchableImage';
import ExpandCollapseLayout from '../../components/ExpandCollapseLayout';
import ContainerSearch from '../../components/ContainerSearch';
import CardWithIcon from '../../components/CardWithIcon';
import InputBox from '../../components/InputBox';
import SimpleDropdown from '../../components/SimpleDropdown';
import OverlaySpinner from '../../components/OverlaySpinner';
import {connect} from 'react-redux';
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
import {addUSER, updateUser} from '../../redux/reducers/users';
import Toast from 'react-native-simple-toast';
import {isEmailValid, showErrorPopup} from '../../util/utils';

class UserDetail extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      userData : {},
      showLoading : false,
      email : "",
      firstName : "",
      surName : "",
      password : "",
      confirmPassword : "",
      add1 : "",
      add2 : "",
      city : "",
      country : "",
      postalCode : "",
      group : "",
      partner : "",
      phone : "",
      mobile : "",
      countries : [],
      userId : "",
      groupId : [21]
    };
  }
  componentDidMount = () => {
    const {countries} = this.props;
    console.log('here are countries', countries);
    for (var i = 0; i < countries.items.length; i++) {
      this.state.countries.push(countries.items[i].name);
    }
    if (this.props.route.params) {
      console.log('here are params', this.props.route.params);
      if(this.props.route.params.userData !== undefined)
      {
      this.setState({userData : this.props.route.params.userData, email : this.props.route.params.userData.email,
        firstName : this.props.route.params.userData.first_name, surName : this.props.route.params.userData.last_name,
        add1 : this.props.route.params.userData.address1, add2 : this.props.route.params.userData.address2,
        phone : this.props.route.params.userData.phone, mobile : this.props.route.params.userData.mobile,
        postalCode : this.props.route.params.userData.zip_code,
        userId : this.props.route.params.userData.id,
        emailVerified : this.props.route.params.userData.email_verified_at})

        if(this.props.route.params.userData.type == "reseller-user"){
          this.setState({group : "Partner user"})
        }
        else {
          this.setState({group : "Partner admin"})
        }
        if(this.props.route.params.userData.reseller_id == 27){
          this.setState({partner : "Yantra Test Reseller"})
        }
        
      }
    }
    //this.props.navigation.navigate('Cart')
  };

  saveUser = () => {
    const {online, userInfo} = this.props;
    console.log('this grp id', this.state.groupId)
    const {
      email, firstName, surName, add1, add2,
      phone, mobile, postalCode, newPassword, confirmPassword,
      city, userId, groupId
    } = this.state;
    if(email && firstName && surName && newPassword && confirmPassword){
     if(newPassword == confirmPassword)
     {
       if(isEmailValid(email)){
      if (online) {
      this.setState({showLoading: true});
  if(userId == "") {
      this.props
        .addUSER(
          email,
          firstName,
          surName,
          userInfo.reseller_id,
          newPassword,
          add1,
          add2,
          phone, 
          mobile, 
          postalCode,
          city,
          confirmPassword,
          groupId,
        )
        .then((response) => {
          console.log('ddd', response)
          this.setState({showLoading: false});
          if (response.code === 200) {
            Toast.show(response.message)
            this.props.navigation.navigate('AllUsers')
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
      }
      else {
        this.props
        .updateUser(
          userId,
          email,
          firstName,
          surName,
          userInfo.reseller_id,
          newPassword,
          add1,
          add2,
          phone, 
          mobile, 
          postalCode,
          city,
          confirmPassword
        )
        .then((response) => {
          console.log('ddd', response)
          this.setState({showLoading: false});
          if (response.code === 200) {
            Toast.show(response.message)
            this.props.navigation.navigate('AllUsers')
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
      }
    } else {
      Alert.alert('', 'No Internet Connection');
    }
  } else {
    Alert.alert('', 'Please Enter Valid Email Address');
  }
  }
  else {
      Alert.alert('', 'Password Do Not Match')
  }
  }
  else {
    Alert.alert('', 'Please enter details')
  }
  }

  selectData = (val) => {
      this.setState({country: this.state.countries[val]});
  };

  render() {
    const {items, userData, showLoading, email, firstName, surName, add1, add2, city, country, postalCode, emailVerified, group, partner, phone, mobile, countries} = this.state;

    return (
      <SafeAreaView style={commonStyles.ketboardAvoidingContainer}>
        <Header
          navigation={this.props.navigation}
          rightImage={USER}
          title="USERS"
          leftImage={BACK}
        />
        <TouchableOpacity style={commonStyles.content}></TouchableOpacity>
        <ScrollView>
          <View
            style={{...commonStyles.content, marginBottom: moderateScale(40)}}>
            <Text style={styles.labelText}>Email Id (UserName)</Text>
            <InputBox
              placeHolder=""
              boxStyle={styles.inputBoxStyle}
              inputStyle={styles.input}
              onChangeText={(value) => this.setState({email: value})}
              value={email}
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
              <Text style={styles.labelText}>Group</Text>
              <InputBox
                disabled
                placeHolder=""
                boxStyle={styles.inputBoxStyle}
                inputStyle={styles.input}
                onChangeText={(value) => this.setState({group: value})}
                value={group}
              />
            </View>

            <View style={commonStyles.space}>
              <Text style={styles.labelText}>Partner</Text>
              <InputBox
              disabled
                placeHolder=""
                boxStyle={styles.inputBoxStyle}
                inputStyle={styles.input}
                value={partner}
                onChangeText={(value) => this.setState({partner: value})}
              />
            </View>

            <View style={commonStyles.space}>
              <Text style={{...styles.labelText, fontWeight: 'bold'}}>
                Password
              </Text>
            </View>

            <View style={commonStyles.space}>
              <Text style={styles.labelText}>New Password</Text>
              <InputBox
                placeHolder=""
                boxStyle={styles.inputBoxStyle}
                inputStyle={styles.input}
                onChangeText={(value) => this.setState({newPassword: value})}
              />
            </View>
            <View style={commonStyles.space}>
              <Text style={styles.labelText}>Confirm Password</Text>
              <InputBox
                placeHolder=""
                boxStyle={styles.inputBoxStyle}
                inputStyle={styles.input}
                onChangeText={(value) =>
                  this.setState({confirmPassword: value})
                }
              />
            </View>

            <View style={commonStyles.space}>
              <Text style={styles.labelText}>Email Verified At</Text>
              <InputBox
                placeHolder=""
                boxStyle={styles.inputBoxStyle}
                inputStyle={styles.input}
                onChangeText={(value) => this.setState({emailVerified: value})}
                value={emailVerified}
              />
            </View>

            <View style={commonStyles.space}>
              <ExpandCollapseLayout title="+ Contact">
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
                  <SimpleDropdown
              placeHolder="Please select Country"
              style={commonStyles.dropDownStyle}
              drowdownArray={countries}
              dropDownWidth={'85%'}
              imageStyle={{marginTop: moderateScale(10), ...commonStyles.icon}}
              isIconVisible={true}
              onSelect={(value) => this.selectData(value, 'country')}
            />
                </View>

                <View style={commonStyles.space}>
                  <Text style={styles.labelText}>Postal Code/Zip Code</Text>
                  <InputBox
                    maxLength={6}
                    placeHolder=""
                    boxStyle={styles.inputBoxStyle}
                    inputStyle={styles.input}
                    onChangeText={(value) => this.setState({postalCode: value})}
                    value={postalCode}
                  />
                </View>

                <View style={commonStyles.space}>
                  <Text style={styles.labelText}>Phone</Text>
                  <InputBox
                    maxLength={6}
                    placeHolder=""
                    boxStyle={styles.inputBoxStyle}
                    inputStyle={styles.input}
                    onChangeText={(value) => this.setState({phone: value})}
                    value={phone}
                  />
                </View>

                <View style={commonStyles.space}>
                  <Text style={styles.labelText}>Mobile</Text>
                  <InputBox
                    maxLength={6}
                    placeHolder=""
                    boxStyle={styles.inputBoxStyle}
                    inputStyle={styles.input}
                    onChangeText={(value) => this.setState({mobile: value})}
                    value={mobile}
                  />
                </View>
              </ExpandCollapseLayout>
            </View>
            <View style={commonStyles.space}>
              <ExpandCollapseLayout title="+ Activity Summary">
                <View style={commonStyles.space}>
                  <Text style={styles.labelText}>First Login At</Text>
                  <InputBox
                    placeHolder=""
                    maxLines={5}
                    maxLength={50}
                    boxStyle={styles.inputBoxStyle}
                    inputStyle={styles.input}
                    onChangeText={(value) => this.setState({firstLogin: value})}
                  />
                </View>
                <View style={commonStyles.space}>
                  <Text style={styles.labelText}>Last Login At</Text>
                  <InputBox
                    placeHolder=""
                    maxLines={5}
                    maxLength={50}
                    boxStyle={styles.inputBoxStyle}
                    inputStyle={styles.input}
                    onChangeText={(value) => this.setState({lastLogin: value})}
                  />
                </View>
              </ExpandCollapseLayout>
            </View>
            
            <ButtonDefault onPress={() => this.saveUser('AddOrderQuote')}>
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
  userInfo: state.session.userInfo,
  countries: state.countries.countriesList,
});

const mapDispatchToProps = {
  addUSER,
  updateUser
};

export default connect(mapStateToProps, mapDispatchToProps)(UserDetail);

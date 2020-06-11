import React, {PureComponent} from 'react';
import Header from '../../components/Header';
import commonStyles from '../../commonStyles/commonStyles';
import {
  APP_LIGHT_BLUE_COLOR,
  FOREST_COLOR,
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
} from 'react-native';
const arrDataType = ['Partner', 'Client', 'User'];
const arrDataClient = ['Anil', 'Akram', 'Sagar', 'Sanjeev'];
const arrDataStatus = ['Pending', 'Accepted', 'Rejected'];
export default class AddSupportRequest extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      items: [1, 2, 3, 4],
    };
  }
  componentDidMount = () => {
    //this.props.navigation.navigate('Cart')
  };

  addClientQuote = () => {
    this.props.navigation.navigate('AddQuoteClient');
  };

  render() {
    const {items} = this.state;

    return (
      <SafeAreaView style={commonStyles.ketboardAvoidingContainer}>
        <Header
          navigation={this.props.navigation}
          rightImage={USER}
          title="SUPPORT REQUEST"
          leftImage={BACK}
        />
        <View style={styles.rowContent}>
          <View style={{justifyContent: 'center'}}>
            <Text style={commonStyles.textWhite}>Cancel </Text>
          </View>
          <View style={{justifyContent: 'center', alignItems: 'center'}}>
            <Text style={{...commonStyles.textWhite}}>New Ticket </Text>
          </View>
          <View style={{width: '10%'}}></View>
        </View>
        <TouchableOpacity style={commonStyles.content}></TouchableOpacity>
        <ScrollView>
          <View
            style={{...commonStyles.content, marginBottom: moderateScale(40)}}>
            <Text style={styles.labelText}>
              SEARCH A REQUESTER<Text style={commonStyles.redColor}>*</Text>
            </Text>
            <InputBox
              rightIcon="user"
              placeHolder=""
              boxStyle={styles.inputBoxStyle}
              inputStyle={styles.input}
              onChangeText={(value) => this.setState({requester: value})}
            />
            <Text style={styles.labelText}>
              SUBJECT<Text style={commonStyles.redColor}>*</Text>
            </Text>
            <InputBox
              placeHolder=""
              boxStyle={styles.inputBoxStyle}
              inputStyle={styles.input}
              onChangeText={(value) => this.setState({subject: value})}
            />
            <Text style={styles.labelText}>TYPE</Text>
            <SimpleDropdown
              placeHolder="Please select"
              style={styles.dropDownStyle}
              drowdownArray={arrDataType}
              dropDownWidth={'85%'}
              imageStyle={{marginTop: moderateScale(10), ...commonStyles.icon}}
              isIconVisible={true}
            />

            <Text style={styles.labelText}>
              STATUS<Text style={commonStyles.redColor}>*</Text>
            </Text>
            <SimpleDropdown
              placeHolder="Please select"
              style={styles.dropDownStyle}
              drowdownArray={arrDataStatus}
              dropDownWidth={'85%'}
              imageStyle={{marginTop: moderateScale(10), ...commonStyles.icon}}
              isIconVisible={true}
            />

            <Text style={styles.labelText}>
              PRIORITY<Text style={commonStyles.redColor}>*</Text>
            </Text>
            <SimpleDropdown
              placeHolder="Please select"
              style={styles.dropDownStyle}
              drowdownArray={arrDataClient}
              dropDownWidth={'85%'}
              imageStyle={{marginTop: moderateScale(10), ...commonStyles.icon}}
              isIconVisible={true}
            />

            <Text style={styles.labelText}>GROUP</Text>
            <SimpleDropdown
              placeHolder="Please select"
              style={styles.dropDownStyle}
              drowdownArray={arrDataClient}
              dropDownWidth={'85%'}
              imageStyle={{marginTop: moderateScale(10), ...commonStyles.icon}}
              isIconVisible={true}
            />

            <Text style={styles.labelText}>AGENT</Text>
            <SimpleDropdown
              placeHolder="Please select"
              style={styles.dropDownStyle}
              drowdownArray={arrDataClient}
              dropDownWidth={'85%'}
              imageStyle={{marginTop: moderateScale(10), ...commonStyles.icon}}
              isIconVisible={true}
            />
          </View>
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
    backgroundColor: FOREST_COLOR,
    height: moderateScale(45),
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

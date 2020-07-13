import React, {PureComponent} from 'react';
import Header from '../../components/Header';
import commonStyles from '../../commonStyles/commonStyles';
import {
  APP_LIGHT_BLUE_COLOR,
  GRAY,
  SEMI_TRANSPARENT,
  WHITE,
  DARK_BLUE,
  NOTIFICATION_COUNT_BG_COLOR,
  APP_MAIN_GREEN,
  APP_MAIN_BLUE,
  APP_MAIN_COLOR,
} from '../../constants/colors';
import {USER, BACK, TASK} from '../../constants/Images';
import {ScaledSheet, moderateScale} from 'react-native-size-matters';
import AddNewButtonGroup from '../../components/AddNewButtonGroup';
import ClickableText from '../../components/ClickableText';
import ButtonDefault from '../../components/ButtonDefault';
import CardWithIcon from '../../components/CardWithIcon';
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
import {connect} from 'react-redux';
import {addOrder} from '../../redux/reducers/orders';
import OverlaySpinner from '../../components/OverlaySpinner';
import SimpleDropdown from '../../components/SimpleDropdown';

 class UploadOrderWithFile extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      items: [1, 2, 3, 4],
      clientItems: [],
      clientIds: [],
      clientId : '',
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

  selectData = (val, type) => {
      this.setState({clientId: this.state.clientIds[val]});
      this.setState({client: this.state.clientItems[val]});
  };
  render() {
    const {items, clientItems, showLoading} = this.state;

    return (
      <SafeAreaView style={commonStyles.ketboardAvoidingContainer}>
        <Header
          navigation={this.props.navigation}
          rightImage={USER}
          title="UPLOAD ORDER"
          leftImage={BACK}
        />
        <ScrollView>
          <View
            style={{...commonStyles.content, marginBottom: moderateScale(40)}}>
            <Text style={styles.labelText}>NAME</Text>
            <InputBox
              placeHolder=""
              boxStyle={styles.inputBoxStyle}
              inputStyle={styles.input}
              onChangeText={(value) => this.setState({name: value})}
            />

            <View style={commonStyles.space}>
              <Text style={styles.labelText}>CLIENT</Text>
              {/* <InputBox
                placeHolder=""
                boxStyle={styles.inputBoxStyle}
                inputStyle={styles.input}
                onChangeText={(value) => this.setState({client: value})}
              /> */}
              <SimpleDropdown
                placeHolder="Please select client"
                style={commonStyles.dropDownStyle}
                drowdownArray={clientItems}
                dropDownWidth={'85%'}
                imageStyle={{marginTop: moderateScale(10), ...commonStyles.icon}}
                isIconVisible={true}
                onSelect={(value) => this.selectData(value, 'client')}
              />
            </View>

            <View style={commonStyles.space}>
              <Text style={{...styles.labelText, color: GRAY}}>
                File Upload
              </Text>
              <Text style={styles.uploadText}>Upload one or more files</Text>
              <ButtonDefault
                style={{
                  backgroundColor: 'white',
                  borderRadius: moderateScale(0),
                  marginTop: moderateScale(10),
                }}
                textStyle={{color: GRAY}}>
                Upload
              </ButtonDefault>
            </View>
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
  uploadText: {
    fontSize: moderateScale(9),
    marginLeft: moderateScale(20),
    marginTop: moderateScale(-10),
    color: GRAY,
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
  clients: state.clients.clientsList,
  online: state.netInfo.online,
});

const mapDispatchToProps = {
  addOrder
};

export default connect(mapStateToProps, mapDispatchToProps)(UploadOrderWithFile);

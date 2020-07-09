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

export default class AddOrderQuote extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      items: [1, 2, 3, 4],
    };
  }
  componentDidMount = () => {
    //this.props.navigation.navigate('Cart')
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

  render() {
    const {items} = this.state;

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
            <Text style={styles.labelText}>Order Id</Text>
            <InputBox
              placeHolder=""
              boxStyle={styles.inputBoxStyle}
              inputStyle={styles.input}
              onChangeText={(value) => this.setState({orderId: value})}
            />

            <View style={commonStyles.space}>
              <Text style={styles.labelText}>Order Title</Text>
              <InputBox
                placeHolder=""
                boxStyle={styles.inputBoxStyle}
                inputStyle={styles.input}
                onChangeText={(value) => this.setState({orderTitle: value})}
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
              <Text style={styles.labelText}>MPH ID</Text>
              <InputBox
                placeHolder=""
                boxStyle={styles.inputBoxStyle}
                inputStyle={styles.input}
                onChangeText={(value) => this.setState({mphId: value})}
              />
            </View>

            <View style={commonStyles.space}>
              <Text style={styles.labelText}>PO Preference</Text>
              <InputBox
                placeHolder=""
                boxStyle={styles.inputBoxStyle}
                inputStyle={styles.input}
                onChangeText={(value) => this.setState({poPreference: value})}
              />
            </View>

            <View style={commonStyles.space}>
              <Text style={styles.labelText}>Status</Text>
              <InputBox
                placeHolder=""
                boxStyle={styles.inputBoxStyle}
                inputStyle={styles.input}
                onChangeText={(value) => this.setState({status: value})}
              />
            </View>

            <ExpandCollapseLayout title="+ Payment & Shopping">
              <View style={commonStyles.space}>
                <Text style={styles.labelText}>Quote Currency</Text>
                <InputBox
                  placeHolder=""
                  boxStyle={styles.inputBoxStyle}
                  inputStyle={styles.input}
                  onChangeText={(value) =>
                    this.setState({quoteCurrency: value})
                  }
                />
              </View>
              <View style={commonStyles.space}>
                <Text style={styles.labelText}>Payment Term </Text>
                <InputBox
                  placeHolder=""
                  boxStyle={styles.inputBoxStyle}
                  inputStyle={styles.input}
                  onChangeText={(value) => this.setState({paymentTerm: value})}
                />
              </View>
              <View style={commonStyles.space}>
                <Text style={styles.labelText}>Shipping Method</Text>
                <InputBox
                  placeHolder=""
                  boxStyle={styles.inputBoxStyle}
                  inputStyle={styles.input}
                  onChangeText={(value) =>
                    this.setState({shippingMethod: value})
                  }
                />
              </View>
              <View style={commonStyles.space}>
                <Text style={styles.labelText}>Shipping Cost</Text>
                <InputBox
                  placeHolder=""
                  boxStyle={styles.inputBoxStyle}
                  inputStyle={styles.input}
                  onChangeText={(value) => this.setState({shippingCost: value})}
                />
              </View>
              <View style={commonStyles.space}>
                <Text style={styles.labelText}>VAT Percentage</Text>
                <InputBox
                  placeHolder=""
                  boxStyle={styles.inputBoxStyle}
                  inputStyle={styles.input}
                  onChangeText={(value) =>
                    this.setState({vatPercentage: value})
                  }
                />
              </View>
            </ExpandCollapseLayout>
            <ExpandCollapseLayout title="+ Addresses">
              <Text style={styles.labelText}>Company Name</Text>
              <InputBox
                placeHolder=""
                boxStyle={styles.inputBoxStyle}
                inputStyle={styles.input}
                onChangeText={(value) => this.setState({companyName: value})}
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
                <Text style={styles.labelText}>Last Name</Text>
                <InputBox
                  placeHolder=""
                  boxStyle={styles.inputBoxStyle}
                  inputStyle={styles.input}
                  onChangeText={(value) => this.setState({lastName: value})}
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
                <Text style={styles.labelText}>Address 1</Text>
                <InputBox
                  placeHolder=""
                  maxLines={5}
                  maxLength={50}
                  boxStyle={styles.inputBoxStyle}
                  inputStyle={styles.input}
                  onChangeText={(value) => this.setState({add1: value})}
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
                />
              </View>

              <View style={commonStyles.space}>
                <Text style={styles.labelText}>City</Text>
                <InputBox
                  placeHolder=""
                  boxStyle={styles.inputBoxStyle}
                  inputStyle={styles.input}
                  onChangeText={(value) => this.setState({city: value})}
                />
              </View>

              <View style={commonStyles.space}>
                <Text style={styles.labelText}>Country</Text>
                <InputBox
                  placeHolder=""
                  boxStyle={styles.inputBoxStyle}
                  inputStyle={styles.input}
                  onChangeText={(value) => this.setState({country: value})}
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
                />
              </View>

              <Text style={styles.topLabelText}>Shipping</Text>

              <Text style={styles.labelText}>Company Name</Text>
              <InputBox
                placeHolder=""
                boxStyle={styles.inputBoxStyle}
                inputStyle={styles.input}
                onChangeText={(value) => this.setState({companyName2: value})}
              />

              <View style={commonStyles.space}>
                <Text style={styles.labelText}>First Name</Text>
                <InputBox
                  placeHolder=""
                  boxStyle={styles.inputBoxStyle}
                  inputStyle={styles.input}
                  onChangeText={(value) => this.setState({firstName2: value})}
                />
              </View>

              <View style={commonStyles.space}>
                <Text style={styles.labelText}>Last Name</Text>
                <InputBox
                  placeHolder=""
                  boxStyle={styles.inputBoxStyle}
                  inputStyle={styles.input}
                  onChangeText={(value) => this.setState({lastName2: value})}
                />
              </View>

              <View style={commonStyles.space}>
                <Text style={styles.labelText}>Email</Text>
                <InputBox
                  placeHolder=""
                  boxStyle={styles.inputBoxStyle}
                  inputStyle={styles.input}
                  onChangeText={(value) => this.setState({email2: value})}
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
                  onChangeText={(value) => this.setState({add3: value})}
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
                  onChangeText={(value) => this.setState({add4: value})}
                />
              </View>

              <View style={commonStyles.space}>
                <Text style={styles.labelText}>City</Text>
                <InputBox
                  placeHolder=""
                  boxStyle={styles.inputBoxStyle}
                  inputStyle={styles.input}
                  onChangeText={(value) => this.setState({city2: value})}
                />
              </View>

              <View style={commonStyles.space}>
                <Text style={styles.labelText}>Country</Text>
                <InputBox
                  placeHolder=""
                  boxStyle={styles.inputBoxStyle}
                  inputStyle={styles.input}
                  onChangeText={(value) => this.setState({country2: value})}
                />
              </View>

              <View style={commonStyles.space}>
                <Text style={styles.labelText}>Postal Code/Zip Code</Text>
                <InputBox
                  maxLength={6}
                  placeHolder=""
                  boxStyle={styles.inputBoxStyle}
                  inputStyle={styles.input}
                  onChangeText={(value) => this.setState({postalCode2: value})}
                />
              </View>
            </ExpandCollapseLayout>

            <ExpandCollapseLayout title="+ Terms & Conditions">
              <Text style={styles.topLabelText}>Terms & Conditions</Text>
            </ExpandCollapseLayout>

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

            <View style={commonStyles.space}>
              <Text style={styles.topLabelText}>Invoices</Text>
              <TouchableOpacity style={styles.quotesRow}>
                <View style={styles.listWidth}>
                  <Text style={styles.listRowText}>NO.</Text>
                </View>
                <View style={styles.listWidth}>
                  <Text style={styles.listRowText}>TITLE</Text>
                </View>
                <View style={styles.listWidth}>
                  <Text style={styles.listRowText}>DUE DATE</Text>
                </View>
                <View style={styles.listWidth}>
                  <Text style={styles.listRowText}>STATUS</Text>
                </View>
                <View style={styles.listWidth}>
                  <Text style={styles.listRowText}>%</Text>
                </View>
                <View style={styles.listWidth}>
                  <Text style={styles.listRowText}>PAYABLE</Text>
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
  listWidth: {
    width: '16%',
  },
  listRowText: {
    fontSize: moderateScale(8),
    fontWeight: 'normal',
  },
  parentFlatList: {
    marginTop: moderateScale(10),
  },
  bottomQuotesRow: {
    flexDirection: 'row',
    marginHorizontal: moderateScale(10),
    alignItems: 'center',
    justifyContent: 'center',
  },
});

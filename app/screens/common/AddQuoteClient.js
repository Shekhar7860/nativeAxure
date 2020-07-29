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
  GRAY,
  BORDER_COLOR,
} from '../../constants/colors';
import {
  USER,
  BACK,
  TASK,
  DRAWER_MENU,
  CROSS,
  rightArrow,
  PRINTER,
  LISTINGICON,
  SEARCH,
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
import {
  updateQuote,
  addQuoteItem,
  deleteQuoteItem,
  getQuoteItem,
} from '../../redux/reducers/quotes';
import Toast from 'react-native-simple-toast';
const arrDataStatus = ['Pending', 'Accepted', 'Rejected'];
const arrDataVat = ['Exempted'];
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
  TextInput,
} from 'react-native';
const arrDataMethod = [
  'FedEx',
  'FedEx1Day@Fright',
  'FedEx2Day@',
  'FedEx2Day@ A.M',
  'FedEx2Day@ Frieght',
  'FedEx3Day@ Frieght',
  'FedEx Europe First International Priority@',
  'FedEx Express Saver@',
  'FedEx First Overnight@',
  'FedEx First@Frieght',
  'FedEx Frieght',
  'FedEx Frieght@Economy',
  'FedEx Frieght@Priority',
  'FedEx Ground@',
  'FedEx Home Delivery@',
  'FedEx International Economy@',
  'FedEx International Economy@Frieght',
  'FedEx International Priority@',
  'FedEx International Priority@Frieght',
  'FedEx International Priority@Frieght',
  'FedEx SmartPost@',
  'FedEx StandardOvernight@',
  'Flsmidth',
];

class AddQuoteClient extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      products: [],
      prices: [],
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
      shippingPostalCode: '',
      billingCompanyName: '',
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
      item: 0,
      productSum: 0,
      shipping: 0.0,
      vat: 0.0,
      quoteData: {client: {}},
      userquoteId: '',
      clientName: '',
      clientItems: [],
      clientIds: [],
      country: '',
      countries: [],
      quantity: '1',
      shippingCountry: 'Please Select Country',
      showCountrySearch: false,
      selectedCountries : [],
      showShippingCountrySearch  : false, 
      shippingCountries : []
    };
    this.arrayholder = [];
    // this.inputRef = React.createRef();
  }
  componentDidMount = () => {
    const {countries} = this.props;
    //  console.log('here are countries', countries);
    for (var i = 0; i < countries.items.length; i++) {
      this.state.countries.push(countries.items[i].name);
      this.state.shippingCountries.push(countries.items[i].name);
      this.state.selectedCountries.push(countries.items[i].name);
    }

    if (this.props.route.params) {
      // console.log('params', this.props.route.params);
      if (this.props.route.params.quoteData !== undefined) {
        this.setState({quoteData: this.props.route.params.quoteData});
        var id = this.props.route.params.quoteData.id;
        // as input value does not show integer, so connverting to string
        // console.log('id is this', id);
        if (id !== undefined) {
          this.setState({quoteId: id.toString()});
        }
        this.setState({
          userquoteId: id,
          quoteTitle: this.props.route.params.quoteData.name,
          poPreference: this.props.route.params.quoteData.po_reference,
          type: this.props.route.params.quoteData.type,
          status: this.props.route.params.quoteData.status,
          paymentCurrency: this.props.route.params.quoteData.currency,
          paymentVat: this.props.route.params.quoteData.vat_percentage,
          shippingCost: this.props.route.params.quoteData.shipping_cost,
          billingCompanyName: this.props.route.params.quoteData
            .billing_company_name,
          billingFirstName: this.props.route.params.billing_first_name,
          billingLastName: this.props.route.params.quoteData.billing_last_name,
          billingEmail: this.props.route.params.quoteData.billing_email,
          billingCountry: this.props.route.params.quoteData.billing_country,
          billingCity: this.props.route.params.billing_city,
          billingPostalCode: this.props.route.params.billing_zip_code,
          shippingCompanyName: this.props.route.params.shipping_company_name,
          shippingFirstName: this.props.route.params.quoteData
            .shipping_first_name,
          billingAdd1: this.props.route.params.quoteData.billing_add1,
          billingAdd2: this.props.route.params.quoteData.billing_add2,
          shippingAdd1: this.props.route.params.quoteData.shipping_add1,
          shippingAdd2: this.props.route.params.quoteData.shipping_add2,
          shippingLastName: this.props.route.params.quoteData
            .shipping_last_name,
          shippingEmail: this.props.route.params.quoteData.shipping_email,
          shippingCountry: this.props.route.params.quoteData.shipping_country,
          shippingCity: this.props.route.params.quoteData.shipping_city,
          shippingPostalCode: this.props.route.params.quoteData
            .shipping_zip_code,
          shippingCompanyName: this.props.route.params.quoteData
            .shipping_company_name,
        });
        // this.getQuoteItems(id)
        var text = this.props.route.params.quoteData.terms.replace(
          /<\/?[^>]+>/gi,
          ' ',
        );
        this.setState({paymentTerm: text, terms: text});
        // this.setState({quoteId : id.toString(), userquoteId : id})
        if (this.props.route.params.quoteData.client !== undefined) {
          this.setState({
            clientName: this.props.route.params.quoteData.client.name,
          });
        }
      }
    }
    // console.log('soosos', this.props.products)
    // adding products into array
    for (var i = 0; i < this.props.products.items.length; i++) {
      this.state.products.push(this.props.products.items[i].name);
      this.state.prices.push({
        price_gbp: this.props.products.items[i].price_gbp,
        sku: this.props.products.items[i].sku,
        product_id: this.props.products.items[i].id,
        qty: 1,
      });
    }
  };

  showDropDown = (value) => {
    if(value=="billing")
    {
    this.setState({showCountrySearch: true})
    }
    else {
      this.setState({showShippingCountrySearch: true}) 
    }
  };

  hideDropDown = () => {
    // this.setState({showCountrySearch: false});
  };

  getQuoteItems = (quoteId) => {
    const {online} = this.props;
    if (online) {
      this.props
        .getQuoteItem(quoteId)
        .then((response) => {
          // console.log('quoteItems response', response);
          if (response.code === 200) {
            // this.setState({showLoading: false, searchResult : true, items: response.data.items.reverse()});
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

  callFunction = (value) => {
    console.log('this is value', value);
  };

  selectData = (val) => {
    // console.log('products', this.state.quantity);
    //creating an copy and pushing array

    for (var i = 0; i < this.state.items.length; i++) {
      //  console.log('fired', this.state.items[i].name)
      if (this.state.items[i].name === this.state.products[val]) {
        this.state.items[i].qty++;
        this.setState({
          items: [...this.state.items],
        });
        this.addQuoteItem(
          this.state.prices[val].product_id,
          this.state.quantity,
          val,
          false,
        );
        return; // exit loop and function
      }
    }
    //  console.log('ajjaj', this.state.items)
    this.addQuoteItem(
      this.state.prices[val].product_id,
      this.state.quantity,
      val,
      true,
    );
  };

  addTotal = () => {
    var sum = 0;
    for (var i = 0; i < this.state.items.length; i++) {
      var num = this.multiply(
        this.state.items[i].price_gbp,
        this.state.items[i].qty,
      );
      sum += num;
    }
    // console.log('suuus', sum)
    this.setState({productSum: sum});
    return '£' + sum;
  };

  searchCountries = (text, value) => {
    // console.log('array holder', this.state.countries);
    const newData = this.state.countries.filter(function (item) {
      //applying filter for the inserted text in search bar
      const itemData = item ? item.toUpperCase() : ''.toUpperCase();
      const textData = text.toUpperCase();
      return itemData.indexOf(textData) > -1;
    });
    console.log('data', newData)
    if(text !== ""){
      if (value == "billing"){
      this.setState({countries: newData});  
    }
    else {
    this.setState({shippingCountries: newData});
    }
    }
    else {
    this.setState({countries: this.state.selectedCountries});
    }
  };


  
  addQuoteItem = (product_id, qty, val, status) => {
    this.props
      .addQuoteItem(this.state.userquoteId, product_id, qty)
      .then((response) => {
        if (response.code === 200) {
          //  console.log('responseQuoteItem', response)
          if (status) {
            var newArray = this.state.items.slice(); // Create a copy
            newArray.push({
              name: this.state.products[val],
              price_gbp: this.state.prices[val].price_gbp,
              sku: this.state.prices[val].sku,
              qty: this.state.quantity,
              product_id: this.state.prices[val].product_id,
            });
            this.setState({items: newArray});
          }
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
  };
  removeItem = (val) => {
    Alert.alert('', 'Are you sure to delete this item?', [
      {
        text: 'No',
        style: 'cancel',
      },
      {
        text: 'Yes',
        onPress: () => this.delete(val),
      },
    ]);
  };
  total = () => {
    const {productSum, shipping, vat} = this.state;
    // console.log('productSum', productSum)
    return parseInt(productSum) + parseInt(shipping) + parseInt(vat);
  };

  delete = (val) => {
    this.props
      .deleteQuoteItem(val.product_id)
      .then((response) => {
        // console.log('deleteQuoteresponse', response);
        if (response.code === 200) {
          this.setState((prevState) => {
            const items = prevState.items.filter(
              (item) => item.name !== val.name,
            );
            return {items};
          });
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
  };

  openScreen = (screen, param) => {
    this.props.navigation.navigate(screen, {clientData: param});
  };
  multiply = (price, quantity) => {
    return price * quantity;
  };

  dropDownValue = (value) => {
    console.log('selected', value);
  };
  selectItem = (val, type) => {
    if (type == 'type') {
      this.setState({type: arrDataType[val]});
    } else if (type == 'status') {
      this.setState({status: arrDataStatus[val]});
    } else if (type == 'billingCountry') {
      this.setState({billingCountry: this.state.countries[val]});
    } else if (type == 'shippingCountry') {
      this.setState({shippingCountry: this.state.countries[val]});
    } else if (type == 'vat') {
      this.setState({paymentVat: arrDataVat[val]});
    } else {
      this.setState({clientId: this.state.clientIds[val]});
      this.setState({client: this.state.clientItems[val]});
    }
  };

  listItem = (item, index) => {
    // console.log(item.name, 'skskks')
    return (
      <TouchableOpacity style={styles.rowItem}>
        {item.name ? (
          <View style={styles.quotesRow}>
            <View style={styles.listWidth}>
              <Text style={styles.listRowText}>{item.sku}</Text>
            </View>
            <View style={styles.listWidth}>
              <Text style={styles.listRowText}>{item.name}</Text>
            </View>
            <View style={styles.listWidth}>
              <Text style={styles.listRowText}>{item.price_gbp}</Text>
            </View>
            <View style={styles.listWidth}>
              <Text style={styles.listRowText}>{item.qty}</Text>
            </View>
            <View style={styles.listWidth}>
              <Text style={styles.listRowText}>
                {'£' + this.multiply(item.price_gbp, item.qty)}
              </Text>
            </View>

            <TouchableOpacity
              style={{width: '10%'}}
              onPress={() => this.removeItem(item)}>
              <Image source={CROSS} style={commonStyles.smallIcon} />
            </TouchableOpacity>
          </View>
        ) : null}
      </TouchableOpacity>
    );
  };

  updateQuote = () => {
    // alert(this.state.status)
    const {
      quoteId,
      type,
      status,
      quoteCode,
      terms,
      quoteTitle,
      poPreference,
      paymentCurrency,
      paymentVat,
      shippingCost,
      billingCompanyName,
      billingFirstName,
      billingLastName,
      billingEmail,
      billingAdd1,
      billingAdd2,
      billingCity,
      billingCountry,
      billingPostalCode,
      shippingCompanyName,
      shippingFirstName,
      shippingLastName,
      shippingEmail,
      shippingAdd1,
      shippingAdd2,
      shippingCity,
      shippingCountry,
      shippingPostalCode,
    } = this.state;
    const {online} = this.props;

    if (online) {
      this.setState({showLoading: true});
      this.props
        .updateQuote(
          quoteId,
          type,
          status,
          quoteCode,
          terms,
          quoteTitle,
          poPreference,
          paymentCurrency,
          paymentVat,
          shippingCost,
          billingCompanyName,
          billingFirstName,
          billingLastName,
          billingEmail,
          billingAdd1,
          billingAdd2,
          billingCity,
          billingCountry,
          billingPostalCode,
          shippingCompanyName,
          shippingFirstName,
          shippingLastName,
          shippingEmail,
          shippingAdd1,
          shippingAdd2,
          shippingCity,
          shippingCountry,
          shippingPostalCode,
        )
        .then((response) => {
          // console.log(response, 'update')
          this.setState({showLoading: false});
          if (response.code === 200) {
            Toast.show(response.message);
            this.props.navigation.navigate('AllQuotes');
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
            showErrorPopup('Please Add Product First');
          }
        });
    } else {
      Alert.alert('', 'No Internet Connection');
    }
  };
  checkAlert = () => {
    //alert('jiiii');
  };

  setSame = (
    billingCompanyName,
    billingFirstName,
    billingLastName,
    billingEmail,
    billingAdd1,
    billingAdd2,
    billingCity,
    billingCountry,
    billingPostalCode,
    isRememberMe,
  ) => {
    if (isRememberMe !== true) {
      this.setState({
        shippingCompanyName: billingCompanyName,
        shippingFirstName: billingFirstName,
        shippingLastName: billingLastName,
        shippingEmail: billingEmail,
        shippingAdd1: billingAdd1,
        shippingAdd2: billingAdd2,
        shippingCity: billingCity,
        shippingCountry: billingCountry,
        shippingPostalCode: billingPostalCode,
      });
    } else {
      this.setState({
        shippingCompanyName: '',
        shippingFirstName: '',
        shippingLastName: '',
        shippingEmail: '',
        shippingAdd1: '',
        shippingAdd2: '',
        shippingCity: '',
        shippingCountry: 'Please Select Country',
        shippingPostalCode: '',
      });
    }

    this.setState({isRememberMe: !isRememberMe});
  };

  calculateCost = () => {};
  render() {
    const {
      items,
      terms,
      showCountrySearch,
      quantity,
      clientName,
      paymentTerm,
      quoteTitle,
      shippingCost,
      poPreference,
      paymentCurrency,
      paymentVat,
      billingCompanyName,
      billingFirstName,
      billingLastName,
      billingCountry,
      billingCity,
      billingPostalCode,
      billingAdd1,
      billingAdd2,
      shippingCity,
      shippingCountry,
      shippingAdd2,
      shippingAdd1,
      shippingLastName,
      shippingFirstName,
      type,
      status,
      isRememberMe,
      quoteDetail,
      quoteId,
      showLoading,
      products,
      shipping,
      vat,
      quoteData,
      shippingCompanyName,
      shippingPostalCode,
      countries,
      billingEmail,
      shippingEmail,
      shippingCountries,
      showShippingCountrySearch
    } = this.state;

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
              image={LISTINGICON}
              onPress={() => this.openScreen('AllQuotes')}
              imageStyle={{
                ...commonStyles.icon,
                marginLeft: moderateScale(-18),
                marginTop: moderateScale(2),
              }}
            />
            <TouchableImage
              image={PRINTER}
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
              disabled
              boxStyle={styles.inputBoxStyle}
              inputStyle={styles.input}
              onChangeText={(value) => this.setState({quoteId: value})}
              value={quoteId}
            />

            <View style={commonStyles.space}>
              <Text style={styles.labelText}>Quote Title</Text>
              <InputBox
                disabled
                placeHolder=""
                boxStyle={styles.inputBoxStyle}
                inputStyle={styles.input}
                onChangeText={(value) => this.setState({quoteTitle: value})}
                value={quoteTitle}
              />
            </View>

            <View style={commonStyles.space}>
              <Text style={styles.labelText}>Quote Number/Code</Text>
              <InputBox
                disabled
                placeHolder=""
                boxStyle={styles.inputBoxStyle}
                inputStyle={styles.input}
                onChangeText={(value) => this.setState({quoteCode: value})}
                value={quoteData.code}
              />
            </View>

            <View style={commonStyles.space}>
              <Text style={styles.labelText}>MPH ID</Text>
              <InputBox
                placeHolder=""
                disabled
                boxStyle={styles.inputBoxStyle}
                inputStyle={styles.input}
                onChangeText={(value) => this.setState({mphId: value})}
                value={quoteData.mph_id}
              />
            </View>

            <View style={commonStyles.space}>
              <Text style={styles.labelText}>PO Reference</Text>
              <InputBox
                placeHolder=""
                boxStyle={styles.inputBoxStyle}
                inputStyle={styles.input}
                onChangeText={(value) => this.setState({poPreference: value})}
                value={poPreference}
              />
            </View>

            <View style={commonStyles.space}>
              <Text style={styles.labelText}>Type</Text>
              <InputBox
                disabled
                placeHolder=""
                boxStyle={styles.inputBoxStyle}
                inputStyle={styles.input}
                onChangeText={(value) => this.setState({type: value})}
                value={type}
              />
            </View>

            <View style={commonStyles.space}>
              <TouchableOpacity style={{flexDirection: 'row'}}>
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
              </TouchableOpacity>
              <InputBox
                disabled
                placeHolder=""
                boxStyle={styles.inputBoxStyle}
                inputStyle={styles.input}
                onChangeText={(value) => this.setState({clientName: value})}
                value={clientName}
              />
            </View>

            <View style={commonStyles.space}>
              <Text style={styles.labelText}>Status</Text>
              <SimpleDropdown
                placeHolder="Please select status"
                style={commonStyles.dropDownStyle}
                drowdownArray={arrDataStatus}
                dropDownWidth={'85%'}
                imageStyle={{
                  marginTop: moderateScale(10),
                  ...commonStyles.icon,
                }}
                isIconVisible={true}
                onSelect={(value) => this.selectItem(value, 'status')}
                showDropDownMenu={(value) => this.showDropdownMenu(value)}
              />
            </View>

            <View style={commonStyles.space}>
              <ExpandCollapseLayout title="+ Billing & Shipping Address">
                <Text style={styles.topLabelText}>Billing</Text>

                <Text style={styles.labelText}>Company Name</Text>
                <InputBox
                  placeHolder=""
                  boxStyle={styles.inputBoxStyle}
                  inputStyle={styles.input}
                  onChangeText={(value) =>
                    this.setState({billingCompanyName: value})
                  }
                  value={billingCompanyName}
                />

                <View style={commonStyles.space}>
                  <Text style={styles.labelText}>First Name</Text>
                  <InputBox
                    placeHolder=""
                    boxStyle={styles.inputBoxStyle}
                    inputStyle={styles.input}
                    onChangeText={(value) =>
                      this.setState({billingFirstName: value})
                    }
                    value={billingFirstName}
                  />
                </View>

                <View style={commonStyles.space}>
                  <Text style={styles.labelText}>Last Name</Text>
                  <InputBox
                    placeHolder=""
                    boxStyle={styles.inputBoxStyle}
                    inputStyle={styles.input}
                    onChangeText={(value) =>
                      this.setState({billingLastName: value})
                    }
                    value={billingLastName}
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
                    value={billingEmail}
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
                    value={billingAdd1}
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
                    value={billingAdd2}
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
                    value={billingCity}
                  />
                </View>

                <TouchableOpacity
                  style={commonStyles.space}
                  onPress={() => this.checkAlert()}>
                  <Text style={styles.labelText}>Country</Text>
                  {showCountrySearch ? (
                    <View style={commonStyles.commonRow}>
                      <TextInput
                        style={{
                          width: '88%',
                          marginTop: moderateScale(0),
                          borderBottomWidth: 1,
                        }}
                        onChangeText={(text) => this.searchCountries(text, 'billing')}
                      />
                      <TouchableImage
                        image={SEARCH}
                        imageStyle={{
                          ...commonStyles.icon,
                          marginTop: moderateScale(10),
                        }}
                      />
                    </View>
                  ) : null}
                  <View style={commonStyles.space}>
                    <SimpleDropdown
                      placeHolder="Please select Country"
                      style={commonStyles.dropDownStyle}
                      // ref={this.inputRef}

                      drowdownArray={countries}
                      dropDownWidth={'85%'}
                      imageStyle={{
                        marginTop: moderateScale(10),
                        ...commonStyles.icon,
                      }}
                      showDropDown={() => this.showDropDown('billing')}
                      hideDropDown={() => this.hideDropDown('billing')}
                      isIconVisible={true}
                      onSelect={(value) =>
                        this.selectItem(value, 'billingCountry')
                      }
                    />
                  </View>
                </TouchableOpacity>

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
                    value={billingPostalCode}
                  />
                </View>

                <View style={commonStyles.space}>
                  <CheckBox
                    title="Same As Billing"
                    checked={isRememberMe}
                    onPress={() =>
                      this.setSame(
                        billingCompanyName,
                        billingFirstName,
                        billingLastName,
                        billingEmail,
                        billingAdd1,
                        billingAdd2,
                        billingCity,
                        billingCountry,
                        billingPostalCode,
                        isRememberMe,
                      )
                    }
                    checkedColor={BLACK}
                    containerStyle={commonStyles.checkBoxContainer}
                    uncheckedIcon="square"
                    size={15}
                    textStyle={commonStyles.checkBoxText}
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
                  value={shippingCompanyName}
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
                    value={shippingFirstName}
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
                    value={shippingLastName}
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
                    value={shippingEmail}
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
                    value={shippingAdd1}
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
                    value={shippingAdd2}
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
                    value={shippingCity}
                  />
                </View>

                <View style={commonStyles.space}>
                  <Text style={styles.labelText}>Country</Text>
                  {showShippingCountrySearch ? (
                    <View style={commonStyles.commonRow}>
                      <TextInput
                       style={styles.commonTextBorder}
                        onChangeText={(text) => this.searchCountries(text, 'shipping')}
                      />
                      <TouchableImage
                        image={SEARCH}
                        imageStyle={{
                          ...commonStyles.icon,
                          marginTop: moderateScale(10),
                        }}
                      />
                    </View>
                  ) : null}
                  <SimpleDropdown
                    placeHolder={shippingCountry}
                    style={commonStyles.dropDownStyle}
                    drowdownArray={shippingCountries}
                    showDropDown={() => this.showDropDown('shipping')}
                    hideDropDown={() => this.hideDropDown('shipping')}
                    dropDownWidth={'85%'}
                    imageStyle={{
                      marginTop: moderateScale(10),
                      ...commonStyles.icon,
                    }}
                    isIconVisible={true}
                    onSelect={(value) =>
                      this.selectItem(value, 'shippingCountry')
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
                    value={shippingPostalCode}
                  />
                </View>
              </ExpandCollapseLayout>
            </View>
            <View style={commonStyles.space}>
              <ExpandCollapseLayout title="+ Payment & Shipping">
                <Text style={styles.labelText}>Currency</Text>
                <InputBox
                  disabled
                  placeHolder=""
                  boxStyle={styles.inputBoxStyle}
                  inputStyle={styles.input}
                  onChangeText={(value) =>
                    this.setState({paymentCurrency: value})
                  }
                  value={paymentCurrency}
                />
                <View style={commonStyles.space}>
                  <Text style={styles.labelText}>Payment Term</Text>
                  <InputBox
                    disabled
                    placeHolder=""
                    boxStyle={styles.inputBoxStyle}
                    inputStyle={styles.input}
                    onChangeText={(value) =>
                      this.setState({paymentTerm: value})
                    }
                    value={paymentTerm}
                  />
                </View>
                <View style={commonStyles.space}>
                  <Text style={styles.labelText}>VAT Percentage</Text>
                  <SimpleDropdown
                    placeHolder="Please select VAT percentage"
                    style={commonStyles.dropDownStyle}
                    drowdownArray={arrDataVat}
                    dropDownWidth={'85%'}
                    imageStyle={{
                      marginTop: moderateScale(10),
                      ...commonStyles.icon,
                    }}
                    isIconVisible={true}
                    onSelect={(value) => this.selectItem(value, 'vat')}
                  />
                </View>
                <View style={commonStyles.space}>
                  <Text style={styles.labelText}>Shipping Service</Text>
                  <SimpleDropdown
                    placeHolder="Please select Shipping Service"
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
                    disabled
                    placeHolder=""
                    boxStyle={styles.inputBoxStyleBackground}
                    inputStyle={styles.input}
                    onChangeText={(value) =>
                      this.setState({shippingCost: value})
                    }
                    value={shippingCost}
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
                    Get Rates
                  </ButtonWithImage>
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
                  value={terms}
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
                  <Text style={styles.listRowText}>BUY PRICE</Text>
                </View>
                <View style={styles.listWidth}>
                  <Text style={styles.listRowText}>QTY</Text>
                </View>
                <View style={styles.listWidth}>
                  <Text style={styles.listRowText}>TOTAL</Text>
                </View>
                <View style={{width: '10%'}} />
              </TouchableOpacity>
            </View>
            <FlatList
              style={styles.parentFlatList}
              data={items}
              extraData={this.state}
              keyExtractor={(item, index) => '' + index}
              renderItem={({item, index}) => this.listItem(item, index)}
            />
            {items.length !== 0 ? (
              <View>
                <View style={commonStyles.space}>
                  <TouchableOpacity style={styles.quotesRow}>
                    <View style={styles.listWidthFull}></View>
                    <View style={styles.listWidth}>
                      <Text style={styles.listRowText}>SubTotal</Text>
                    </View>
                    <View style={styles.listWidth}>
                      <Text style={styles.listRowText}>{this.addTotal()}</Text>
                    </View>
                    <View style={{width: '10%'}} />
                  </TouchableOpacity>
                </View>
                <View style={commonStyles.space}>
                  <TouchableOpacity style={styles.quotesRow}>
                    <View style={styles.listWidthFull}></View>
                    <View style={styles.listWidth}>
                      <Text style={styles.listRowText}>Shipping</Text>
                    </View>
                    <View style={styles.listWidth}>
                      <Text style={styles.listRowText}>£{shipping}</Text>
                    </View>
                    <View style={{width: '10%'}} />
                  </TouchableOpacity>
                </View>
                <View style={commonStyles.space}>
                  <TouchableOpacity style={styles.quotesRow}>
                    <View style={styles.listWidthFull}></View>
                    <View style={styles.listWidth}>
                      <Text style={styles.listRowText}>VAT(0%)</Text>
                    </View>
                    <View style={styles.listWidth}>
                      <Text style={styles.listRowText}>£{vat}</Text>
                    </View>
                    <View style={{width: '10%'}} />
                  </TouchableOpacity>
                </View>
                <View style={commonStyles.space}>
                  <TouchableOpacity style={styles.quotesRow}>
                    <View style={styles.listWidthFull}></View>
                    <View style={styles.listWidth}>
                      <Text style={styles.listRowText}>Total</Text>
                    </View>
                    <View style={styles.listWidth}>
                      <Text style={styles.listRowText}>£{this.total()}</Text>
                    </View>
                    <View style={{width: '10%'}} />
                  </TouchableOpacity>
                </View>
              </View>
            ) : null}
            <View style={commonStyles.space}>
              <Text style={styles.topLabelText}>Add a product</Text>
            </View>
            <View style={commonStyles.space}>
              <SimpleDropdown
                placeHolder="Add Product"
                style={commonStyles.dropDownStyle}
                drowdownArray={products}
                onSelect={(value) => this.selectData(value)}
                dropDownWidth={'85%'}
                imageStyle={{
                  marginTop: moderateScale(10),
                  ...commonStyles.icon,
                }}
                isIconVisible={true}
              />
            </View>
            <Text style={styles.labelText}>Quantity</Text>
            <InputBox
              placeHolder=""
              maxLines={5}
              maxLength={50}
              boxStyle={{
                ...styles.inputBoxStyle3,
              }}
              inputStyle={styles.input2}
              onChangeText={(value) => this.setState({quantity: value})}
              value={quantity}
              keyboardType={'numeric'}
              maxLength={1}
            />

            <ButtonDefault onPress={() => this.updateQuote('EditQuote')}>
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
  quotesRow2: {
    flexDirection: 'row',
    width: '100%',
    marginHorizontal: moderateScale(10),
    marginTop: moderateScale(10),
    justifyContent: 'space-around',
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
  inputBoxStyleBackground: {
    marginTop: moderateScale(-10),
    height: moderateScale(45),
    backgroundColor: GRAY,
    borderBottomWidth: 0,
    borderWidth: 0,
    borderRadius: 0,
    width: '90%',
    alignSelf: 'center',
    borderBottomColor: WHITE,
  },
  inputBoxStyle3: {
    height: moderateScale(40),
    borderRadius: 0,
    borderWidth: 1,
    borderBottomWidth: 1,
    borderColor: DARK_BLUE,
    width: '15%',
    marginHorizontal: moderateScale(20),
  },
  input: {
    fontWeight: 'normal',

    fontSize: moderateScale(10),
  },
  inputBoxStyle2: {
    fontWeight: 'normal',
    color: 'black',
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
  listWidthFull: {
    width: '48%',
  },
});

const mapStateToProps = (state) => ({
  online: state.netInfo.online,
  products: state.products.productsList,
  countries: state.countries.countriesList,
});

const mapDispatchToProps = {
  updateQuote,
  addQuoteItem,
  deleteQuoteItem,
  getQuoteItem,
};

export default connect(mapStateToProps, mapDispatchToProps)(AddQuoteClient);

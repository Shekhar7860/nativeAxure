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
import {USER, BACK, TASK, DRAWER_MENU, CROSS} from '../../constants/Images';
import {ScaledSheet, moderateScale} from 'react-native-size-matters';
import AddNewButtonGroup from '../../components/AddNewButtonGroup';
import ClickableText from '../../components/ClickableText';
import TouchableImage from '../../components/TouchableImage';
import ExpandCollapseLayout from '../../components/ExpandCollapseLayout';
import ContainerSearch from '../../components/ContainerSearch';
import CardWithIcon from '../../components/CardWithIcon';
import InputBox from '../../components/InputBox';
import HR from '../../components/HR';
import ButtonDefault from '../../components/ButtonDefault';
import OverlaySpinner from '../../components/OverlaySpinner';
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
import {connect} from 'react-redux';
import {isEmailValid, showErrorPopup} from '../../util/utils';
import {updateOrder} from '../../redux/reducers/orders';
import Toast from 'react-native-simple-toast';
import SimpleDropdown from '../../components/SimpleDropdown';

class AddOrderQuote extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      invoiceItems: [],
      userOrderId : "",
      orderId : "",
      orderTitle : '',
      client : "",
      mphId : "",
      poPreference : "",
      status : "",
      quoteCurrency : '',
      paymentTerm : "",
      shippingMethod : '',
      shippingCost : '',
      vatPercentage : 0,
      billingcompanyName : "",
      billingfirstName : "",
      billingLastName : "",
      billingEmail: "",
      billingAdd1: "",
      billingAdd2: "",
      billingCity: "",
      billingCountry: "",
      billingPostalCode: "",
      shippingFirstName: "",
      shippingLastName: "",
      shippingEmail: "",
      shippingAdd1: "",
      shippingAdd2: "",
      shippingCity: "",
      shippingCountry: "",
      shippingPostalCode: "",
      terms: "",
      showLoading : false,
      products : [],
      prices : [],
      item : 0,
      productSum : 0,
      total : 0,
      shipping : 0.00,
      vat : 0.00,
    };
  }
  componentDidMount = () => {
      if (this.props.route.params) {
        console.log('sdddsd', this.props.route.params)
        if (this.props.route.params.orderData !== undefined) {
          var id = this.props.route.params.orderData.id;
          // as input value does not show integer, so connverting to string
          this.setState({orderId : id.toString(), userOrderId : id, orderTitle : this.props.route.params.orderData.name, poPreference : this.props.route.params.orderData.po_reference, type : this.props.route.params.orderData.type, status : this.props.route.params.orderData.status,
           mphId : this.props.route.params.orderData.mph_id, vatPercentage: this.props.route.params.orderData.vat_percentage,
          quoteCurrency : this.props.route.params.orderData.currency, paymentVat : this.props.route.params.orderData.vat_percentage, shippingCost : this.props.route.params.orderData.shipping_cost, billingCompanyName :  this.props.route.params.orderData.billing_company_name, billingFirstName : this.props.route.params.orderData.billing_first_name,
          billingLastName : this.props.route.params.orderData.billing_last_name,   billingEmail : this.props.route.params.orderData.billing_email,   billingCountry : this.props.route.params.orderData.billing_country_name, billingCity : this.props.route.params.orderData.billing_city,   billingPostalCode : this.props.route.params.orderData.billing_zip_code, shippingCompanyName : this.props.route.params.orderData.shipping_company_name,
          shippingFirstName : this.props.route.params.orderData.shipping_first_name, billingAdd1 : this.props.route.params.orderData.billing_address1, billingAdd2 : this.props.route.params.orderData.billing_address2, shippingAdd1 : this.props.route.params.orderData.shipping_address1, shippingAdd2 : this.props.route.params.orderData.shipping_address2, terms : this.props.route.params.orderData.terms,
          shippingLastName : this.props.route.params.orderData.shipping_last_name,   shippingEmail : this.props.route.params.orderData.shipping_email,   shippingCountry : this.props.route.params.orderData.shipping_country_name, shippingCity : this.props.route.params.orderData.shipping_city,   shippingPostalCode : this.props.route.params.orderData.shipping_zip_code, shippingCompanyName : this.props.route.params.orderData.shipping_company_name
        })
        if(this.props.route.params.orderData.client !== undefined){
          this.setState({client : this.props.route.params.orderData.client.name})
        }
        if(this.props.route.params.orderData.payment_scheme !== undefined){
          this.setState({paymentTerm : this.props.route.params.orderData.payment_scheme.terms})
        }
        }
      }
      console.log('products', this.props.products)
      //adding products into array
      for (var i = 0; i < this.props.products.items.length; i++) {
        this.state.products.push(this.props.products.items[i].name);
        this.state.prices.push({'price_gbp' : this.props.products.items[i].price_gbp, 'sku' : this.props.products.items[i].sku, product_id :this.props.products.items[i].id,  qty : 1})
      }
    //this.props.navigation.navigate('Cart')
  };

  selectData = (val) => {
  //   console.log('products', this.state.products[val], 'prices', this.state.prices[val]);
      //creating an copy and pushing array

    for (var i = 0; i < this.state.items.length; i++) {
      console.log('fired', this.state.items[i].name)
        if (this.state.items[i].name === this.state.products[val]) {
            this.state.items[i].qty++;
            this.setState({
           items: [...this.state.items]
           })
           this.addOrderItem(this.state.prices[val].product_id, 1, val, false)
           return;                       // exit loop and function
        }
      }
    //  console.log('ajjaj', this.state.items)
      this.addOrderItem(this.state.prices[val].product_id, 1, val, true)


  };

  addTotal = () => {
    var sum=0;
    for (var i =0; i < this.state.items.length; i++) {
    var num =  this.multiply(this.state.items[i].price_gbp, this.state.items[i].qty)
    sum += num;
      }
      console.log('suuus', sum)
      this.setState({productSum : sum})
    return '£' + sum;

  }

  addOrderItem = (product_id, qty, val, status) => {
    if(status){
    var newArray = this.state.items.slice(); // Create a copy
    newArray.push({name:this.state.products[val], price_gbp : this.state.prices[val].price_gbp, sku :  this.state.prices[val].sku, qty : this.state.prices[val].qty, product_id :  this.state.prices[val].product_id})
    this.setState({ items: newArray })}


  }
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

    }
    total = () => {
      const {productSum, shipping, vat} = this.state;
      console.log('productSum', productSum)
      var total =  parseInt(productSum) + parseInt(shipping) + parseInt(vat);
      return total;

    }

    delete = (val) => {
      this.setState(prevState => {
      const items = prevState.items.filter(item => item.name !== val.name);
      return { items };
  });



    }


    openScreen = (screen, param) => {
      this.props.navigation.navigate(screen, {clientData: param});
    };
    multiply = (price, quantity) => {

      return price*quantity

    }

    listItem = (item, index) => {
      // console.log(item.name, 'skskks')
      return (
        <TouchableOpacity style={styles.rowItem}>
          {item.name ?
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
              <Text style={styles.listRowText}>{'£' + this.multiply(item.price_gbp, item.qty)}</Text>
            </View>

            <TouchableOpacity style={{width: '10%'}} onPress={()=> this.removeItem(item)}>
              <Image source={CROSS} style={commonStyles.smallIcon}/>
            </TouchableOpacity>
          </View>
        : null}
        </TouchableOpacity>
      );
    };


  updateOrder = () => {
    console.log('city. ', this.state.billingCity)
    const {
      userOrderId,
      mphId,
      poReference,
      status,
      orderTitle,
      quoteCurrency,
      shippingMethod,
      vatPercentage,
      paymentTerm,
      billingCompanyName,
      billingFirstName,
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
        .updateOrder(
          userOrderId,
          mphId,
          poReference,
          status,
          orderTitle,
          quoteCurrency,
          paymentTerm,
          shippingMethod,
          shippingCost,
          vatPercentage,
          billingCompanyName,
          billingFirstName,
          billingLastName,
          billingEmail,
          billingAdd1,
          billingAdd2,
          billingCity,
          billingCountry,
          billingPostalCode,
          shippingFirstName,
          shippingLastName,
          shippingEmail,
          shippingAdd1,
          shippingAdd2,
          shippingCity,
          shippingCountry,
          shippingPostalCode,
          terms
        )
        .then((response) => {
          this.setState({showLoading: false});
          if (response.code === 200) {
            Toast.show(response.message)
            this.props.navigation.navigate('OrdersStack')
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

  render() {
    const {total, subTotal, shipping, vat, invoiceItems,products,items, showLoading, orderId, orderTitle, client, mphId, poPreference, status, quoteCurrency, paymentTerm, shippingCost, vatPercentage,
    billingAdd1, billingCity, billingAdd2, billingEmail, billingCountry, billingFirstName, billingLastName, billingPostalCode, shippingAdd2, shippingAdd1, shippingFirstName, shippingLastName, shippingCity, shippingCountry,
  shippingEmail, shippingPostalCode, billingCompanyName, shippingCompanyName, terms} = this.state;

    return (
      <SafeAreaView style={commonStyles.ketboardAvoidingContainer}>
        <Header
          navigation={this.props.navigation}
          rightImage={USER}
          title="ORDER"
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
              disabled
              boxStyle={styles.inputBoxStyle}
              inputStyle={styles.input}
              onChangeText={(value) => this.setState({orderId: value})}
              value={orderId}
            />

            <View style={commonStyles.space}>
              <Text style={styles.labelText}>Order Title</Text>
              <InputBox
                placeHolder=""
                disabled
                boxStyle={styles.inputBoxStyle}
                inputStyle={styles.input}
                onChangeText={(value) => this.setState({orderTitle: value})}
                value={orderTitle}
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
                value={client}
              />
            </View>

            <View style={commonStyles.space}>
              <Text style={styles.labelText}>MPH ID</Text>
              <InputBox
                placeHolder=""
                boxStyle={styles.inputBoxStyle}
                inputStyle={styles.input}
                onChangeText={(value) => this.setState({mphId: value})}
                value={mphId}
              />
            </View>

            <View style={commonStyles.space}>
              <Text style={styles.labelText}>PO Preference</Text>
              <InputBox
                placeHolder=""
                boxStyle={styles.inputBoxStyle}
                inputStyle={styles.input}
                onChangeText={(value) => this.setState({poPreference: value})}
                value={poPreference}
              />
            </View>

            <View style={commonStyles.space}>
              <Text style={styles.labelText}>Status</Text>
              <InputBox
                placeHolder=""
                boxStyle={styles.inputBoxStyle}
                inputStyle={styles.input}
                onChangeText={(value) => this.setState({status: value})}
                value={status}
              />
            </View>

            <View style={commonStyles.space}>
             <ExpandCollapseLayout title="+ Payment & Shopping">
              <View style={commonStyles.space}>
                <Text style={styles.labelText}>Quote Currency</Text>
                <InputBox
                  disabled
                  placeHolder=""
                  boxStyle={styles.inputBoxStyle}
                  inputStyle={styles.input}
                  onChangeText={(value) =>
                    this.setState({quoteCurrency: value})
                  }
                  value={quoteCurrency}
                />
              </View>
              <View style={commonStyles.space}>
                <Text style={styles.labelText}>Payment Term </Text>
                <InputBox
                 disabled
                  placeHolder=""
                  boxStyle={styles.inputBoxStyle}
                  inputStyle={styles.input}
                  onChangeText={(value) => this.setState({paymentTerm: value})}
                  value={paymentTerm}
                />
              </View>
              <View style={commonStyles.space}>
                <Text style={styles.labelText}>Shipping Service</Text>
                <InputBox
                disabled
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
                  disabled
                  placeHolder=""
                  boxStyle={styles.inputBoxStyle}
                  inputStyle={styles.input}
                  onChangeText={(value) => this.setState({shippingCost: value})}
                  value={shippingCost}
                />
              </View>
              <View style={commonStyles.space}>
                <Text style={styles.labelText}>VAT Percentage</Text>
                <InputBox
                disabled
                  placeHolder=""
                  boxStyle={styles.inputBoxStyle}
                  inputStyle={styles.input}
                  onChangeText={(value) =>
                    this.setState({vatPercentage: value})
                  }
                  value={vatPercentage}
                />
              </View>
            </ExpandCollapseLayout>
            </View>
            <View style={commonStyles.space}>
            <ExpandCollapseLayout title="+ Addresses">
              <Text style={styles.labelText}>Company Name</Text>
              <InputBox
                placeHolder=""
                boxStyle={styles.inputBoxStyle}
                inputStyle={styles.input}
                onChangeText={(value) => this.setState({billingCompanyName: value})}
                value={billingCompanyName}
              />

              <View style={commonStyles.space}>
                <Text style={styles.labelText}>First Name</Text>
                <InputBox
                  placeHolder=""
                  boxStyle={styles.inputBoxStyle}
                  inputStyle={styles.input}
                  onChangeText={(value) => this.setState({billingFirstName: value})}
                  value={billingFirstName}
                />
              </View>

              <View style={commonStyles.space}>
                <Text style={styles.labelText}>Last Name</Text>
                <InputBox
                  placeHolder=""
                  boxStyle={styles.inputBoxStyle}
                  inputStyle={styles.input}
                  onChangeText={(value) => this.setState({billingLastName: value})}
                  value={billingLastName}
                />
              </View>

              <View style={commonStyles.space}>
                <Text style={styles.labelText}>Email</Text>
                <InputBox
                  placeHolder=""
                  boxStyle={styles.inputBoxStyle}
                  inputStyle={styles.input}
                  onChangeText={(value) => this.setState({billingEmail: value})}
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
                  onChangeText={(value) => this.setState({billingAdd1: value})}
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
                  onChangeText={(value) => this.setState({billingAdd2: value})}
                  value={billingAdd2}
                />
              </View>

              <View style={commonStyles.space}>
                <Text style={styles.labelText}>City</Text>
                <InputBox
                  placeHolder=""
                  boxStyle={styles.inputBoxStyle}
                  inputStyle={styles.input}
                  onChangeText={(value) => this.setState({billingCity: value})}
                  value={billingCity}
                />
              </View>

              <View style={commonStyles.space}>
                <Text style={styles.labelText}>Country</Text>
                <InputBox
                  placeHolder=""
                  boxStyle={styles.inputBoxStyle}
                  inputStyle={styles.input}
                  onChangeText={(value) => this.setState({billingCountry: value})}
                  value={billingCountry}
                />
              </View>

              <View style={commonStyles.space}>
                <Text style={styles.labelText}>Postal Code/Zip Code</Text>
                <InputBox
                  maxLength={6}
                  placeHolder=""
                  boxStyle={styles.inputBoxStyle}
                  inputStyle={styles.input}
                  onChangeText={(value) => this.setState({billingPostalCode: value})}
                  value={billingPostalCode}
                />
              </View>
              <View style={commonStyles.space}>
              <Text style={{...styles.topLabelText, marginTop: moderateScale(10)}}>Shipping</Text>
              </View>

              <Text style={styles.labelText}>Company Name</Text>
              <InputBox
                placeHolder=""
                boxStyle={styles.inputBoxStyle}
                inputStyle={styles.input}
                onChangeText={(value) => this.setState({shippingCompanyName: value})}
                value={shippingCompanyName}
              />

              <View style={commonStyles.space}>
                <Text style={styles.labelText}>First Name</Text>
                <InputBox
                  placeHolder=""
                  boxStyle={styles.inputBoxStyle}
                  inputStyle={styles.input}
                  onChangeText={(value) => this.setState({shippingFirstName: value})}
                  value={shippingFirstName}
                />
              </View>

              <View style={commonStyles.space}>
                <Text style={styles.labelText}>Last Name</Text>
                <InputBox
                  placeHolder=""
                  boxStyle={styles.inputBoxStyle}
                  inputStyle={styles.input}
                  onChangeText={(value) => this.setState({shippingLastName: value})}
                  value={shippingLastName}
                />
              </View>

              <View style={commonStyles.space}>
                <Text style={styles.labelText}>Email</Text>
                <InputBox
                  placeHolder=""
                  boxStyle={styles.inputBoxStyle}
                  inputStyle={styles.input}
                  onChangeText={(value) => this.setState({shippingEmail: value})}
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
                  onChangeText={(value) => this.setState({shippingAdd1: value})}
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
                  onChangeText={(value) => this.setState({shippingAdd2: value})}
                  value={shippingAdd2}
                />
              </View>

              <View style={commonStyles.space}>
                <Text style={styles.labelText}>City</Text>
                <InputBox
                  placeHolder=""
                  boxStyle={styles.inputBoxStyle}
                  inputStyle={styles.input}
                  onChangeText={(value) => this.setState({shippingCity: value})}
                  value={shippingCity}
                />
              </View>

              <View style={commonStyles.space}>
                <Text style={styles.labelText}>Country</Text>
                <InputBox
                  placeHolder=""
                  boxStyle={styles.inputBoxStyle}
                  inputStyle={styles.input}
                  onChangeText={(value) => this.setState({shippingCountry: value})}
                  value={shippingCountry}
                />
              </View>

              <View style={commonStyles.space}>
                <Text style={styles.labelText}>Postal Code/Zip Code</Text>
                <InputBox
                  maxLength={6}
                  placeHolder=""
                  boxStyle={styles.inputBoxStyle}
                  inputStyle={styles.input}
                  onChangeText={(value) => this.setState({shippingPostalCode: value})}
                  value={shippingPostalCode}
                />
              </View>
            </ExpandCollapseLayout>
          </View>
            <View style={commonStyles.space}>
            <ExpandCollapseLayout title="+ Terms & Conditions">
              <Text style={{...styles.topLabelText, marginTop: moderateScale(10)}}>Terms & Conditions</Text>
              <Text
                style={{...styles.labelText, marginTop: moderateScale(5)}}>
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
            {items.length !== 0 ?
            <View>
            <View style={commonStyles.space}>
              <TouchableOpacity style={styles.quotesRow}>
                <View style={styles.listWidthFull}>
                </View>
                <View style={styles.listWidth}>
                  <Text style={styles.listRowText}>SubTotal</Text>
                </View>
                <View style={styles.listWidth}>
                  <Text style={styles.listRowText}>{this.addTotal()}</Text>
                </View>
                <View style={{width:'10%'}}/>
              </TouchableOpacity>
            </View>
            <View style={commonStyles.space}>
              <TouchableOpacity style={styles.quotesRow}>
                <View style={styles.listWidthFull}>
                </View>
                <View style={styles.listWidth}>
                  <Text style={styles.listRowText}>Shipping</Text>
                </View>
                <View style={styles.listWidth}>
                  <Text style={styles.listRowText}>£{shipping}</Text>
                </View>
                <View style={{width:'10%'}}/>
              </TouchableOpacity>
            </View>
            <View style={commonStyles.space}>
              <TouchableOpacity style={styles.quotesRow}>
                <View style={styles.listWidthFull}>
                </View>
                <View style={styles.listWidth}>
                  <Text style={styles.listRowText}>VAT(0%)</Text>
                </View>
                <View style={styles.listWidth}>
                  <Text style={styles.listRowText}>£{vat}</Text>
                </View>
                <View style={{width:'10%'}}/>
              </TouchableOpacity>
            </View>
            <View style={commonStyles.space}>
              <TouchableOpacity style={styles.quotesRow}>
                <View style={styles.listWidthFull}>
                </View>
                <View style={styles.listWidth}>
                  <Text style={styles.listRowText}>Total</Text>
                </View>
                <View style={styles.listWidth}>
                  <Text style={styles.listRowText}>£{this.total()}</Text>
                </View>
                <View style={{width:'10%'}}/>
              </TouchableOpacity>
            </View>

          </View>
        : null}
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
              data={invoiceItems}
              extraData={this.state}
              keyExtractor={(item, index) => '' + index}
              renderItem={({item, index}) => this.listItem(item, index)}
            />

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

            <ButtonDefault onPress={() => this.updateOrder()}>
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
  listWidth: {
    width: '16%',
  },
  listRowText: {
    fontSize: moderateScale(8),
    fontWeight: 'normal',
  },
  listWidthFull : {
    width : '48%'
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

const mapStateToProps = (state) => ({
  online: state.netInfo.online,
  products : state.products.productsList
});

const mapDispatchToProps = {
  updateOrder,
};

export default connect(mapStateToProps, mapDispatchToProps)(AddOrderQuote);

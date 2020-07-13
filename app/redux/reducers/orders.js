import API from '../../services/api';

const SET_ORDERS_LIST = 'ORDERS_LIST';
const ADD_ORDER_SUCCESS = 'ADD_ORDER_SUCCESS';
const UPDATE_ORDER_SUCCESS = 'UPDATE_ORDER_SUCCESS';


const addOrderSuccess = (value) => ({type: ADD_ORDER_SUCCESS, value});
const updateOrderSuccess = (value) => ({type: UPDATE_ORDER_SUCCESS, value});
const setOrdersList = (value) => ({type: SET_ORDERS_LIST, value});

export const getOrdersList = () => {
  return (dispatch) => {
    return API.getOrdersList().then((response) => {
       console.log('response', response);
      if (response.code === 200) {
        if (response.data) {
          dispatch(setOrdersList(response.data));
        }
      }
      return response;
    });
  };
};

export const addOrder = (
  client_id,
  reseller_id,
  status,
) => {
  return (dispatch) => {
    return API.addOrder({
      client_id,
      reseller_id,
      status
    }).then((response) => {
      if (response.code === 200) {
        if (response.data) {
          dispatch(addOrderSuccess(response.data));
        }
      }
      return response;
    });
  };
};

export const updateOrder = (
  orderId,
  mph_id,
  po_reference,
  status,
  name,
  currency,
  last_status,
  shipping_method_id,
  shipping_cost,
  vat_percentage,
  billing_company_name,
  billing_first_name,
  billing_last_name,
  billing_email,
  billing_address1,
  billing_address2,
  billing_city,
  billing_country_name,
  billing_zip_code,
  shipping_first_name,
  shipping_last_name,
  shipping_email,
  shipping_address1,
  shipping_address2,
  shipping_city,
  shipping_country_name,
  shipping_zip_code,
  terms,
) => {
  console.log({
  'mphid' :   mph_id,
    'po' :    po_reference,
    'status' :   status,
    'name' :   name,
    'currency' :   currency,
    'last' :   last_status,
    'method' :   shipping_method_id,
    'shipping' :   shipping_cost,
  'vat' :   vat_percentage,
  'companyName' :  billing_company_name,
  'bfirstName' :  billing_first_name,
  'blastName' :   billing_last_name,
     'bemail' :    billing_email,
   'badd' :  billing_address1,
  'badd2' :  billing_address2,
  'Bcitty' :  billing_city,
    'Bcountry' :  billing_country_name,
    'Bzip' :  billing_zip_code,
      'sfrrr' : shipping_first_name,
    'slast' :  shipping_last_name,
    'sem' :  shipping_email,
  'sadd' :   shipping_address1,
  'sadd2' :   shipping_address2,
    'scity' :   shipping_city,
    'scountry' :   shipping_country_name,
  'szip' :   shipping_zip_code,
    'sterms' :   terms})
  return (dispatch) => {
    return API.updateOrder(orderId, {
      mph_id,
      po_reference,
      status,
      name,
      currency,
      last_status,
      shipping_method_id,
      shipping_cost,
      vat_percentage,
      billing_company_name,
      billing_first_name,
      billing_last_name,
      billing_email,
      billing_address1,
      billing_address2,
      billing_city,
      billing_country_name,
      billing_zip_code,
      shipping_first_name,
      shipping_last_name,
      shipping_email,
      shipping_address1,
      shipping_address2,
      shipping_city,
      shipping_country_name,
      shipping_zip_code,
      terms,
    }).then((response) => {
      if (response.code === 200) {
        if (response.data) {
          dispatch(updateOrderSuccess(response.data));
        }
      }
      return response;
    });
  };
};


const INITIAL_STATE = {
  ordersList: [],
};

export default function reducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case SET_ORDERS_LIST:
      return {...state, ordersList: action.value};
    case ADD_ORDER_SUCCESS:
      return {...state, addOrder: action.value};
    case UPDATE_ORDER_SUCCESS:
        return {...state, updateOrder: action.value};
    default:
      return state;
  }
}

import API from '../../services/api';

const SET_USERS_LIST = 'USERS_LIST';
const ADD_USER_SUCCESS = 'ADD_USER_SUCCESS';

const setUSERSList = (value) => ({type: SET_USERS_LIST, value});
const addUSERSuccess = (value) => ({type: ADD_USER_SUCCESS, value});

export const getUsersList = () => {
  return (dispatch) => {
    return API.getUsersList().then((response) => {
      console.log('response', response);
      if (response.code === 200) {
        if (response.data) {
          dispatch(setUSERSList(response.data));
        }
      }
      return response;
    });
  };
};

export const getUSERDetails = (USERID) => {
  return (dispatch) => {
    return API.getUSERDetails(USERID).then((response) => {
      return response;
    });
  };
};

export const addUSER = (
  client_id,
  type,
  status,
  code,
  name,
  Code,
  mph_id,
  po_reference,
  currency,
  price_beta,
  vat_percentage,
  billing_company_name,
  billing_first_name,
  billing_last_name,
  billing_email,
  billing_address1,
  billing_address2,
  billing_city,
  billing_country,
  billing_zip_code,
  shipping_cost,
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
  return (dispatch) => {
    return API.addUSER({
      client_id,
      type,
      status,
      code,
      name,
      Code,
      mph_id,
      po_reference,
      currency,
      price_beta,
      vat_percentage,
      billing_company_name,
      billing_first_name,
      billing_last_name,
      billing_email,
      billing_address1,
      billing_address2,
      billing_city,
      billing_country,
      billing_zip_code,
      shipping_cost,
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
          dispatch(addUSERSuccess(response.data));
        }
      }
      return response;
    });
  };
};
const INITAIL_STATE = {
  usersList: [],
};

export default function reducer(state = INITAIL_STATE, action) {
  switch (action.type) {
    case SET_USERS_LIST:
      return {...state, usersList: action.value};
    case ADD_USER_SUCCESS:
      return {...state, addUSER: action.value};
    default:
      return state;
  }
}

import API from '../../services/api';

const SET_QUOTES_LIST = 'QUOTES_LIST';
const ADD_QUOTE_SUCCESS = 'ADD_QUOTE_SUCCESS';

const setQuotesList = (value) => ({type: SET_QUOTES_LIST, value});
const addQuoteSuccess = (value) => ({type: ADD_QUOTE_SUCCESS, value});

export const getQuotesList = () => {
  return (dispatch) => {
    return API.getQuotesList().then((response) => {
      console.log('response', response);
      if (response.code === 200) {
        if (response.data) {
          dispatch(setQuotesList(response.data));
        }
      }
      return response;
    });
  };
};

export const getQuoteDetails = (quoteID) => {
  return (dispatch) => {
    return API.getQuoteDetails(quoteID).then((response) => {
      return response;
    });
  };
};

export const addQuote = (
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
    return API.addQuote({
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
          dispatch(addQuoteSuccess(response.data));
        }
      }
      return response;
    });
  };
};
const INITAIL_STATE = {
  quotesList: [],
};

export default function reducer(state = INITAIL_STATE, action) {
  switch (action.type) {
    case SET_QUOTES_LIST:
      return {...state, quotesList: action.value};
    case ADD_QUOTE_SUCCESS:
      return {...state, addQuote: action.value};
    default:
      return state;
  }
}

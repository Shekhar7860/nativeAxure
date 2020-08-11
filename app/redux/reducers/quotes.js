import API from '../../services/api';

const SET_QUOTES_LIST = 'QUOTES_LIST';
const ADD_QUOTE_SUCCESS = 'ADD_QUOTE_SUCCESS';
const UPDATE_QUOTE_SUCCESS = 'UPDATE_QUOTE_SUCCESS';
const ADD_QUOTE_ITEM_SUCCESS = 'ADD_QUOTE_ITEM_SUCCESS';

const setQuotesList = (value) => ({type: SET_QUOTES_LIST, value});
const addQuoteSuccess = (value) => ({type: ADD_QUOTE_SUCCESS, value});
const updateQuoteSuccess = (value) => ({type: UPDATE_QUOTE_SUCCESS, value});
const addQuoteItemSuccess = (value) => ({type: ADD_QUOTE_ITEM_SUCCESS, value});

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

export const searchQuote = (VAL) => {
  return (dispatch) => {
    return API.searchQuote(VAL).then((response) => {
      return response;
    });
  };
};

export const updateQuote = (
  quoteId,
  type,
  status,
  code,
  terms,
  name,
  po_reference,
  currency,
  vat_percentage,
  shipping_cost,
  billing_company_name,
  billing_first_name,
  billing_last_name,
  billing_email,
  billing_add1,
  billing_add2,
  billing_city,
  billing_country,
  billing_zip_code,
  shipping_company_name,
  shipping_first_name,
  shipping_last_name,
  shipping_email,
  shipping_add1,
  shipping_add2,
  shipping_city,
  shipping_country,
  shipping_zip_code,
) => {
  return (dispatch) => {
    return API.updateQuote(quoteId, status, {
      type,
      code,
      terms,
      name,
      po_reference,
      currency,
      vat_percentage,
      shipping_cost,
      billing_company_name,
      billing_first_name,
      billing_last_name,
      billing_email,
      billing_add1,
      billing_add2,
      billing_city,
      billing_country,
      billing_zip_code,
      shipping_company_name,
      shipping_first_name,
      shipping_last_name,
      shipping_email,
      shipping_add1,
      shipping_add2,
      shipping_city,
      shipping_country,
      shipping_zip_code,
    }).then((response) => {
      if (response.code === 200) {
        if (response.data) {
          dispatch(updateQuoteSuccess(response.data));
        }
      }
      return response;
    });
  };
};

export const addQuote = (reseller_id, client_id, type) => {
  return (dispatch) => {
    return API.addQuote({
      reseller_id,
      client_id,
      type,
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

export const addQuoteItem = (quote_id, product_id, quantity) => {
  return (dispatch) => {
    return API.addQuoteItem({
      quote_id,
      product_id,
      quantity,
    }).then((response) => {
      if (response.code === 200) {
        if (response.data) {
          dispatch(addQuoteItemSuccess(response.data));
        }
      }
      return response;
    });
  };
};

export const deleteQuoteItem = (quoteItemID) => {
  return (dispatch) => {
    return API.deleteQuoteItem(quoteItemID).then((response) => {
      return response;
    });
  };
};

export const getQuoteItem = (quoteItemID) => {
  return (dispatch) => {
    return API.getQuoteItem(quoteItemID).then((response) => {
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
    case UPDATE_QUOTE_SUCCESS:
      return {...state, updateQuote: action.value};
    case ADD_QUOTE_ITEM_SUCCESS:
      return {...state, addQuoteItem: action.value};
    default:
      return state;
  }
}

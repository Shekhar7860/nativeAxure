import API from '../../services/api';

const SET_CLIENTS_LIST = 'CLIENTS_LIST';
const ADD_CLIENT_SUCCESS = 'ADD_CLIENT_SUCCESS';
const UPDATE_CLIENT_SUCCESS = 'UPDATE_CLIENT_SUCCESS';

const setClientsList = (value) => ({type: SET_CLIENTS_LIST, value});
const addClientSuccess = (value) => ({type: ADD_CLIENT_SUCCESS, value});
const updateClientSuccess = (value) => ({type: UPDATE_CLIENT_SUCCESS, value});

export const getClientsList = () => {
  return (dispatch) => {
    return API.getClientsList().then((response) => {
      console.log('response', response);
      if (response.code === 200) {
        if (response.data) {
          dispatch(setClientsList(response.data));
        }
      }
      return response;
    });
  };
};

export const getClientDetails = (clientID) => {
  return (dispatch) => {
    return API.getClientDetails(clientID).then((response) => {
      return response;
    });
  };
};

export const searchClient = (VAL) => {
  return (dispatch) => {
    return API.searchClient(VAL).then((response) => {
      return response;
    });
  };
};

export const addClient = (
  name,
  name_prefix,
  mph_id,
  trading_as,
  vat_registration_no,
  company_registration_no,
  target_technology,
  email,
  currency,
  company_description,
  address1,
  address2,
  city,
  country_name,
  phone,
  zip_code,
  contact1_first_name,
  contact1_last_name,
  contact1_email,
  contact1_address1,
  contact1_address2,
  contact1_city,
  contact1_country_name,
  contact1_zip_code,
  contact1_phone,
  contact1_mobile,
  bank_name,
bank_sort_code,
bank_account_no,
bank_address,
financial_year_end,
anticipated_credit_limit,
holding_company,
trading_address,
trading_phone,
trading_fax,
trading_registeration_no,
trading_registeration_date,
trading_vat_registeration_no,
trade_reference_name,
trade_reference_address,
trade_reference_phone,
trade_reference_fax,
trade_reference_contact_name,
trade_reference_banker_name,
trade_reference_banker_address,
trade_reference_banker_account_no,
website,
note
) => {
  
  return (dispatch) => {
    return API.addClient({
      name,                             
      name_prefix,
      mph_id,
      trading_as,
      vat_registration_no,
      company_registration_no,
      target_technology,
      email,
      currency,
      company_description,
      address1,
      address2,
      city,
      country_name,
      phone,
      zip_code,
      contact1_first_name,
      contact1_last_name,
      contact1_email,
      contact1_address1,
      contact1_address2,
      contact1_city,
      contact1_country_name,
      contact1_zip_code,
      contact1_phone,
      contact1_mobile,
      bank_name,
      bank_sort_code,
      bank_account_no,
      bank_address,
      financial_year_end,
      anticipated_credit_limit,
      holding_company,
      trading_address,
      trading_phone,
      trading_fax,
      trading_registeration_no,
      trading_registeration_date,
      trading_vat_registeration_no,
      trade_reference_name,
      trade_reference_address,
      trade_reference_phone,
      trade_reference_fax,
      trade_reference_contact_name,
      trade_reference_banker_name,
      trade_reference_banker_address,
      trade_reference_banker_account_no,
      website,
      note
    }).then((response) => {
      if (response.code === 200) {
        if (response.data) {
          dispatch(addClientSuccess(response.data));
        }
      }
      return response;
    });
  };
};

export const updateClient = (
  clientId,
  name,
  name_prefix,
  mph_id,
  trading_as,
  vat_registration_no,
  company_registration_no,
  target_technology,
  email,
  currency,
  company_description,
  address1,
  address2,
  city,
  country_name,
  phone,
  zip_code,
  contact1_first_name,
  contact1_last_name,
  contact1_email,
  contact1_address1,
  contact1_address2,
  contact1_city,
  contact1_country_name,
  contact1_zip_code,
  contact1_phone,
  contact1_mobile,
  bank_name,
bank_sort_code,
bank_account_no,
bank_address,
financial_year_end,
anticipated_credit_limit,
holding_company,
trading_address,
trading_phone,
trading_fax,
trading_registeration_no,
trading_registeration_date,
trading_vat_registeration_no,
trade_reference_name,
trade_reference_address,
trade_reference_phone,
trade_reference_fax,
trade_reference_contact_name,
trade_reference_banker_name,
trade_reference_banker_address,
trade_reference_banker_account_no
) => {
  return (dispatch) => {
    return API.updateClient(clientId, {
      name,                             
      name_prefix,
      mph_id,
      trading_as,
      vat_registration_no,
      company_registration_no,
      target_technology,
      email,
      currency,
      company_description,
      address1,
      address2,
      city,
      country_name,
      phone,
      zip_code,
      contact1_first_name,
      contact1_last_name,
      contact1_email,
      contact1_address1,
      contact1_address2,
      contact1_city,
      contact1_country_name,
      contact1_zip_code,
      contact1_phone,
      contact1_mobile,
      bank_name,
      bank_sort_code,
      bank_account_no,
      bank_address,
      financial_year_end,
      anticipated_credit_limit,
      holding_company,
      trading_address,
      trading_phone,
      trading_fax,
      trading_registeration_no,
      trading_registeration_date,
      trading_vat_registeration_no,
      trade_reference_name,
      trade_reference_address,
      trade_reference_phone,
      trade_reference_fax,
      trade_reference_contact_name,
      trade_reference_banker_name,
      trade_reference_banker_address,
      trade_reference_banker_account_no
    }).then((response) => {
      if (response.code === 200) {
        if (response.data) {
          dispatch(updateClientSuccess(response.data));
        }
      }
      return response;
    });
  };
};

const INITAIL_STATE = {
  clientList: [],
  addClient: '',
  updateClient: '',
};

export default function reducer(state = INITAIL_STATE, action) {
  switch (action.type) {
    case SET_CLIENTS_LIST:
      return {...state, clientsList: action.value};
    case ADD_CLIENT_SUCCESS:
      return {...state, addClient: action.value};
    case UPDATE_CLIENT_SUCCESS:
      return {...state, updateClient: action.value};
    default:
      return state;
  }
}

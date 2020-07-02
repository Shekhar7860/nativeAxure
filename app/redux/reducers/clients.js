import API from '../../services/api';

const SET_CLIENTS_LIST = 'CLIENTS_LIST';
const ADD_CLIENT_SUCCESS = 'ADD_CLIENT_SUCCESS';

const setClientsList = (value) => ({type: SET_CLIENTS_LIST, value});
const addClientSuccess = (value) => ({type: ADD_CLIENT_SUCCESS, value});

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
  zip_code,
  contact1_first_name,
  contact1_last_name,
  contact1_email,
  contact1_address1,
  contact1_address2,
  contact1_city,
  contact1_country_name,
  contact1_phone,
  contact1_mobile,
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
      zip_code,
      contact1_first_name,
      contact1_last_name,
      contact1_email,
      contact1_address1,
      contact1_address2,
      contact1_city,
      contact1_country_name,
      contact1_phone,
      contact1_mobile,
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

const INITAIL_STATE = {
  patientList: [],
  addAppointment: [],
  appointmentDetail: [],
  medicationList: [],
  taskList: [],
  patientIdList: [],
  appointmentNotes: '',
};

export default function reducer(state = INITAIL_STATE, action) {
  switch (action.type) {
    case SET_CLIENTS_LIST:
      return {...state, clentsList: action.value};
    case ADD_CLIENT_SUCCESS:
      return {...state, addQuote: action.value};
    default:
      return state;
  }
}

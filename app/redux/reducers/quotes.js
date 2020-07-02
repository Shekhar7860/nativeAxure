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

export const addQuote = (name, patient_id, nurse_id, from, till) => {
  return (dispatch) => {
    return API.addQuote({
      name,
      patient_id,
      nurse_id,
      from,
      till,
      nurse_additional_note,
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

import API from '../../services/api';

const SET_QUOTES_LIST = 'QUOTES_LIST';

const setQuotesList = (value) => ({type: SET_QUOTES_LIST, value});

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

const INITAIL_STATE = {
  quotesList: [],
};

export default function reducer(state = INITAIL_STATE, action) {
  switch (action.type) {
    case SET_QUOTES_LIST:
      return {...state, quotesList: action.value};
    default:
      return state;
  }
}

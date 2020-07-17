import API from '../../services/api';

const SET_COUNTRIES_LIST = 'COUNTRIES_LIST';

const setCountriesList = (value) => ({type: SET_COUNTRIES_LIST, value});

export const getCountriesList = () => {
  return (dispatch) => {
    return API.getCountriesList().then((response) => {
      console.log('response', response);
      if (response.code === 200) {
        if (response.data) {
          dispatch(setCountriesList(response.data));
        }
      }
      return response;
    });
  };
};

const INITAIL_STATE = {
  countriesList: []
};

export default function reducer(state = INITAIL_STATE, action) {
  switch (action.type) {
    case SET_COUNTRIES_LIST:
      return {...state, countriesList: action.value};
    default:
      return state;
  }
}

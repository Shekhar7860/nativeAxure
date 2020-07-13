import API from '../../services/api';

const SET_UPLOADED_ORDERS_LIST = 'UPLOADED_ORDERS_LIST';

const setUploadedOrdersList = (value) => ({type: SET_UPLOADED_ORDERS_LIST, value});

export const getUploadedOrdersList = () => {
  return (dispatch) => {
    return API.getUploadedOrdersList().then((response) => {
      console.log('response', response);
      if (response.code === 200) {
        if (response.data) {
          dispatch(setUploadedOrdersList(response.data));
        }
      }
      return response;
    });
  };
};

const INITAIL_STATE = {
  uploadedOrdersList: []
};

export default function reducer(state = INITAIL_STATE, action) {
  switch (action.type) {
    case SET_UPLOADED_ORDERS_LIST:
      return {...state, uploadedOrdersList: action.value};
    default:
      return state;
  }
}

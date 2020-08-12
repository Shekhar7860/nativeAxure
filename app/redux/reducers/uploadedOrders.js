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

export const addUploadedOrders = (reseller_id, name) => {
  return (dispatch) => {
    return API.addUploadedOrders({
      reseller_id, 
      name
    }).then((response) => {
      if (response.code === 200) {
        if (response.data) {
         // dispatch(addQuoteSuccess(response.data));
        }
      }
      return response;
    });
  };
};

export const updateUploadedOrders = (
  orderId,
  client_id,
  name,
  file
) => {
  return (dispatch) => {
    return API.updateUploadedOrders(orderId, {
      client_id,
      name,
      file
    }).then((response) => {
      if (response.code === 200) {
        if (response.data) {
       //   dispatch(updateQuoteSuccess(response.data));
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

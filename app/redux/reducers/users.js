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
  email,
  first_name,
  last_name,
  reseller_id,
  password,
  address1,
  address2,
  phone,
  mobile,
  zip_code,
  city,
  password_confirmation,
  group_ids
) => {
  return (dispatch) => {
    return API.addUSER({
     email,
     first_name,
     last_name,
     reseller_id,
     password,
     address1,
     address2,
     phone,
     mobile,
     zip_code,
     city,
     password_confirmation,
     group_ids
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

export const updateUser = (
  userId,
  email,
  first_name,
  last_name,
  reseller_id,
  password,
  address1,
  address2,
  phone,
  mobile,
  zip_code,
  city,
  confirm_password
) => {
  return (dispatch) => {
    return API.updateUser(userId, {
     email,
     first_name,
     last_name,
     reseller_id,
     password,
     address1,
     address2,
     phone,
     mobile,
     zip_code,
     city,
     confirm_password
    }).then((response) => {
      if (response.code === 200) {
        
      }
      return response;
    });
  };
};
const INITAIL_STATE = {
  usersList: [],
};

export const searchUser = (VAL) => {
  return (dispatch) => {
    return API.searchUser(VAL).then((response) => {
      return response;
    });
  };
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

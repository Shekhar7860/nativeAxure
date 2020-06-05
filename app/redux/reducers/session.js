import API from '../../services/api';

const SET_USER = 'session/SET_USER';

const setUserInfo = value => ({type: SET_USER, value});

export const signupUser = (
  first_name,
  last_name,
  email,
  mobile,
  password,
  password_confirmation,
) => {
  return dispatch => {
    return API.signup({
      first_name,
      last_name,
      email,
      mobile,
      password,
      password_confirmation,
    })
      .then(response => {
        return response;
      })
      .catch(error => {
        return error;
      });
  };
};

export const loginUser = (email, password) => {
  return dispatch => {
    return API.login({email, password})
      .then(response => {
        if (response.code === 200) {
          // console.log('userData', response.data)
          dispatch(setUserInfo(response.data));
        }
        return response;
      })
      .catch(error => {
        return error;
      });
  };
};

// updateProfilePic -- shekhar
export const updateProfilePic = (file) => {
 // console.group('insidesessionjs', file)
  return dispatch => {
    return API.updateProfilePicture({file})
      .then(response => {
         console.group('this is res', response)
        return response;
      })
      .catch(error => {
        return error;
      });
  };
};

export const getUserInfo = () => {
  return dispatch => {
    return API.getUserInfo().then(response => {
      if (response.code === 200) {
        dispatch(setUserInfo(response.data));
      }
      return response;
    });
  };
};

const INITIAL_STATE = {
  userInfo: {},
};

export default function reducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case SET_USER:
      return {...state, userInfo: action.value};
    default:
      return state;
  }
}

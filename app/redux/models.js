import DEFAULT from './state';
import API from '../services/api';

export const userData = {
  state: DEFAULT,
  reducers: {
    checkInternet(state, online) {
      return {...state, online: {...state.online, online}};
    },
    setUserData(state, userInfo) {
      // console.log('userdata', userInfo);
      return {...state, userInfo: {...state.userInfo, userInfo}};
    },
    setClientsList(state, payload) {
      return {...state, clientList: payload};
    },
    setProductsList(state, payload) {
      return {...state, productsList: payload};
    },
    setCountriesList(state, payload) {
      return {...state, countriesList: payload};
    },
  },
  effects: {
    loginUser(user) {
      let email = user.username;
      let password = user.password;
      return API.login({email, password})
        .then((response) => {
          if (response.code === 200) {
            this.setUserData(response.data);
          }
          return response;
        })
        .catch((error) => {
          return error;
        });
      // const people = await API.login({email, password});
    },
    getClientsList() {
      return API.getClientsList().then((response) => {
        if (response.code === 200) {
          if (response.data) {
            this.setClientsList(response.data);
          }
        }
        return response;
      });
    },
    getProductsList() {
      return API.getProductsList().then((response) => {
        if (response.code === 200) {
          if (response.data) {
            this.setProductsList(response.data);
          }
        }
        return response;
      });
    },
    getCountriesList() {
      return API.getCountriesList().then((response) => {
        if (response.code === 200) {
          if (response.data) {
            this.setCountriesList(response.data);
          }
        }
        return response;
      });
    },
  },
};

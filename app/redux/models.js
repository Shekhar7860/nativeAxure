import DEFAULT from './state';
import API from '../services/api';

export const userData = {
  state: DEFAULT,
  reducers: {
    setFirstName(state, firstName) {
      return {...state, currentPerson: {...state.currentPerson, firstName}};
    },
    setLastName(state, lastName) {
      return {...state, currentPerson: {...state.currentPerson, lastName}};
    },
    setPeople(state, payload) {
      return {...state, people: payload};
    },
  },
  effects: {
    async loginUser(email, password) {
      const people = await API.login({email, password});
    },
  },
};

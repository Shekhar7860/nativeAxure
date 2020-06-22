import {ONLINE} from '../../services/types';

const INITIAL_STATE = {
  error: '',
  online: false,
};

export const checkInternet = (data) => {
  return {
    type: ONLINE,
    payload: data,
  };
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ONLINE:
      return {...state, ...INITIAL_STATE, online: action.payload};
    default:
      return state;
  }
};

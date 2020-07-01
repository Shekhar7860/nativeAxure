import API from '../../services/api';

const SET_CLIENTS_LIST = 'CLIENTS_LIST';

const setClientsList = (value) => ({type: SET_CLIENTS_LIST, value});

export const getClientsList = () => {
  return (dispatch) => {
    return API.getClientsList().then((response) => {
      console.log('response', response);
      if (response.code === 200) {
        if (response.data) {
          dispatch(setClientsList(response.data));
        }
      }
      return response;
    });
  };
};

export const getClientDetails = (clientID) => {
  return (dispatch) => {
    return API.getClientDetails(clientID).then((response) => {
      return response;
    });
  };
};

const INITAIL_STATE = {
  patientList: [],
  addAppointment: [],
  appointmentDetail: [],
  medicationList: [],
  taskList: [],
  patientIdList: [],
  appointmentNotes: '',
};

export default function reducer(state = INITAIL_STATE, action) {
  switch (action.type) {
    case SET_CLIENTS_LIST:
      return {...state, clentsList: action.value};
    default:
      return state;
  }
}

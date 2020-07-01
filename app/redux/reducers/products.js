import API from '../../services/api';

const SET_PRODUCTS_LIST = 'PRODUCTS_LIST';

const setProductsList = (value) => ({type: SET_PRODUCTS_LIST, value});

export const getProductsList = () => {
  return (dispatch) => {
    return API.getProductsList().then((response) => {
      console.log('response', response);
      if (response.code === 200) {
        if (response.data) {
          dispatch(setProductsList(response.data));
        }
      }
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
    case SET_PRODUCTS_LIST:
      return {...state, productsList: action.value};
    default:
      return state;
  }
}

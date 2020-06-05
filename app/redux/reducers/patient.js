import API from '../../services/api';

const SET_PATIENTS = 'patient/SET_APPOINTMENTS';
const ADD_APPOINTMENT_SUCCESS = 'patient/ADD_APPOINTMENT_SUCCESS';
const SET_APPOINTMENT_DETAIL ='patient/SET_APPOINTMENT_DETAIL';
const SET_MEDICATION_LIST = 'patient/SET_MEDICATION_LIST';
const SET_TASK_LIST = 'patient/SET_TASK_LIST';
const SET_PATIENTS_ID_LIST = 'patient/SET_PATIENTS_ID_LIST';
const SET_NOTES_LIST = 'patient/SET_NOTES_LIST';
const GET_LEAVES_GRANTED = 'PATIENT/GET_LEAVES';

const setPatients = value => ({type: SET_PATIENTS, value});
const addAppoitmentSuccess = value => ({type: ADD_APPOINTMENT_SUCCESS, value});
const leaveGranted = value => ({type: GET_LEAVES_GRANTED, value});
const setAppointmentDetail = value => ({type: SET_APPOINTMENT_DETAIL, value});
const setMedicationList = value => ({type: SET_MEDICATION_LIST, value});
const setTaskList = value => ({type: SET_TASK_LIST, value});
const setNotesList = value => ({type: SET_NOTES_LIST, value});
const setPatientsIdList = value => ({type: SET_PATIENTS_ID_LIST, value});

export const addAppointment = (
  name,
  patient_id,
  nurse_id,
  from,
  till,
  nurse_additional_note = undefined) => {
  return dispatch => {
    return API.addAppointment(
      {name,
      patient_id,
      nurse_id,
      from,
      till,
      nurse_additional_note}).then(response => {
      if (response.code === 200) {
        if (response.data) {
          dispatch(addAppoitmentSuccess(response.data));
        }
      }
      return response;
    });
  };
};

export const requestLeave = (
  From,
  Till,
  Note,
  Type,) => {
  return dispatch => {
    return API.requestLeave(
      {From,
      Till,
      Note,
      Type}).then(response => {
      if (response.code === 200) {
        if (response.data) {
          dispatch(leaveGranted(response.data));
        }
      }
      return response;
    });
  };
};
export const appointmentNote = (
  Appointment_id,
  body,
  ) => {
  return dispatch => {
    return API.appointmentNote(
      Appointment_id,
      {body},
      ).then(response => {
      return response;
    });
  };
};

export const appointmentDetailsbyCalander = (query ) => {
    return dispatch => {
      return API.appointmentDetailsbyCalander(query).then(response => {
        return response;
      });
    };
};

export const getAppointmentList = () => {
  return dispatch => {
    return API.getAppointmentList().then(response => {
      if (response.code === 200) {
        if (response.data) {
          dispatch(setPatients(response.data));
        }
      }
      return response;
    });
  };
};


export const getPatientList = () => {
  return dispatch => {
    return API.getPatientList().then(response => {
      if (response.code === 200) {
        if (response.data) {
          dispatch(setPatientsIdList(response.data));
        }
      }
      return response;
    });
  };
}

export const getAppoitmentDetails = patientID => {
  return dispatch => {
    return API.getAppoitmentDetails(patientID).then(response => {
      if (response.code === 200){
        if (response.data) {
         dispatch(setAppointmentDetail(response.data));
        }
      }
      return response;
    });
  };
};

export const getAppointmentMedicationlist = id => {
  return dispatch => {
    return API.getAppointmentMedicationlist(id).then(response => {
      if (response.code === 200) {
        if (response.data) {
          dispatch(setMedicationList(response.data));
        }
      }
      return response;
    });
  };
};

export const getAppointmentTasklist = id => {
  return dispatch => {
    return API.getAppointmentTasklist(id).then(response => {
      if (response.code === 200) {
        if (response.data) {
          dispatch(setTaskList(response.data));
        }
      }
      return response;
    });
  };
};

export const getAppointmentNotes = id => {
  return dispatch => {
    return API.getAppointmentNotes(id).then(response => {
      console.log('notes', response)
      if (response.code === 200) {
        if (response.data) {
          dispatch(setNotesList(response.data));
        }
      }
      return response;
    });
  };
};

export const markMedicationDone = id => {
  return dispatch => {
    return API.markMedicationDone(id).then(response => {
      return response;
    });
  };
};

export const markTaskDone = id => {
  return dispatch => {
    return API.markTaskDone(id).then(response => {
      return response;
    });
  };
};

export const updateAppointmentDetails = (appointmentID, query) => {
  return dispatch => {
    return API.updateAppointmentDetails(appointmentID, query).then(response => {
      return response;
    });
  };
};

export const getNursesList = (id) => {
  return dispatch => {
    return API.getNursesList(id).then(response => {
      if (response.code === 200) {
        console.log('res', response)
             }
      return response;
    });
  };
}

const INITAIL_STATE = {
  patientList: [],
  addAppointment: [],
  appointmentDetail: [],
  medicationList: [],
  taskList: [],
  patientIdList: [],
  appointmentNotes: ''
};

export default function reducer(state = INITAIL_STATE, action) {
  switch (action.type) {
    case SET_PATIENTS:
      return {...state, patientList: action.value};
    case ADD_APPOINTMENT_SUCCESS:
      return {...state, addAppointment: action.value};
    case SET_APPOINTMENT_DETAIL:
      return {...state, appointmentDetail: action.value};
    case SET_MEDICATION_LIST:
      return {...state, medicationList: action.value};
    case SET_TASK_LIST:
      return {...state, taskList: action.value};
    case SET_PATIENTS_ID_LIST:
      return {...state, patientIdList: action.value};
    case SET_NOTES_LIST:
      return {...state, appointmentNotes: action.value}
    default:
      return state;
  }
}

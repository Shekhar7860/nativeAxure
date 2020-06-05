
import { API_AUTH_TOKEN, API_CLIENT_ID, API_URL } from '../constants/config';
import { pickBy, pick } from 'lodash';

const urlTo = path => {
  return `${API_URL}/${path}`;
};

function toFormData(object) {
  if (object instanceof FormData) {
    return object;
  }

  const formData = new FormData();
  Object.keys(object).forEach(key => formData.append(key, object[key]));
  return formData;
}

const clearQuery = query => {
  if (!query) {
    return query;
  }
  return pickBy(query, v => v != null);
};

function formDataToObject(formData) {
  if (!(formData instanceof FormData)) {
    return formData;
  }
  let object = {};
  formData.getParts().forEach(function (part) {
    object[part.fieldName] = part.string;
  });
  return object;
}

export default class Api {
  static setAuthToken(v) {
    this.authToken = v;
  }

  static signup(userData = {}) {
    const formData = clearQuery(
      pick(userData, [
        'first_name',
        'last_name',
        'email',
        'mobile',
        'password',
        'password_confirmation',
      ]),
    );
    let response = this.sendRequest('POST', 'register/orhc-user', { formData });
    return response;
  }

  static login(loginObj={}) {
    let formData = pick(loginObj, ['email', 'password']);
        let response = this.sendRequest('POST', 'login', { formData });
    return response;
  }

  static appointmentNote(appointmentid, Note) {
    const formData = clearQuery(
      pick(Note, ['body']),
    );
    let response = this.sendRequest('POST', `user/appointments/${appointmentid}/comments`, { formData });
    return response;
  }

  static addAppointment(apptData = {}) {
    const formData = clearQuery(
      pick(apptData, ['name', 'patient_id', 'nurse_id', 'from', 'till', 'nurse_additional_note']),
    );
    let response = this.sendRequest('POST', 'user/appointments', { formData });
    return response;
  }

// shekhar 
  static updateProfilePicture(apptData = {}) {
    console.group('inside api')
    const formData = clearQuery(
      pick(apptData, ['file']),
    );
    console.group('formDat2', formData)
    let response = this.sendRequest('POST', 'user/profile-pic/store', { formData });
    return response;
  }

  static requestLeave(apptData = {}) {
    const formData = clearQuery(
      pick(apptData, ['From', 'Till', 'Note', 'Type']),
    );
    let response = this.sendRequest('POST', 'user/leaves/request', { formData });
    return response;
  }

  static getUserInfo() {
    let response = this.sendRequest('GET', 'user');
    return response;
  }

  static getAppointmentList() {
    let response = this.sendRequest('GET', 'user/appointments');
    return response;
  }

static getNursesList(patientID) {
    let response = this.sendRequest('GET', `user/patient-nurses/${patientID}`);
    return response;
  }


  static getPatientList() {
    let response = this.sendRequest('GET', 'user/patients');
    return response;
  }

  static getCareGivers() {
    let response = this.sendRequest('GET', 'user/patients');
    return response;
  }

  static getAppoitmentDetails(patientID) {
    let response = this.sendRequest('GET', `user/appointments/${patientID}`);
    return response;
  }

  static appointmentDetailsbyCalander(query) {
    let response = this.sendRequest('GET', `user/appointments-list`, { query });

    return response;
  }

  static getAppointmentMedicationlist(AppointmentID) {
    let response = this.sendRequest('GET', `user/appointments/${AppointmentID}/medications`);
    return response;
  }

  static markMedicationDone(medicationID) {
    let response = this.sendRequest('PATCH', `user/appointment-medications/${medicationID}?is_complete=1`);
    return response;
  }

  static markTaskDone(taskID) {
    let response = this.sendRequest('PATCH', `user/appointment-tasks/${taskID}?is_complete=1`);
    return response;
  }

  static updateAppointmentDetails(appointmentID, query) {
    let response = this.sendRequest('PATCH', `user/appointments/${appointmentID}`, { query });
    return response;
  }

  static getAppointmentNotes(appointmentID) {
    let response = this.sendRequest('GET', `user/appointments/${appointmentID}/comments`);
    return response;
  }

  static getAppointmentTasklist(AppointmentID) {
    let response = this.sendRequest('GET', `user/appointments/${AppointmentID}/tasks`);
    return response;
  }

  static sendRequest(method, path, opts = {}, skipAuth = false) {
    let fetchOpts = {
      method,
    };
    let fullPath = path;

    let headers = {
      'X-Auth-Token': API_AUTH_TOKEN,
      'Client-id': API_CLIENT_ID,
    };
    console.log('this.authToken: ' + this.authToken);
    if (!skipAuth && this.authToken) {
      headers.authorization = `Bearer ${this.authToken}`;
    }

    const jsonBody = opts.jsonBody;
    if (jsonBody) {
      headers['content-type'] = 'application/vnd.api+json';
      fetchOpts.body = JSON.stringify(jsonBody);
    }

    const query = clearQuery(opts.query);
    if (query) {
      fullPath = withQuery(fullPath, query);
    }

    const formData = opts.formData;
    if (formData) {
      headers['content-type'] = 'multipart/form-data';
      fetchOpts.body = toFormData(formData);
    }

    fetchOpts.headers = headers;

    const url = urlTo(fullPath, opts.publicApi);
    const requestBody = jsonBody || formDataToObject(formData) || query || '';
    console.log('Request:', fetchOpts.headers, url, requestBody);
    return fetch(url, fetchOpts)
      .then(async res => {
        let data = res;
        try {
          data = await res.json();
        } catch (parseError) {
          console.log('Response parse error: ', parseError);
        }

        console.log('Response:', res, data);

        switch (res.status) {
          case 200: {
            if (data.status === 'fail') {
              throw {
                request: { url, data: requestBody },
                response: data,
                ...data,
              };
            }
            return data;
          }
          case 401:
            throw {
              code: 'unauthorized',
              status: res.status,
              request: { url, data: requestBody },
              response: data,
            };
          default:
            throw {
              code: 'unknown',
              status: res.status,
              request: { url, data: requestBody },
              response: data,
            };
        }
      })
      .catch(error => {
        console.log(
          'Request:',
          fetchOpts.method,
          url,
          requestBody,
          '\nError:',
          error,
        );
        throw error;
      });
  }
}

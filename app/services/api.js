import {API_AUTH_TOKEN, API_CLIENT_ID, API_URL} from '../constants/config';
import {pickBy, pick} from 'lodash';
import axios from 'axios';
import withQuery from 'with-query';

const urlTo = (path) => {
  return `${API_URL}/${path}`;
};

function toFormData(object) {
  if (object instanceof FormData) {
    return object;
  }

  const formData = new FormData();
  Object.keys(object).forEach((key) => formData.append(key, object[key]));
  return formData;
}

const clearQuery = (query) => {
  if (!query) {
    return query;
  }
  return pickBy(query, (v) => v != null);
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
    console.log('token', v);
    this.authToken = v;
  }

  static login(loginObj = {}) {
    let formData = pick(loginObj, ['email', 'password']);
    let response = this.sendRequest('POST', 'login', {formData});
    return response;
  }

  static addQuote(userData = {}) {
    const formData = clearQuery(
      pick(userData, [
        'reseller_id',
        'client_id',
        'type'
      ]),
    );
    let response = this.sendRequest('POST', 'quotes', {formData});
    return response;
  }

  static updateQuote(ID, userData = {}) {
    console.log('quoteId is', ID)
    const formData = clearQuery(
      pick(userData, [
        'type',
        'status',
        'code',
        'terms',
        'name',
        'po_reference',
        'currency',
        'vat_percentage',
        'shipping_cost',
         'billing_company_name',
        'billing_first_name',
        'billing_last_name',
        'billing_email',
        'billing_add1',
        'billing_add2',
        'billing_city',
        'billing_country',
        'billing_zip_code',
        'shipping_company_name',
        'shipping_first_name',
        'shipping_last_name',
        'shipping_email',
        'shipping_add1',
        'shipping_add2',
        'shipping_city',
        'shipping_country',
        'shipping_zip_code',

      ]),
    );
    let response = this.sendRequest('PATCH', `quotes/${ID}`, {formData});
    return response;
  }

  static updateClient(ID, userData = {}) {
  //  console.log('clientId is', ID)
    const formData = clearQuery(
      pick(userData, [
        'name',
        'name_prefix',
        'mph_id',
        'trading_as',
        'vat_registration_no',
        'company_registration_no',
        'target_technology',
        'email',
        'currency',
        'company_description',
        'address1',
        'address2',
        'city',
        'country_name',
        'phone',
        'zip_code',
        'contact1_first_name',
        'contact1_last_name',
        'contact1_email',
        'contact1_address1',
        'contact1_address2',
        'contact1_city',
        'contact1_country_name',
        'contact1_phone',
        'contact1_zip_code',
        'contact1_mobile',
        'bank_name',
        'bank_sort_code',
        'bank_account_no',
        'bank_address',
        'financial_year_end',
        'anticipated_credit_limit',
        'holding_company',
        'trading_address',
        'trading_phone',
        'trading_fax',
        'trading_registeration_no',
        'trading_registeration_date',
        'trading_vat_registeration_no',
        'trade_reference_name',
        'trade_reference_address',
        'trade_reference_phone',
        'trade_reference_fax',
        'trade_reference_contact_name',
        'trade_reference_banker_name',
        'trade_reference_banker_address',
        'trade_reference_banker_account_no'
      ]),
    );
    let response = this.sendRequest('PATCH', `clients/${ID}`, {formData});
    return response;
  }

  static addClient(userData = {}) {
    const formData = clearQuery(
      pick(userData, [
        'name',
        'name_prefix',
        'mph_id',
        'trading_as',
        'vat_registration_no',
        'company_registration_no',
        'target_technology',
        'email',
        'currency',
        'company_description',
        'address1',
        'address2',
        'city',
        'country_name',
        'phone',
        'zip_code',
        'contact1_first_name',
        'contact1_last_name',
        'contact1_email',
        'contact1_address1',
        'contact1_address2',
        'contact1_city',
        'contact1_country_name',
        'contact1_phone',
        'contact1_zip_code',
        'contact1_mobile',
        'bank_name',
        'bank_sort_code',
        'bank_account_no',
        'bank_address',
        'financial_year_end',
        'anticipated_credit_limit',
        'holding_company',
        'trading_address',
        'trading_phone',
        'trading_fax',
        'trading_registeration_no',
        'trading_registeration_date',
        'trading_vat_registeration_no',
        'trade_reference_name',
        'trade_reference_address',
        'trade_reference_phone',
        'trade_reference_fax',
        'trade_reference_contact_name',
        'trade_reference_banker_name',
        'trade_reference_banker_address',
        'trade_reference_banker_account_no',
        'website',
        'note'
      ]),
    );
    let response = this.sendRequest('POST', 'clients', {formData});
    return response;
  }

  static addQuoteItem(userData = {}) {
    const formData = clearQuery(
      pick(userData, [
        'quote_id',
        'product_id',
        'quantity'
      ]),
    );
    let response = this.sendRequest('POST', 'quote-items', {formData});
    return response;
  }

  static deleteQuoteItem(ID) {
    let response = this.sendRequest('DELETE', `quote-items/${ID}`);
    return response;
  }


  static addOrder(userData = {}) {
    const formData = clearQuery(
      pick(userData, [
        'client_id',
        'reseller_id',
        'status',
      ]),
    );
    let response = this.sendRequest('POST', 'orders', {formData});
    return response;
  }

  static addUSER(userData = {}) {
    const formData = clearQuery(
      pick(userData, [
        'email',
        'first_name',
        'last_name',
      ]),
    );
    let response = this.sendRequest('POST', 'users', {formData});
    return response;
  }


  static updateOrder(ID, userData = {}) {
    console.log('this is orderId', ID)
    const formData = clearQuery(
      pick(userData, [
        'mph_id',
        'po_reference',
        'status',
        'name',
        'currency',
        'last_status',
        'shipping_method_id',
        'shipping_cost',
        'vat_percentage',
        'billing_company_name',
        'billing_first_name',
        'billing_last_name',
        'billing_email',
        'billing_address1',
        'billing_address2',
        'billing_city',
        'billing_country_name',
        'billing_zip_code',
        'shipping_first_name',
        'shipping_last_name',
        'shipping_email',
        'shipping_address1',
        'shipping_address2',
        'shipping_city',
        'shipping_country_name',
        'shipping_zip_code',
        'terms'

      ]),
    );
    let response = this.sendRequest('PATCH', `orders/${ID}`, {formData});
    return response;
  }


  static updateProfilePicture(apptData = {}) {
    console.group('inside api');
    const formData = clearQuery(pick(apptData, ['file']));
    console.group('formDat2', formData);
    let response = this.sendRequest('POST', 'user/profile-pic/store', {
      formData,
    });
    return response;
  }

  static getUserInfo() {
    let response = this.sendRequest('GET', 'user');
    return response;
  }

  static getUsersList() {
    let response = this.sendRequest('GET', 'users');
    return response;
  }

  static getUserDetail(ID) {
    let response = this.sendRequest('GET', `users/${ID}`);
    return response;
  }

  static getClientsList() {
    let response = this.sendRequest('GET', 'clients');
    return response;
  }

  static getQuotesList() {
    let response = this.sendRequest('GET', 'quotes');
    return response;
  }

  static getQuoteDetails(ID) {
    let response = this.sendRequest('GET', `quotes/${ID}`);
    return response;
  }

  static getClientDetails(ID) {
    let response = this.sendRequest('GET', `clients/${ID}`);
    return response;
  }

  static getProductsList() {
    let response = this.sendRequest('GET', 'products');
    return response;
  }

  static getOrdersList() {
    let response = this.sendRequest('GET', 'orders');
    return response;
  }

  static getUploadedOrdersList() {
    let response = this.sendRequest('GET', 'uploaded-orders');
    return response;
  }

  static searchClient(VAL) {
    let response = this.sendRequest('GET', `clients?key=${VAL}`);
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
      .then(async (res) => {
        let data = res;
        try {
          data = await res.json();
        } catch (parseError) {
          console.log('Response parse error: ', parseError);
        }

        console.log('Response:', res, data);

        switch (res.status) {
          case 200: {
            if(data.code !== 422)
            {
            if (data.status === 'fail') {
              throw {
                request: {url, data: body},
                response: data,
                ...data,
              };
            }
          }
            return data;
          }
          case 401:
            throw {
              code: 'unauthorized',
              status: res.status,
              request: {url, data: requestBody},
              response: data,
            };
            case 422:
              throw {
                code: 'unauthorized',
                status: res.status,
                request: {url, data: requestBody},
                response: data,
              };
          default:
            throw {
              code: 'unknown',
              status: res.status,
              request: {url, data: requestBody},
              response: data,
            };
        }
      })
      .catch((error) => {
        console.log('err', error);
      });
  }

  static sendRequestNew(method, path, body) {
    let url = `${API_URL}/${path}`;
    //alert(JSON.stringify(body));
    console.log('sent', body);
    var headers = {};
    console.log('this.authToken: ' + this.authToken);
    if (this.authToken) {
      headers = {
        'X-Auth-Token': API_AUTH_TOKEN,
        'Client-id': API_CLIENT_ID,
        authorization: `Bearer ${this.authToken}`,
      };
    } else {
      headers = {
        'X-Auth-Token': API_AUTH_TOKEN,
        'Client-id': API_CLIENT_ID,
      };
    }
    console.log('headers', headers);

    return axios
      .post(url, body, {
        headers: headers,
      })
      .then(function (response) {
        console.log('res', response);
        let data = response;
        switch (response.status) {
          case 200: {

            return data;
          }
          case 401:
            throw {
              code: 'unauthorized',
              status: res.status,
              request: {url, data: requestBody},
              response: data,
            };
          default:
            throw {
              code: 'unknown',
              status: res.status,
              request: {url, data: requestBody},
              response: data,
            };
        }
      })
      .catch(function (error) {
        console.log('err', error);
      });
  }
}

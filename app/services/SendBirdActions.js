export const application_id = '7A6B6DB6-C35A-4F36-8E6A-E85A0A26C053';
const api_url = `https://api-${application_id}.sendbird.com/v3/users/`;

class SendBirdApi {
  
  static createUser = () => {
    fetch(api_url, {
      method: 'POST',
      body: {user_id: "test123",nickname: 'Ritu',profile_url: ""},
      headers: {
        'Content-Type': 'application/json',
        charset: 'utf8',
        'Api-Token': '93674778f150931957905f3cce01e1baf1be70f5',
      },
    })
      .then(res => {
        console.log('resss===>', res);
        return res.json();
      })
      .then(res => {
        console.log('resss', res);
      })
      .catch(e => {
        console.warn('error', e);
      });
  };
}

export default SendBirdApi;

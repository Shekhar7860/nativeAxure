// export const ENVIRONMENT = "production";
export const ENVIRONMENT = 'staging';

export const __STAGING__ = ENVIRONMENT === 'staging';
export const __PROD__ = ENVIRONMENT === 'production';

// API CONFIGS:

const API_URLS = {
  production: '',
  staging: 'https://staging.mphgroup.uk/public/api/orhc/1.0',
};

const AUTH_TOKENS = {
  production: '',
  staging: '7c0f2f2802ffab09ec139275d595caaa91c6b2d2dc1340e40bdde1afb83b3ec0',
};

export const API_CLIENT_ID = 2;

export const API_URL = API_URLS[ENVIRONMENT];
export const API_AUTH_TOKEN = AUTH_TOKENS[ENVIRONMENT];

// SEND BIRD CONFIGS:

const SEND_BIRD_CONFIGS = {
  production: {
    appId: "386FA415-971A-46F7-AB19-8CA4971E505F",
    token: "cacf7f8859992e4d429d6d4e710edc19036fa9ae",
    apiUrl: "https://api.sendbird.com",
  },
  staging: {
    appId: "386FA415-971A-46F7-AB19-8CA4971E505F",
    token: "cacf7f8859992e4d429d6d4e710edc19036fa9ae",
    apiUrl: "https://api.sendbird.com",
  },
};


export const SEND_BIRD_CONFIG = SEND_BIRD_CONFIGS[ENVIRONMENT];


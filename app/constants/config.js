// export const ENVIRONMENT = "production";
export const ENVIRONMENT = 'staging';
export const FRESH_CHAT_APP_ID = '86349b73-93d0-480a-a92c-4bb1b258cab8';
export const FRESH_CHAT_ID_APP_KEY = 'b09d6d5f-0197-4a97-90c6-79993e5ab720';
export const __STAGING__ = ENVIRONMENT === 'staging';
export const __PROD__ = ENVIRONMENT === 'production';

// API CONFIGS:

const API_URLS = {
  production: '',
  staging: 'https://stagingmph.mphgroup.uk/public/api/1.0',
};

const AUTH_TOKENS = {
  production: '',
  staging: '7c0f2f2802ffab09ec139275d595caaa91c6b2d2dc1340e40bdde1afb83b3ec0',
};

export const API_CLIENT_ID = 2;

export const API_URL = API_URLS[ENVIRONMENT];
export const API_AUTH_TOKEN = AUTH_TOKENS[ENVIRONMENT];

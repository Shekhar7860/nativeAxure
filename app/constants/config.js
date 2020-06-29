// export const ENVIRONMENT = "production";
export const ENVIRONMENT = 'staging';
export const FRESH_CHAT_APP_ID = '4a251c07-7d14-426a-b72c-e2386e17b0b1';
export const FRESH_CHAT_ID_APP_KEY = '90dabf9f-5f39-449b-b9dd-7ddb908da552';
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

import sessionReducer from './session';
import login from './loginReducer';
import chat from './chatReducer';
import netInfo from './netInfo';

const INITIAL_STATE = {};

export default function (state = INITIAL_STATE, action) {
	return {
		session: sessionReducer(state.session, action),
		login: login(state.login, action),
		chat: chat(state.chat, action),
		netInfo: netInfo(state.netInfo, action),
	};
}

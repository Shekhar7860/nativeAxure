import sessionReducer from './session';
import login from './loginReducer';
import chat from './chatReducer';
import netInfo from './netInfo';
import clients from './clients';
import quotes from './quotes';
import users from './users';
import products from './products';
import orders from './orders';

const INITIAL_STATE = {};

export default function (state = INITIAL_STATE, action) {
	return {
		session: sessionReducer(state.session, action),
		login: login(state.login, action),
		chat: chat(state.chat, action),
		netInfo: netInfo(state.netInfo, action),
		quotes: quotes(state.quotes, action),
		users: users(state.users, action),
		clients: clients(state.clients, action),
		products: products(state.products, action),
		orders: orders(state.orders, action)
	};
}

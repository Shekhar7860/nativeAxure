import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers';
import {persistStore, persistReducer} from 'redux-persist';
import AsyncStorage from '@react-native-community/async-storage';

const persistConfig = {
	key: 'root',
	storage: AsyncStorage,
	whitelist: ['activity', 'session', 'brands', 'settings'],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const createAppStore = () => {
	let store = createStore(persistedReducer, applyMiddleware(thunk));
	let persistor = persistStore(store);

	return {store, persistor};
};

export default createAppStore;

import {init} from '@rematch/core';
import * as models from './models';
import AsyncStorage from '@react-native-community/async-storage';
import createRematchPersist from '@rematch/persist';

const persistPlugin = createRematchPersist({
  storage: AsyncStorage,
  version: 1,
});

const store = init({
  models,
  plugins: [persistPlugin],
});

export default store;

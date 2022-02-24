import { createStore } from 'redux';
import { persistStore, persistCombineReducers } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import combinedReducers from './reducers';

const persistConfig = {
  key: 'root',
  storage,
};

const persistedReducer = persistCombineReducers(
  persistConfig,
  combinedReducers,
);
const store = createStore(persistedReducer);
const persistor = persistStore(store);

export { store, persistor };

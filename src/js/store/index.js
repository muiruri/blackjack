import { createStore, applyMiddleware } from 'redux'
import {
  persistStore, persistReducer,
  persistCombineReducers, autoRehydrate
} from 'redux-persist'
import reducer from '../reducers'
import thunk from 'redux-thunk'
import { storeMiddleWare } from '../middleware/store'

import autoMergeLevel1 from 'redux-persist/lib/stateReconciler/autoMergeLevel1'

import storage from 'redux-persist/lib/storage'

const config = {
  key: 'reducer',
  storage: storage,
  debug: true,
  stateReconciler: autoMergeLevel1
};

const reducers = persistCombineReducers(config, {
    reducer
});

const stores = (state) => {
  const store = createStore(reducers, state, applyMiddleware(thunk, storeMiddleWare))
  const persistor = persistStore(store);

  return { persistor, store };
  //return createStore(reducer, state, applyMiddleware(thunk, storeMiddleWare))
}

export default stores

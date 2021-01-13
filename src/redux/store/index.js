import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import { persistReducer, persistStore } from "redux-persist";
import _ from "lodash";
import thunkMiddleware from "redux-thunk";
import reducers from "./reducers";
import storage from "redux-persist/lib/storage";
import getLanguage from "src/presentation/helpers/GetLanguage";

let store;

const initialState = {
  languaje: getLanguage(),
};

const createNoopStorage = () => {
  return {
    getItem(_key) {
      return Promise.resolve(null);
    },
    setItem(_key, value) {
      return Promise.resolve(value);
    },
    removeItem(_key) {
      return Promise.resolve();
    },
  };
};

/*const storage =
  typeof window !== "undefined"
    ? createWebStorage("local")
    : createNoopStorage();*/

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["cart", "centers", "catalogs", "providers", "userId", ]
};

const persistedReducer = persistReducer(persistConfig, reducers);

function makeStore() {
  return createStore(
    persistedReducer,
    initialState,
    composeWithDevTools(applyMiddleware(thunkMiddleware))
  );
}

export default store = makeStore();

export const persistor = persistStore(store, {}, () => persistor.persist());

/*import _ from 'lodash'

import { createStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunkMiddleware from 'redux-thunk'
import reducers from './reducers'


let store: any = undefined;

function initStore(initialState: any) {

  const store: any = createStore(
    reducers,
    initialState,
    composeWithDevTools(applyMiddleware(thunkMiddleware))
  )

  return store;
}

export const initializeStore = (preloadedState: any) => {

  let _store = store ?? initStore(preloadedState)

  // After navigating to a page with an initial Redux state, merge that state
  // with the current state in the store, and create a new store
  if (preloadedState && store) {
    _store = initStore({
      ...store.getState(),
      ...preloadedState,
    })
    // Reset the current store
    store = undefined
  }

  // For SSG and SSR always create a new store
  if (typeof window === 'undefined') return _store
  // Create the store once in the client
  if (!store) store = _store

  return _store

}

export default function useStore(initialState: any = undefined) {
  const store = initializeStore(initialState)
  return store
}
*/

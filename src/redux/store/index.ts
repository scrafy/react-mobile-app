import _, { throttle } from 'lodash'
import { useMemo } from 'react'
import { createStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunkMiddleware from 'redux-thunk'
import { ILocalStorageService } from 'src/infraestructure/interfaces'
import { UnitOfWorkService } from 'src/infraestructure/unitsofwork'
import reducers from './reducers'


let store: any = undefined;

function initStore(initialState: any) {
  const store: any = createStore(
    reducers,
    initialState,
    composeWithDevTools(applyMiddleware(thunkMiddleware))
  )

  store.subscribe(throttle(() => {

    const service: ILocalStorageService = new UnitOfWorkService().getLocalStorageService();
    const state: any = _.cloneDeep(store.getState());
    delete state.languaje;
    service.saveState(state);

  }, 1000));

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


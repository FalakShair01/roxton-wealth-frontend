// store.ts
import { configureStore, combineReducers } from '@reduxjs/toolkit';
import auth from './slices/auth';

import {
  persistReducer,
  persistStore,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER
} from 'redux-persist';

// Use a no-op storage on the server to avoid "window is not defined"
const createNoopStorage = () => ({
  getItem: async () => null,
  setItem: async () => {},
  removeItem: async () => {}
});

// Use localStorage only in the browser
const storage =
  typeof window !== 'undefined'
    ? (await import('redux-persist/lib/storage')).default
    : createNoopStorage();

const rootReducer = combineReducers({
  auth
  // ...other slices
});

// Persist only what you need
const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['auth']
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const makeStore = () =>
  configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: {
          // Ignore redux-persist actions
          ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]
        }
      })
  });

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = ReturnType<AppStore['dispatch']>;

// Create store + persistor singletons for CSR usage
export const store = makeStore();
export const persistor = persistStore(store);

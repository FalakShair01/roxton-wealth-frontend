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

// No-op storage for SSR (avoids "window is not defined")
const createNoopStorage = () => ({
  getItem: async () => null as unknown as string | null,
  setItem: async () => {},
  removeItem: async () => {}
});

// Use localStorage only in the browser
function getStorage() {
  if (typeof window === 'undefined') return createNoopStorage();
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const createWebStorage = require('redux-persist/lib/storage/createWebStorage')
    .default as (type: 'local' | 'session') => Storage;
  return createWebStorage('local');
}

const storage = getStorage();

const rootReducer = combineReducers({
  auth
  // ...other slices
});

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
          ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]
        }
      })
  });

// ---- Types
export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<typeof rootReducer>;
// ⬇️ Use makeStore to derive the dispatch type (works for SSR too)
export type AppDispatch = ReturnType<typeof makeStore>['dispatch'];

// ---- CSR singletons (OK for App Router pages/components)
export const store = makeStore();
export const persistor = persistStore(store);

'use client';

import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from '@/store';

export default function ReduxProvider({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <Provider store={store}>
      {/* PersistGate must run on client */}
      <PersistGate loading={null} persistor={persistor}>
        {children}
      </PersistGate>
    </Provider>
  );
}

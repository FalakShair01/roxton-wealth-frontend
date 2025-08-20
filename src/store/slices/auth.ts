// src/store/authSlice.ts
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';

/** ─── Local “DB” & session helpers (VERY basic; demo only) ─── */
export type StoredUser = {
  id: string;
  email: string;
  passwordHash: string;
  imageUrl?: string;
  fullName?: string | null;
  createdAt: number;
};
const USERS_KEY = 'app_users';
const SESSION_KEY = 'userId';
// super-light obfuscation (NOT secure)
const hash = (s: string) =>
  typeof window === 'undefined'
    ? s
    : window.btoa(unescape(encodeURIComponent(s)));

const loadUsers = (): StoredUser[] => {
  if (typeof window === 'undefined') return [];
  try {
    return JSON.parse(localStorage.getItem(USERS_KEY) || '[]') as StoredUser[];
  } catch {
    return [];
  }
};
const saveUsers = (users: StoredUser[]) =>
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
const setSession = (id: string) => localStorage.setItem(SESSION_KEY, id);
const clearSession = () => localStorage.removeItem(SESSION_KEY);
const getSession = (): string | null =>
  typeof window === 'undefined' ? null : localStorage.getItem(SESSION_KEY);

/** ─── State ─── */
type AuthState = {
  userId: string | null;
  user: StoredUser | null;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error?: string;
  isLoaded: boolean; // hydrated from localStorage
};

const initialState: AuthState = {
  userId: null,
  user: null,
  status: 'idle',
  error: undefined,
  isLoaded: false
};

/** ─── Thunks ─── */
export const hydrateAuth = createAsyncThunk('auth/hydrate', async () => {
  const id = getSession();
  if (!id)
    return { userId: null as string | null, user: null as StoredUser | null };
  const users = loadUsers();
  return { userId: id, user: users.find((u) => u.id === id) || null };
});

export const signUp = createAsyncThunk<
  { userId: string; user: StoredUser },
  { email: string; password: string },
  { rejectValue: string }
>('auth/signUp', async ({ email, password }, { rejectWithValue }) => {
  const users = loadUsers();
  if (users.some((u) => u.email.toLowerCase() === email.toLowerCase())) {
    return rejectWithValue('Email already registered');
  }
  const user: StoredUser = {
    id: crypto.randomUUID(),
    email,
    passwordHash: hash(password),
    createdAt: Date.now()
  };
  saveUsers([...users, user]);
  setSession(user.id);
  return { userId: user.id, user };
});

export const signIn = createAsyncThunk<
  { userId: string; user: StoredUser },
  { email: string; password: string },
  { rejectValue: string }
>('auth/signIn', async ({ email, password }, { rejectWithValue }) => {
  console.log('Attempting sign-in with:', { email, password });
  const users = loadUsers();
  const user = users.find((u) => u.email.toLowerCase() === email.toLowerCase());
  if (!user || user.passwordHash !== hash(password)) {
    return rejectWithValue('Invalid email or password');
  }
  console.log('User found:', user);
  setSession(user.id);
  return { userId: user.id, user };
});

export const signOut = createAsyncThunk('auth/signOut', async () => {
  clearSession();
});

/** ─── Slice ─── */
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    // optional manual set if needed
    setAuth(
      state,
      action: PayloadAction<{ userId: string | null; user: StoredUser | null }>
    ) {
      state.userId = action.payload.userId;
      state.user = action.payload.user;
    }
  },
  extraReducers: (builder) => {
    builder
      // hydrate
      .addCase(hydrateAuth.pending, (s) => {
        s.status = 'loading';
        s.error = undefined;
      })
      .addCase(hydrateAuth.fulfilled, (s, a) => {
        s.status = 'succeeded';
        s.isLoaded = true;
        s.userId = a.payload.userId;
        s.user = a.payload.user;
      })
      .addCase(hydrateAuth.rejected, (s) => {
        s.status = 'failed';
        s.isLoaded = true;
      })

      // signup
      .addCase(signUp.pending, (s) => {
        s.status = 'loading';
        s.error = undefined;
      })
      .addCase(signUp.fulfilled, (s, a) => {
        s.status = 'succeeded';
        s.userId = a.payload.userId;
        s.user = a.payload.user;
      })
      .addCase(signUp.rejected, (s, a) => {
        s.status = 'failed';
        s.error = a.payload || 'Registration failed';
      })

      // signin
      .addCase(signIn.pending, (s) => {
        s.status = 'loading';
        s.error = undefined;
      })
      .addCase(signIn.fulfilled, (s, a) => {
        s.status = 'succeeded';
        s.userId = a.payload.userId;
        s.user = a.payload.user;
      })
      .addCase(signIn.rejected, (s, a) => {
        s.status = 'failed';
        s.error = a.payload || 'Login failed';
      })

      // signout
      .addCase(signOut.fulfilled, (s) => {
        s.userId = null;
        s.user = null;
        s.status = 'idle';
      });
  }
});

export const { setAuth } = authSlice.actions;
export default authSlice.reducer;

/** ─── Selectors ─── */
export const selectAuth = (state: { auth: AuthState }) => state.auth;
export const selectIsSignedIn = (state: { auth: AuthState }) =>
  !!state.auth.userId;
export const selectAuthLoaded = (state: { auth: AuthState }) =>
  state.auth.isLoaded;
export const selectAuthStatus = (state: { auth: AuthState }) =>
  state.auth.status;
export const selectAuthError = (state: { auth: AuthState }) => state.auth.error;

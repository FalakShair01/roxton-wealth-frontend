'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';

// --- very light-weight hashing to avoid plain text in storage (NOT for prod)
const hash = (s: string) =>
  typeof window === 'undefined' ? s : btoa(unescape(encodeURIComponent(s)));

type StoredUser = {
  id: string;
  email: string;
  passwordHash: string;
  createdAt: number;
};

const USERS_KEY = 'app_users';
const SESSION_KEY = 'userId';

function loadUsers(): StoredUser[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(USERS_KEY);
    return raw ? (JSON.parse(raw) as StoredUser[]) : [];
  } catch {
    return [];
  }
}

function saveUsers(users: StoredUser[]) {
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
}

function setSession(userId: string) {
  localStorage.setItem(SESSION_KEY, userId);
}

export function useLocalAuth() {
  const [currentUser, setCurrentUser] = useState<StoredUser | null>(null);
  const [userId, setUserId] = useState<string | null>(null);
  const [isLoaded, setIsLoaded] = useState(true);
  const [pending, setPending] = useState(false);

  // Load auth state from localStorage
  // useEffect(() => {
  //   const stored = localStorage.getItem('userId');
  //   if (stored) {
  //     console.log('Restoring userId from localStorage:', stored);
  //     setUserId(stored);
  //   }
  //   setIsLoaded(true);
  // }, []);

  const auth = useCallback(() => {
    const stored = localStorage.getItem('userId');
    if (stored) {
      console.log('Restoring userId from localStorage:', stored);
      setUserId(stored);
      return { userId: stored };
    }
    // setIsLoaded(true);
    return { userId: null };
  }, []);

  const isSignedIn = !!currentUser;

  const signUp = useMemo(
    () => ({
      /**
       * Mimics Clerk's signUp.create
       * Returns { status: 'complete', createdSessionId: string } on success
       */
      create: async ({
        email,
        password
      }: {
        email: string;
        password: string;
      }) => {
        setPending(true);
        await new Promise((r) => setTimeout(r, 250)); // small UX delay
        try {
          const users = loadUsers();
          console.log('Available Users:', users);
          const exists = users.some(
            (u) => u.email.toLowerCase() === email.toLowerCase()
          );
          if (exists) {
            const err = new Error('Email already registered') as any;
            err.errors = [{ message: 'Email already registered' }];
            throw err;
          }

          const user: StoredUser = {
            id: crypto.randomUUID(),
            email,
            passwordHash: hash(password),
            createdAt: Date.now()
          };

          saveUsers([...users, user]);

          // mimic Clerk: create a "session id" = user id
          return { status: 'complete' as const, createdSessionId: user.id };
        } finally {
          setPending(false);
        }
      }
    }),
    []
  );

  const setActive = useCallback(async ({ session }: { session: string }) => {
    setSession(session);
    setUserId(session);
  }, []);

  const signIn = useCallback(
    async ({ email, password }: { email: string; password: string }) => {
      const users = loadUsers();
      console.log('Available Users:', users);
      const user = users.find(
        (u) => u.email.toLowerCase() === email.toLowerCase()
      );
      if (!user || user.passwordHash !== hash(password)) {
        throw Object.assign(new Error('Invalid credentials'), {
          errors: [{ message: 'Invalid email or password' }]
        });
      }
      setCurrentUser(user);
      setSession(user.id);
      setUserId(user.id);
      return { status: 'complete' as const, createdSessionId: user.id };
    },
    []
  );

  const signOut = useCallback(() => {
    localStorage.removeItem(SESSION_KEY);
    setUserId(null);
  }, []);

  const getCurrentUser = useCallback(() => {
    const id =
      typeof window !== 'undefined' ? localStorage.getItem(SESSION_KEY) : null;
    if (!id) return null;
    const users = loadUsers();
    return users.find((u) => u.id === id) ?? null;
  }, []);

  return {
    isSignedIn,
    signUp,
    signIn,
    signOut,
    getCurrentUser,
    auth,
    isLoaded,
    pending,
    setActive,
    userId
  };
}

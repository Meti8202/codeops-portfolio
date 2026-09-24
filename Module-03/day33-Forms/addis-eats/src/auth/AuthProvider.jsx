import { createContext, useEffect, useMemo, useState } from "react";

export const AuthContext = createContext(null);

const STORAGE_KEY = "addis-eats-user";

function getSavedUser() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : null;
  } catch {
    return null;
  }
}

function AuthProvider({ children }) {
  const [user, setUser] = useState(getSavedUser);

  useEffect(() => {
    try {
      if (user) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
      } else {
        localStorage.removeItem(STORAGE_KEY);
      }
    } catch {
      
    }
  }, [user]);

  function signIn({ name, phone }) {
    setUser({ name: name.trim(), phone: phone.trim() });
  }

  function register({ name, phone }) {
    setUser({ name: name.trim(), phone: phone.trim() });
  }

  function signOut() {
    setUser(null);
  }

  const value = useMemo(
    () => ({ user, signIn, register, signOut }),
    [user]
  );

  return (
    <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
  );
}

export default AuthProvider;
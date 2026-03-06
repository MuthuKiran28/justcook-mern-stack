import { createContext, useCallback, useEffect, useMemo, useState } from "react";
import axios from "axios";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [authLoading, setAuthLoading] = useState(true);

  const setTokenHeader = useCallback((token) => {
    if (token) {
      axios.defaults.headers.common.Authorization = `Bearer ${token}`;
    } else {
      delete axios.defaults.headers.common.Authorization;
    }
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem("token");
    setTokenHeader(null);
    setUser(null);
  }, [setTokenHeader]);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      setAuthLoading(false);
      return;
    }

    setTokenHeader(token);

    axios
      .get("/api/auth/me")
      .then((res) => {
        setUser(res.data);
      })
      .catch(() => {
        logout();
      })
      .finally(() => {
        setAuthLoading(false);
      });
  }, [logout, setTokenHeader]);

  const login = useCallback(
    async (email, password) => {
      const res = await axios.post("/api/auth/login", {
        email,
        password,
      });
      localStorage.setItem("token", res.data.token);
      setTokenHeader(res.data.token);
      setUser(res.data);
    },
    [setTokenHeader]
  );

  const register = useCallback(
    async (username, email, password) => {
      const res = await axios.post("/api/auth/register", {
        username,
        email,
        password,
      });
      localStorage.setItem("token", res.data.token);
      setTokenHeader(res.data.token);
      setUser(res.data);
    },
    [setTokenHeader]
  );

  const value = useMemo(
    () => ({
      user,
      authLoading,
      login,
      register,
      logout,
    }),
    [user, authLoading, login, register, logout]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

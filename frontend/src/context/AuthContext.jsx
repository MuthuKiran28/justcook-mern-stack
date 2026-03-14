<<<<<<< HEAD
import { createContext, useEffect, useState } from "react";
=======
import { createContext, useCallback, useEffect, useMemo, useState } from "react";
>>>>>>> de2c54712568ec9c477c5bbf1053bb72c9244c21
import axios from "axios";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
<<<<<<< HEAD

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

      axios.get("/api/auth/me").then((res) => {
        setUser(res.data);
      });
    }
  }, []);

  const login = async (email, password) => {
    const res = await axios.post("/api/auth/login", {
      email,
      password,
    });
    console.log(res.data);
    localStorage.setItem("token", res.data.token);
    axios.defaults.headers.common["Authorization"] = `Bearer ${res.data.token}`;
    setUser(res.data);
  };

  const register = async (username, email, password) => {
    const res = await axios.post("/api/auth/register", {
      username,
      email,
      password,
    });
    console.log(res.data);
    localStorage.setItem("token", res.data.token);
    axios.defaults.headers.common["Authorization"] = `Bearer ${res.data.token}`;
    setUser(res.data);
  };

  const logout = () => {
    localStorage.removeItem("token");
    delete axios.defaults.headers.common["Authorization"];
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
=======
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
>>>>>>> de2c54712568ec9c477c5bbf1053bb72c9244c21
};

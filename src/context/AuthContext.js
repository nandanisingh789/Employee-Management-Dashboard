import React, { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser]       = useState(null);
  const [token, setToken]     = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Clear any old session so login page always shows on fresh start
    localStorage.removeItem("jwt_token");
    localStorage.removeItem("user_data");
    setLoading(false);
  }, []);

  const login = async (username, password) => {
    const res = await fetch("https://dummyjson.com/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password, expiresInMins: 60 }),
    });
    if (!res.ok) throw new Error("Invalid credentials. Try: emilys / emilyspass");
    const data = await res.json();
    localStorage.setItem("jwt_token", data.accessToken);
    localStorage.setItem("user_data", JSON.stringify(data));
    setToken(data.accessToken);
    setUser(data);
    return data;
  };

  const logout = () => {
    localStorage.removeItem("jwt_token");
    localStorage.removeItem("user_data");
    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout, loading, isAuthenticated: !!token }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

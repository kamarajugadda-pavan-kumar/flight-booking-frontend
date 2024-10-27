import React, { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { fetchUserProfile } from "../services/userService";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/signin");
      return;
    }
    fetchProfile(token);
  }, []);

  const fetchProfile = async (token) => {
    try {
      let user = await fetchUserProfile(token);
      setUser(user);
      if (window.location.pathname == "/signin") {
        navigate("/dashboard");
        return;
      }
      navigate(`${window.location.pathname}${window.location.search}`);
    } catch (error) {
      if (window.location.pathname == "/signup") {
        navigate("/signup");
        return;
      }
      navigate("/signin");
    } finally {
      setLoading(false);
    }
  };

  const signin = (userData) => {
    setUser(userData);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("token");
  };

  return (
    <UserContext.Provider
      value={{ user, signin, logout, loading, fetchProfile }}
    >
      {children}
    </UserContext.Provider>
  );
};

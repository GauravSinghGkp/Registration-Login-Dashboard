import React, { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [authError, setAuthError] = useState();
  const navigate = useNavigate();

  // Effect to check if a user is stored in localStorage on component mount
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) {
      setUser(storedUser);
    }
  }, []);

  const registerUser = (userData) => {
    // Get all registered users
    const users = JSON.parse(localStorage.getItem("users")) || [];

    // checking is user already exists if exist set error and return
    const userExists = users.some(
      (user) => user.username === userData.username
    );
    if (userExists) {
      setAuthError("User already exists");
      return;
    }

    // if not exists add user into localStorage and login
    users.push(userData);
    localStorage.setItem("users", JSON.stringify(users));
    login(userData); // login
  };

  const login = (userData) => {
    // get all users
    const users = JSON.parse(localStorage.getItem("users")) || [];
    // find user
    const user = users.find(
      (user) =>
        user.username === userData.username &&
        user.password === userData.password
    );
    // if user exists set User
    if (user) {
      setUser(user);
      localStorage.setItem("user", JSON.stringify(user));
      navigate(""); // Navigate to dashboard
      setAuthError("");
      return;
    }
    setAuthError("Invalid credentials");
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <AuthContext.Provider
      value={{ user, registerUser, login, logout, authError, setAuthError }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;

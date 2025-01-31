import { createContext, useState, useContext, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const user = localStorage.getItem("user");
    return user ? JSON.parse(user) : null;
  }); // Holds the user info

  // Load user from localStorage when the app starts
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) {
      setUser(storedUser);
    }
  }, []);

  // Function to log in a user
  const login = (userData) => {
    localStorage.setItem("user", JSON.stringify(userData)); // Save user in local storage
    setUser(userData); // Update state
  };

  // Function to log out a user
  const logout = () => {
    localStorage.removeItem("user"); // Remove user from local storage
    setUser(null); // Clear state
    localStorage.clear();
  };

  return (
    <AuthContext.Provider value={{ user, setUser, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

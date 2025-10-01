import { useState } from "react";

export default function useAuth() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem("user");
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const login = async (email, password) => {
    setLoading(true);
    setError(null);

    try {
      await new Promise((res) => setTimeout(res, 1000));

      if (
        (email === "admin@example.com" && password === "password") ||
        (email === "admin@gmail.com" && password === "admin123")
      ) {
        const loggedInUser = {
          id: 2,
          name: "Admin User",
          role: "admin",
          token: "mock-jwt-token-admin",
        };
        setUser(loggedInUser);
        localStorage.setItem("user", JSON.stringify(loggedInUser));
      } else if (email === "student@example.com" && password === "student123") {
        const loggedInUser = {
          id: 3,
          name: "Student User",
          role: "student",
          token: "mock-jwt-token-student",
        };
        setUser(loggedInUser);
        localStorage.setItem("user", JSON.stringify(loggedInUser));
      } else {
        throw new Error("Invalid credentials");
      }
    } catch (err) {
      setError(err.message);
      setUser(null);
      localStorage.removeItem("user");
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  return { user, loading, error, login, logout };
}

// AuthContext.tsx
import { createContext, useState, useEffect, ReactNode } from "react";

interface User {
  username: string;
  role: "Publicador" | "Administrador";
}

interface AuthContextType {
  user: User | null;
  login: (username: string, role: "Publicador" | "Administrador") => void;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType | null>(null);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(() => {
    return JSON.parse(localStorage.getItem("user") || "null");
  });

  const login = (username: string, role: "Publicador" | "Administrador") => {
    const newUser = { username, role };
    setUser(newUser);
    localStorage.setItem("user", JSON.stringify(newUser));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

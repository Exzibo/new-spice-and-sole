import React, { createContext, useContext, useState, useEffect } from 'react';
import { User } from '../types/admin';

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  signup: (name: string, email: string, password: string, role: 'Admin' | 'Staff') => Promise<boolean>;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(() => {
    const savedUser = localStorage.getItem('admin_user');
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const login = async (email: string, password: string): Promise<boolean> => {
    const users: User[] = JSON.parse(localStorage.getItem('admin_users') || '[]');
    const foundUser = users.find(u => u.email === email && u.password === password);
    
    if (foundUser) {
      const { password: _, ...userWithoutPassword } = foundUser;
      setUser(userWithoutPassword as User);
      localStorage.setItem('admin_user', JSON.stringify(userWithoutPassword));
      return true;
    }
    return false;
  };

  const signup = async (name: string, email: string, password: string, role: 'Admin' | 'Staff'): Promise<boolean> => {
    const users: User[] = JSON.parse(localStorage.getItem('admin_users') || '[]');
    if (users.find(u => u.email === email)) return false;

    const newUser: User = { id: Date.now().toString(), name, email, password, role };
    users.push(newUser);
    localStorage.setItem('admin_users', JSON.stringify(users));
    return true;
  };

  // Seed default user
  useEffect(() => {
    const users = JSON.parse(localStorage.getItem('admin_users') || '[]');
    if (users.length === 0) {
      signup('Admin User', 'admin', 'Admin@429', 'Admin');
    }
  }, []);

  const logout = () => {
    setUser(null);
    localStorage.removeItem('admin_user');
  };

  return (
    <AuthContext.Provider value={{ user, login, signup, logout, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an AuthProvider');
  return context;
};

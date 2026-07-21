import React, { createContext, useContext, useState } from 'react';

type AuthContextType = {
  phone: string;
  setPhone: (v: string) => void;
};

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: any) => {
  const [phone, setPhone] = useState('');

  return (
    <AuthContext.Provider value={{ phone, setPhone }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used inside AuthProvider');
  return ctx;
};

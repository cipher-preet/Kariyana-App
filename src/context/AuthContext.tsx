import React, { createContext, useContext, useState } from 'react';

type AuthContextType = {
  phone: string;
  setPhone: (v: string) => void;
  confirmation: any;
  setConfirmation: (v: any) => void;
};

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: any) => {
  const [confirmation, setConfirmation] = useState<any>(null);
  const [phone, setPhone] = useState('');

  return (
    <AuthContext.Provider
      value={{ phone, setPhone, confirmation, setConfirmation }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used inside AuthProvider');
  return ctx;
};

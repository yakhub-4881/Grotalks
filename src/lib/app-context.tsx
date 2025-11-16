import React, { createContext, useContext, useState, ReactNode } from 'react';

export type VersionMode = 'mvp' | 'universal';
export type UserType = 'mentor' | 'mentee' | null; // 'mentee' internally, displayed as 'Student'

interface AppState {
  versionMode: VersionMode;
  setVersionMode: (mode: VersionMode) => void;
  userType: UserType;
  setUserType: (type: UserType) => void;
  isAuthenticated: boolean;
  setIsAuthenticated: (auth: boolean) => void;
  walletBalance: number;
  setWalletBalance: (balance: number) => void;
  selectedCollege: string;
  setSelectedCollege: (college: string) => void;
}

const AppContext = createContext<AppState | undefined>(undefined);

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [versionMode, setVersionMode] = useState<VersionMode>('mvp');
  const [userType, setUserType] = useState<UserType>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [walletBalance, setWalletBalance] = useState(100); // FREE ₹100 bonus
  const [selectedCollege, setSelectedCollege] = useState(
    'Vel Tech Rangarajan Dr. Sagunthala R & D Institute of Science & Technology'
  );

  return (
    <AppContext.Provider
      value={{
        versionMode,
        setVersionMode,
        userType,
        setUserType,
        isAuthenticated,
        setIsAuthenticated,
        walletBalance,
        setWalletBalance,
        selectedCollege,
        setSelectedCollege,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within AppProvider');
  }
  return context;
};

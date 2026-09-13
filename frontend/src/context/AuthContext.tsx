import React, { createContext, useContext, useState, useEffect } from 'react';

export interface User {
  user_id: string;
  name: string;
  age: number;
  gender: string;
  date_of_birth: string;
  region: string;
  preferred_language: string;
  dementia_stage?: string;
  role: 'elderly' | 'caregiver' | 'admin';
}

interface AuthContextType {
  user: User | null;
  role: 'elderly' | 'caregiver' | 'admin' | null;
  isAuthenticated: boolean;
  loginElderly: (name: string, dob: string) => Promise<boolean>;
  loginCaregiver: (email: string, pass: string) => Promise<boolean>;
  loginAdmin: () => Promise<boolean>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(() => {
    const saved = localStorage.getItem('neuronest_user');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        return null;
      }
    }
    // Default initial demo state is Anita Sharma for smooth immediate access
    return {
      user_id: 'user-anita-01',
      name: 'Anita Sharma',
      age: 72,
      gender: 'Female',
      date_of_birth: '15/08/1954',
      region: 'Assam',
      preferred_language: 'en',
      dementia_stage: 'Mild Cognitive Impairment (Caregiver noted)',
      role: 'elderly'
    };
  });

  const [role, setRole] = useState<'elderly' | 'caregiver' | 'admin' | null>(() => {
    return user ? user.role : 'elderly';
  });

  useEffect(() => {
    if (user) {
      localStorage.setItem('neuronest_user', JSON.stringify(user));
      setRole(user.role);
    } else {
      localStorage.removeItem('neuronest_user');
      setRole(null);
    }
  }, [user]);

  const loginElderly = async (name: string, dob: string): Promise<boolean> => {
    try {
      const res = await fetch('/api/auth/elderly-login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, date_of_birth: dob })
      });
      if (res.ok) {
        const data = await res.json();
        const u: User = {
          ...data.user,
          role: 'elderly'
        };
        setUser(u);
        return true;
      }
    } catch (e) {
      console.warn('Backend unavailable, using local mock auth');
    }
    // Local fallback for robust demo
    const u: User = {
      user_id: 'user-anita-01',
      name: name.trim() || 'Anita Sharma',
      age: 72,
      gender: 'Female',
      date_of_birth: dob || '15/08/1954',
      region: 'Assam',
      preferred_language: 'en',
      role: 'elderly'
    };
    setUser(u);
    return true;
  };

  const loginCaregiver = async (email: string, pass: string): Promise<boolean> => {
    try {
      const res = await fetch('/api/auth/caregiver-login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password: pass })
      });
      if (res.ok) {
        const data = await res.json();
        const u: User = {
          user_id: 'user-anita-01',
          name: data.caregiver?.name || 'Priya Sharma (Caregiver)',
          age: 42,
          gender: 'Female',
          date_of_birth: '12/04/1984',
          region: 'Assam',
          preferred_language: 'en',
          role: 'caregiver'
        };
        setUser(u);
        return true;
      }
    } catch (e) {
      console.warn('Backend unavailable, using local fallback');
    }
    const u: User = {
      user_id: 'user-anita-01',
      name: 'Priya Sharma (Caregiver)',
      age: 42,
      gender: 'Female',
      date_of_birth: '12/04/1984',
      region: 'Assam',
      preferred_language: 'en',
      role: 'caregiver'
    };
    setUser(u);
    return true;
  };

  const loginAdmin = async (): Promise<boolean> => {
    const u: User = {
      user_id: 'admin-01',
      name: 'Dr. Barua (Clinical Admin)',
      age: 48,
      gender: 'Male',
      date_of_birth: '01/01/1976',
      region: 'North Eastern Region (NER)',
      preferred_language: 'en',
      role: 'admin'
    };
    setUser(u);
    return true;
  };

  const logout = () => {
    setUser(null);
    setRole(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        role,
        isAuthenticated: !!user,
        loginElderly,
        loginCaregiver,
        loginAdmin,
        logout
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

import React, { createContext, useCallback, useContext, useEffect, useState } from 'react';
import type { StudentProfileDto } from '@eyb/shared';
import { portalApi, ApiError } from './client';

interface StudentAuthState {
  student: StudentProfileDto | null;
  loading: boolean;
  login: (username: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  refresh: () => Promise<void>;
}

const StudentAuthContext = createContext<StudentAuthState | null>(null);

export const StudentAuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [student, setStudent] = useState<StudentProfileDto | null>(null);
  const [loading, setLoading] = useState(true);

  const refresh = useCallback(async () => {
    try {
      const { student } = await portalApi.me();
      setStudent(student);
    } catch (err) {
      if (!(err instanceof ApiError && err.status === 401)) console.error(err);
      setStudent(null);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void refresh();
  }, [refresh]);

  const login = useCallback(async (username: string, password: string) => {
    const { student } = await portalApi.login(username, password);
    setStudent(student);
  }, []);

  const logout = useCallback(async () => {
    await portalApi.logout();
    setStudent(null);
  }, []);

  return (
    <StudentAuthContext.Provider value={{ student, loading, login, logout, refresh }}>
      {children}
    </StudentAuthContext.Provider>
  );
};

export function useStudentAuth(): StudentAuthState {
  const ctx = useContext(StudentAuthContext);
  if (!ctx) throw new Error('useStudentAuth must be used within StudentAuthProvider');
  return ctx;
}

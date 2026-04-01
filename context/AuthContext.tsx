'use client'

import React, { createContext, useContext, useState, useEffect } from 'react'
import { login as apiLogin, logout as apiLogout } from '@/app/api/user';

type User = {
  id: number
  nickname: string
  email: string
  isAuthenticated: boolean
} | null

type AuthContextType = {
  user: User
  setUser: React.Dispatch<React.SetStateAction<User>>
  login: (loginFormValue: LoginCredentials) => Promise<void>
  logout: () => Promise<void>
  isLoading: boolean
}

interface LoginCredentials {
  email: string;
  password: string;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const loadUser = async () => {
      const storedUser = localStorage.getItem('user')
      if (storedUser) {
        try {
          const parsedUser = JSON.parse(storedUser);
          if (typeof parsedUser === 'object' && parsedUser !== null &&
              'id' in parsedUser && 'email' in parsedUser && 'nickname' in parsedUser) {
            setUser(parsedUser as User);
          }
        } catch (error) {
          console.error('Error parsing stored user data:', error);
        }
      }
      setIsLoading(false)
    }

    loadUser()
  }, [])

  const login = async (loginFormValue: LoginCredentials) => {
    try {
      const userData = await apiLogin(loginFormValue);
      const user = { id: userData.id, email: userData.email, nickname: userData.nickname, isAuthenticated: true };
      setUser(user);
      localStorage.setItem('user', JSON.stringify(user));
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  }

  const logout = async () => {
    try {
      await apiLogout();
      setUser(null);
      localStorage.removeItem('user');
    } catch (error) {
      console.error('Logout error:', error);
      throw error;
    }
  };

  return (
    <AuthContext.Provider value={{ user, setUser, login, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
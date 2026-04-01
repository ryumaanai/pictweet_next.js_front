'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';

interface AuthGuardProps {
  children: React.ReactNode;
}

const AuthGuard = ({ children }: AuthGuardProps) => {
  const { user, isLoading } = useAuth();
  const router = useRouter();

  // 認証チェックとリダイレクト
  useEffect(() => {
    if (!isLoading && !user) {
      router.push('/users/login'); // ログインしていない場合はトップページにリダイレクト
    }
  }, [isLoading]);

  if (!user) {
    return null;
  }

  return <> {children} </>;
};

export default AuthGuard;

'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import LoginForm from '@/app/_components/LoginForm';
interface LoginCredentials {
  email: string;
  password: string;
}

const LoginPage = () => {
  const router = useRouter();
  const [loginError, setLoginError] = useState<string>('');
  const { login } = useAuth();

  const handleLogin = async (data: LoginCredentials) => {
    try {
      await login(data);
      router.push('/');
    } catch (error) {
      setLoginError('ログインに失敗しました');
    }
  };

  return (
    <>
      <div className="contents row">
        <div className="container">
          <h2>Log in</h2>
          {loginError && <p className="login-error">{loginError}</p>}
          <LoginForm onLogin={handleLogin} />
        </div>
      </div>
    </>
  );
};

export default LoginPage;

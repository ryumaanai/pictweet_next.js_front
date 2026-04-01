'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';

interface LoginCredentials {
  email: string;
  password: string;
}

type LoginFormProps = {
  onLogin: (data: LoginCredentials) => Promise<void>;
};

const LoginForm: React.FC<LoginFormProps> = ({ onLogin }) => {
  const { register, handleSubmit, formState: { errors } } = useForm<LoginCredentials>();

  const onSubmit = async (data: LoginCredentials) => {
    await onLogin(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="new_user">
      <div className="field">
        <label className="column-title">Email</label><br />
        <input
          type="email"
          {...register('email', { required: 'メールアドレスは必須です', pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: '無効なメールアドレスです' } })}
        />
        {errors.email && <p className="error-message">{errors.email.message as string}</p>}
      </div>
      <div className="field">
        <label className="password">Password</label><br />
        <input
          type="password"
          {...register('password', { required: 'パスワードは必須です', minLength: { value: 6, message: 'パスワードは6文字以上である必要があります' } })}
        />
        {errors.password && <p className="error-message">{errors.password.message as string}</p>}
      </div>
      <div className="actions">
        <input type="submit" value="Log in" />
      </div>
    </form>
  );
};

export default LoginForm;

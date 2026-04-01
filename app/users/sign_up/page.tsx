'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { signUp } from '@/app/api/user';
import SignUpForm from '@/app/_components/SignUpForm';

interface SignUpFormInterface {
  nickname: string;
  email: string;
  password: string;
  passwordConfirmation: string;
}

const SignUpPage = () => {
  const router = useRouter();
  const [errorMessages, setErrorMessages] = useState<string[]>([]);

  const handleSubmit = async (data: SignUpFormInterface) => {
    try {
      await signUp(data);
      router.push('/');
    } catch (error) {
      setErrorMessages([error instanceof Error ? error.message : 'エラーが発生しました']);
    }
  };

  return (
    <>
      <div className="contents row">
        <div className="container">
          <h2>Sign up</h2>
          {errorMessages.map((error, index) => (
            <div key={index} className="error-message">{error}</div>
          ))}
          <SignUpForm
            onSubmit={handleSubmit}
          />
        </div>
      </div>
    </>
  );
};

export default SignUpPage;

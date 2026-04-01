'use client';

import { useForm } from 'react-hook-form';

interface SignUpForm {
  nickname: string;
  email: string;
  password: string;
  passwordConfirmation: string;
}

interface SignUpFormProps {
  onSubmit: (data: SignUpForm) => Promise<void>;
}

const SignUpForm = ({ onSubmit }: SignUpFormProps) => {
  const { register, handleSubmit, formState: { errors }, watch } = useForm<SignUpForm>();

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="new_user">
      <div className="field">
        <label>Nickname</label><em>(6 characters maximum)</em><br />
        <input
          type="text"
          {...register('nickname', {
            required: 'ニックネームは必須です',
            maxLength: {
              value: 6,
              message: 'ニックネームは長すぎます（最大6文字までです）',
            }
          })}
        />
        {/* エラーメッセージの表示 */}
        {errors.nickname && <p className="error-message">{errors.nickname.message}</p>}
      </div>

      <div className="field">
        <label>Email</label><br />
        <input
          type="email"
          {...register('email', {
            required: 'メールアドレスは必須です',
            pattern: {
              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              message: '無効なメールアドレスです',
            }
          })}
        />
        {/* エラーメッセージの表示 */}
        {errors.email && <p className="error-message">{errors.email.message}</p>}
      </div>

      <div className="field">
        <label>Password</label><em>(6 characters minimum)</em><br />
        <input
          type="password"
          {...register('password', {
            required: 'パスワードは必須です',
            minLength: {
              value: 6,
              message: 'パスワードは6文字以上である必要があります',
            },
            maxLength: {
              value: 128,
              message: 'パスワードは128文字以内である必要があります',
            }
          })}
        />
        {/* エラーメッセージの表示 */}
        {errors.password && <p className="error-message">{errors.password.message}</p>}
      </div>

      <div className="field">
        <label>Password confirmation</label><br />
        <input
          type="password"
          {...register('passwordConfirmation', {
            required: '確認用パスワードは必須です',
            validate: (value: string) =>
              value === watch('password') || '確認用パスワードがパスワードと一致しません',
          })}
        />
        {/* エラーメッセージの表示 */}
        {errors.passwordConfirmation && <p className="error-message">{errors.passwordConfirmation.message}</p>}
      </div>

      <div className="actions">
        <input type="submit" value="Sign up" />
      </div>
    </form>
  );
};

export default SignUpForm;

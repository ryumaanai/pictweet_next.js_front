import axios from 'axios';
import qs from 'qs';
import { TweetData } from '../_interfaces/TweetData';
import { User } from '../_interfaces/UserData';
import api from './api';

interface LoginCredentials {
  email: string;
  password: string;
}

interface SignUpForm {
  nickname: string;
  email: string;
  password: string;
  passwordConfirmation: string;
}

interface UserResponse {
  id: number;
  nickname: string;
  email: string;
}

interface UserTweetsResponse {
  tweets: TweetData[];
  user: User;
}

export const login = async (credentials: LoginCredentials): Promise<UserResponse> => {
  try {
    const response = await api.post<UserResponse & { token: string }>('/login', qs.stringify({
      email: credentials.email,
      password: credentials.password,
    }), {
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
    });

    const token = response.data.token; // JWTを取得
    localStorage.setItem('token', token); // JWTをlocalStorageに保存

    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error('Login error:', error.response?.data);
      throw new Error(error.response?.data?.message || 'ログインに失敗しました');
    }
    throw error;
  }
};


export const logout = async (): Promise<void> => {
  try {
    await api.post('/logout', null);
    localStorage.removeItem('token'); // JWTを削除
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error('Logout error:', error.response?.data);
      throw new Error('ログアウトに失敗しました');
    }
    throw error;
  }
};

export const signUp = async (formData: SignUpForm): Promise<UserResponse> => {
  try {
    const response = await api.post<UserResponse>('/user', formData);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error('Sign up error:', error.response?.data);
      const messages = error.response?.data?.messages;
      throw new Error(messages ? messages.join(', ') : '登録に失敗しました');
    }
    throw error;
  }
};

export const findUserTweets = async (userId: number): Promise<UserTweetsResponse> => {
  try {
    const response = await api.get<UserTweetsResponse>(`/users/${userId}`);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error('APIリクエストエラー:', error.response?.data);
      throw new Error('ツイートの取得に失敗しました');
    }
    throw error;
  }
};
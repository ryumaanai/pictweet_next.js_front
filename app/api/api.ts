// api.js
import axios from 'axios';

// 共通のaxiosインスタンスを作成
const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080/api',
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});


// JWTトークンをAuthorizationヘッダーに追加するインターセプター
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token'); // ローカルストレージからトークンを取得する
  if (token) {
    config.headers.Authorization = `Bearer ${token}`; // JWTをAuthorizationヘッダーに追加
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

export default api;

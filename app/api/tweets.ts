import axios from 'axios';
import { TweetData } from '../_interfaces/TweetData';
import api from './api';

export const findAllTweets = async (): Promise<TweetData[]> => {
  try {
    const response = await api.get<TweetData[]>('/tweets/');
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error('APIリクエストエラー:', error.response?.data);
      throw new Error('ツイートの取得に失敗しました');
    }
    throw error;
  }
};

export const createTweet = async (tweetForm: { image: string; text: string; }): Promise<void> => {
  try {
      const response = await api.post('/tweets/', tweetForm);
      console.log('保存したツイート:', response.data);
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error('ツイートの投稿に失敗しました');
    }
    throw error;
  }
};

// ツイートの詳細を取得する関数を追加
export const findTweetById = async (tweetId: number): Promise<TweetData> => {
  try {
    const response = await api.get<TweetData>(`/tweets/${tweetId}`);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error('APIリクエストエラー:', error.response?.data);
      throw new Error('ツイートの取得に失敗しました');
    }
    throw error;
  }
};

// ツイートの更新
export const updateTweet = async (tweetForm: { image: string; text: string; },tweetId: number): Promise<TweetData> => {
  try {
      const response = await api.post(`/tweets/${tweetId}/update`, tweetForm);
      return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const errorData = error.response?.data;

      // エラー情報をもとにメッセージを作成
      const errorMessages = errorData.errorMessages.join(', ')

      // エラーメッセージのほかにオリジナルエラーを保持
      throw { errorMessage: errorMessages };
    }
    throw error;
  }
};

// ツイートの削除
export const deleteTweet = async (tweetId: number): Promise<void> => {
  try {
    const response = await api.post(`/tweets/${tweetId}/delete`);
    // サーバーからのレスポンスがSuccessfulかどうかを確認
    if (response.status !== 204 ) {
      throw new Error('ツイートの削除に失敗しました');
    }
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error('APIリクエストエラー:', error.response?.data);
      throw new Error('ツイートの削除に失敗しました');
    }
    throw error;
  }
};


// ツイート検索
export const searchTweets = async (query: string): Promise<TweetData[]> => {
  try {
    const response = await api.get<TweetData[]>(`/tweets/search?query=${query}`);
    return response.data;
  } catch (error) {
    console.error("エラー", error)
    if (axios.isAxiosError(error)) {
      throw new Error('ツイートの検索に失敗しました');
    }
    throw error;
  }
};
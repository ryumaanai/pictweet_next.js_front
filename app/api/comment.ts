import axios from 'axios';
import { CommentData } from '../_interfaces/CommentData';
import api from './api';

export const createComment = async (commentForm: { text: string; }, tweetId: number): Promise<CommentData> => {
  try {
      const response = await api.post(`/tweets/${tweetId}/comment`, commentForm);
      return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error('ツイートの投稿に失敗しました');
    }
    throw error;
  }
};

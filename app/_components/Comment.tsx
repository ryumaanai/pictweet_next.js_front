import React from 'react';
import { CommentData } from '@/app/_interfaces/CommentData';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import { useForm } from 'react-hook-form';
import { CommentFormData } from '../_interfaces/CommentFormData';

interface CommentProps {
  comments: CommentData[];
  errorMessages: string[];
  onCommentSubmit: (data: CommentFormData) => Promise<void>;
  disabled: boolean;
}

const Comment = ({ comments, errorMessages, onCommentSubmit, disabled }: CommentProps) => {
  const { user } = useAuth();
  const { register, handleSubmit, formState: { errors }, reset } = useForm<CommentFormData>();

  const onSubmit = async (data: CommentFormData) => {
    await onCommentSubmit(data);
    reset();
  };

  return (
    <div>
      <div className="container">
        {user && user.isAuthenticated ? (
          <div>
            {errorMessages.length > 0 && errorMessages.map((error, index) => (
              <div key={index}>{error}</div>
            ))}
            <form onSubmit={handleSubmit(onSubmit)}>
              <textarea
                id="text"
                {...register('text', { required: "コメントは必須です" })}
                placeholder="コメントする"
                rows={2}
              />
              {errors.text && <span>{errors.text.message}</span>}
              <input type="submit" value="SEND" disabled={disabled} />
            </form>
          </div>
        ) : (
          <strong>
            <p>※※※ コメントの投稿には新規登録/ログインが必要です ※※※</p>
          </strong>
        )}

        <div className="comments">
          <h4>＜コメント一覧＞</h4>
          <ul>
            {comments.map(comment => (
              <li key={comment.id}>
                <strong>
                  <Link href={`/users/${comment.user.id}`}>{comment.user.nickname}</Link>：
                </strong>
                <span>{comment.text}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Comment;

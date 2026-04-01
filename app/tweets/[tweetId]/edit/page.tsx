"use client";

import { useEffect, useState } from 'react';
import { findTweetById, updateTweet } from '@/app/api/tweets';
import { notFound, useParams, useRouter } from 'next/navigation';
import TweetFormComponent from '@/app/_components/TweetForm';
import { useAuth } from '@/context/AuthContext';
import AuthGuard from '@/app/_components/AuthGuard';


interface TweetForm {
  text: string;
  image: string;
}

const EditTweetPage = () => {
  const { tweetId } = useParams<{ tweetId: string }>();
  const [errorMessages, setErrorMessages] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [formData, setFormData] = useState<TweetForm>({
    text: '',
    image: ''
  });
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [isAuthorized, setIsAuthorized] = useState<boolean | null>(null);


  const router = useRouter();
  const user = useAuth().user;

  useEffect(() => {
    const fetchTweet = async () => {
      try {
        const response = await findTweetById(Number(tweetId));
        const { text, image, user: { id: userId } } = response;
        setFormData({
          text: text,
          image: image || ''
        });
        if (user && user.id !== userId) {
          setIsAuthorized(false);
          return router.push('/');
        } else {
          setIsAuthorized(true);
        }
      } catch (error) {
        console.error('ツイートの取得に失敗しました:', error);
        return notFound();
      } finally {
        setLoading(false);
      }
    };

    fetchTweet();
  }, [tweetId, user]);

  const handleSubmit = async (data: TweetForm) => {
    setErrorMessages([]);
    setIsSubmitting(true);  // 送信開始時に状態を更新
    try {
      await updateTweet(data, Number(tweetId)); // ツイートの更新
      router.push(`/tweets/${tweetId}`);
    } catch (error: any) {
      setErrorMessages(prevMessages => [...prevMessages, error.errorMessage]);
    } finally {
      setIsSubmitting(false); // 処理が完了したら状態を更新
    }
  };

  if (loading || !isAuthorized) {
    return null;
  }

  return (
    <div className="contents row">
      <div className="container">
        <h3>編集する</h3>
        <TweetFormComponent
          onSubmit={handleSubmit}
          errorMessages={errorMessages}
          initialData={formData}
          disabled={isSubmitting}
        />
      </div>
    </div>
  );
};

export default function Page() {
  return (
      <AuthGuard>
          <EditTweetPage />
      </AuthGuard>
  );
}
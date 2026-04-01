'use client'
import Header from '@/app/_components/Header';
import { useState } from 'react';
import { createTweet } from '@/app/api/tweets';
import { useRouter } from 'next/navigation';
import AuthGuard from '@/app/_components/AuthGuard'; // AuthGuard をインポート
import TweetFormComponent from '@/app/_components/TweetForm';

interface TweetForm {
  text: string;
  image: string;
}

const CreateTweetPage = () => {
  const [errorMessages, setErrorMessages] = useState<string[]>([]);
  const router = useRouter();
  const [formData, setFormData] = useState<TweetForm>({
    text: '',
    image: ''
  });
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);


  const handleSubmit = async (data: TweetForm) => {
      setErrorMessages([]);
      setIsSubmitting(true);
      try {
          await createTweet(data);
          router.push('/');
      } catch (error: any) {
          const errorMessage = error.message;
          setErrorMessages([errorMessage]);
      } finally {
        setIsSubmitting(false);
      }
  };

  return (
      <div>
          <div className="contents row">
              <div className="container">
                  <h3>投稿する</h3>
                  <TweetFormComponent
                      onSubmit={handleSubmit}
                      errorMessages={errorMessages}
                      initialData={formData}
                      disabled={isSubmitting}
                  />
              </div>
          </div>
      </div>
  );
};

export default function Page() {
  return (
      <AuthGuard>
          <CreateTweetPage />
      </AuthGuard>
  );
}
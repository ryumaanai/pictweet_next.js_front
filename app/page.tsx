"use client";

import { useEffect, useState } from 'react';
import TweetList from '@/app/_components/TweetList';
import { deleteTweet, findAllTweets } from '@/app/api/tweets';
import SearchForm from '@/app/_components/SearchForm';
import { TweetData } from '@/app/_interfaces/TweetData';
import { useRouter } from 'next/navigation';

const IndexPage = () => {
  const [tweets, setTweets] = useState<TweetData[]>([]);
  const router = useRouter();

  useEffect(() => {
    const getTweets = async () => {
      try {
        const response = await findAllTweets();
        setTweets(response);
      } catch (error) {
        console.error('ツイートの取得に失敗しました:', error);
      }
    };
    getTweets();
  }, []);

  const handleDeleteTweet = async (tweetId: number) => {
    try {
      await deleteTweet(tweetId);
      setTweets(tweets.filter((tweet) => tweet.id !== tweetId));
    } catch (error) {
      alert('ツイートの削除に失敗しました。');
    }
  };

  const handleSearch = (query: string) => {
    router.push(`/tweets/search?query=${encodeURIComponent(query)}`);
  };

  return (
    <div>
      <SearchForm onSearch={handleSearch} initialQuery={""} />
      <div className="contents row">
        <TweetList tweets={tweets} onDeleteTweet={handleDeleteTweet} />
      </div>
    </div>
  );
};

export default IndexPage;

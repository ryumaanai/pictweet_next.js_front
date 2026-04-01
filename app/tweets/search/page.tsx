"use client";

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import TweetList from '@/app/_components/TweetList';
import { deleteTweet, searchTweets } from '@/app/api/tweets';
import { TweetData } from '@/app/_interfaces/TweetData';
import SearchForm from '@/app/_components/SearchForm';

const SearchPage = () => {
  const [tweets, setTweets] = useState<TweetData[]>([]);
  const searchParams = useSearchParams();
  const query = searchParams.get('query') || "";
  const router = useRouter();

  useEffect(() => {
    const fetchTweets = async () => {
      if (query) {
        try {
          const response = await searchTweets(query);
          setTweets(response);
        } catch (error) {
          console.error('ツイートの検索に失敗しました:', error);
        }
      }
    };

    fetchTweets();
  }, [query]);

  const handleDeleteTweet = async (tweetId: number) => {
    try {
      await deleteTweet(tweetId);
      setTweets(tweets.filter((tweet) => tweet.id !== tweetId));
    } catch (error) {
      console.error('ツイートの削除に失敗しました:', error);
      alert('ツイートの削除に失敗しました。');
    }
  };

  const handleSearch = (query: string) => {
    router.push(`/tweets/search?query=${encodeURIComponent(query)}`);
  };

  return (
    <div>
      <SearchForm onSearch={handleSearch} initialQuery={query} />
      <div className="contents row">
        <TweetList tweets={tweets} onDeleteTweet={handleDeleteTweet} />
      </div>
    </div>
  );
};

export default SearchPage;

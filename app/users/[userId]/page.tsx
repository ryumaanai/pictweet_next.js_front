"use client";

import { useEffect, useState } from 'react';
import TweetList from '@/app/_components/TweetList';
import { deleteTweet } from '@/app/api/tweets';
import { TweetData } from '@/app/_interfaces/Tweet';
import { findUserTweets } from '@/app/api/user';
import { useParams } from 'next/navigation';

const UserMyPage = () => {
  const [tweets, setTweets] = useState<TweetData[]>([]);
  const [nickname, setNickname] = useState<string | undefined>(undefined);
  const params = useParams();
  const userId = params.userId;

  useEffect(() => {
    const getTweets = async () => {
      try {
        const response = await findUserTweets(Number(userId));
        setTweets(response.tweets);
        setNickname(response.user.nickname);
      } catch (error) {
        console.error('ツイートの取得に失敗しました:', error);
      }
    };
    getTweets();
  }, []);

  const handleDeleteTweet = async (tweetId: number) => {
    try {
      await deleteTweet(tweetId);
      // 成功したら、tweets 配列を更新する
      setTweets(tweets.filter((tweet) => tweet.id !== tweetId));
    } catch (error) {
      console.error('ツイートの削除に失敗しました:', error);
      alert('ツイートの削除に失敗しました。');
    }
  };


  return (
    <div>
      <div className="contents row">
        <TweetList tweets={tweets} onDeleteTweet={handleDeleteTweet} nickname={nickname}/>
      </div>
    </div>
  );
};

export default UserMyPage;

"use client";

import { TweetData } from '@/app/_interfaces/Tweet';
import Tweet from '@/app/_components/Tweets';

interface TweetListProps {
  tweets: TweetData[];
  onDeleteTweet: (tweetId: number) => Promise<void>;
  nickname?: string;
}

const TweetList = ({ tweets, onDeleteTweet, nickname }: TweetListProps) => {
  return (
    <div className="contents row">
      {nickname && <p>{nickname}さんの投稿一覧</p>}
      {tweets.map((tweet) => (
        <Tweet
          key={tweet.id}
          tweet={tweet}
          isShow={true}
          onDeleteTweet={onDeleteTweet}
        />
      ))}
    </div>
  );
};

export default TweetList;
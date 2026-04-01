'use client';

import React from 'react';
import { TweetData } from '../_interfaces/TweetData';
import { useAuth } from '@/context/AuthContext';
import Link from 'next/link';

interface TweetProps {
    tweet: TweetData;
    isShow: boolean;
    onDeleteTweet: (tweetId: number) => Promise<void>;
}

const Tweet = ({ tweet, isShow, onDeleteTweet}: TweetProps) => {
    const { user } = useAuth()

    return (
        <div className="content_post" style={{ backgroundImage: `url(${tweet.image})` }}>
            {isShow ? (
                <div className="more">
                    <span><img src="/images/arrow_top.png" alt="Arrow Top" /></span>
                    <ul className="more_list">
                        <li>
                            <Link href={`/tweets/${tweet.id}`}>詳細</Link>
                        </li>
                        {user && user.isAuthenticated && user.id === tweet.user.id && (
                        <>
                            <li>
                                <Link href={`/tweets/${tweet.id}/edit`} className="update-btn">編集</Link>
                            </li>
                            <li>
                                <form onSubmit={(e) => {
                                        e.preventDefault()
                                        onDeleteTweet(tweet.id)
                                }}>
                                    <input type="submit" className="delete-btn" value="削除" />
                                </form>
                            </li>
                        </>
                        )}
                    </ul>
                </div>
            ) : (
                user && user.isAuthenticated && user.id === tweet.user.id && (
                <div className="more">
                    <span><img src="/images/arrow_top.png" alt="Arrow Top" /></span>
                    <ul className="more_list">
                    <li>
                        <Link href={`/tweets/${tweet.id}/edit`} className="update-btn">編集</Link>
                    </li>
                    <li>
                        <form onSubmit={(e) => {
                            e.preventDefault()
                            onDeleteTweet(tweet.id)
                        }}>
                            <input type="submit" className="delete-btn" value="削除" />
                        </form>
                    </li>
                    </ul>
                </div>
                )
            )}
            <p>{tweet.text}</p>
            <span className="name">
            <Link href={`/users/${tweet.user.id}`}>
                <span>投稿者</span><span>{tweet.user.nickname}</span>
            </Link>
            </span>
        </div>
    );
};

export default Tweet;

'use client';

import React from 'react';
import { TweetData } from '../_interfaces/TweetData';
import { useAuth } from '@/context/AuthContext';
import Link from 'next/link';

interface TweetProps {
    tweet: TweetData;
}

const TweetDetail = ({ tweet }: TweetProps) => {
    const { user } = useAuth()

    return (
        <div className="content_post" style={{ backgroundImage: `url(${tweet.image})` }}>
            {user && user.isAuthenticated && user.id === tweet.user.id && (
              <div className="more">
                  <span><img src="/images/arrow_top.png" alt="Arrow Top" /></span>
                      <ul className="more_list">
                          <li>
                            <Link href={`/tweets/${tweet.id}/edit`} className="update-btn">編集</Link>
                          </li>
                          <li>
                            <form action={`/tweets/${tweet.id}/delete`} method="post">
                              <input type="submit" className="delete-btn" value="削除" />
                            </form>
                          </li>
                      </ul>
              </div>
            )}
            <p>{tweet.text}</p>
            <span className="name">
                <a href={`/users/${tweet.user.id}`}>
                    <span>投稿者</span><span>{tweet.user.nickname}</span>
                </a>
            </span>
        </div>
    );
};

export default TweetDetail;

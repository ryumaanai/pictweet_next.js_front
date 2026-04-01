'use client'
import { useEffect, useState } from 'react'
import { TweetData } from '@/app/_interfaces/TweetData'
import { useParams, notFound, useRouter } from 'next/navigation'
import { deleteTweet, findTweetById } from '@/app/api/tweets'
import Tweet from '@/app/_components/Tweets'
import Comment from '@/app/_components/Comment'
import { CommentData } from '@/app/_interfaces/CommentData'
import { CommentFormData } from '@/app/_interfaces/CommentFormData'
import { createComment } from '@/app/api/comment'

const showTweetDetail = () => {
  const params = useParams()
  const tweetId = params.tweetId
  const [tweet, setTweet] = useState<TweetData | null>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()
  const [comments, setComments] = useState<CommentData[]>([])
  const [errorMessages, setErrorMessages] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  useEffect(() => {
    const getTweet = async () => {
      if (tweetId) {
        setLoading(true);
        try {
          const response = await findTweetById(Number(tweetId));
          if (response) {
            const {
              id,
              text,
              image,
              user: { id: userId, nickname },
              comments
            } = response;

            setTweet({
              id,
              text,
              image,
              user: {
                id: userId,
                nickname
              },
              comments,
            });
            setComments(comments);
          }
        } catch (error) {
          setTweet(null)
        } finally {
          setLoading(false)
        }
      }
    }
    getTweet()
  }, [tweetId])


  if (loading) {
    return <div>Loading...</div>
  }

  if (!tweet) {
    return notFound()
  }

  const handleDeleteTweet = async (tweetId: number) => {
    try {
      await deleteTweet(tweetId);
      router.push("/");
    } catch (error) {
      alert('ツイートの削除に失敗しました。');
    }
  };

  const handleSubmit = async (data: CommentFormData) => {
    setIsSubmitting(true);
    setErrorMessages([]);
    try {
      const response = await createComment(data, Number(tweetId));
      if (response) {
        const { id, text, user: { id: userId, nickname }} = response;
        const newComment: CommentData = {
          id: id,
          text: text,
          user: { id: userId, nickname: nickname }
        };
        setComments(prevComments => [...prevComments, newComment]);
      }
    } catch (error: any) {
      const errorMessage = error.errorMessage || "コメントの送信中にエラーが発生しました。";
      setErrorMessages([errorMessage]);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
   <>
      <div className="contents row">
        <Tweet tweet={tweet} isShow={false} onDeleteTweet={handleDeleteTweet}/>
        <Comment
          comments={comments}
          errorMessages={errorMessages}
          onCommentSubmit={handleSubmit}
          disabled={isSubmitting}
        />
      </div>
    </>
  );
};

export default showTweetDetail;

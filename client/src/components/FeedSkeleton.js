import React from 'react'
import PostSkeleton from './ui/PostSkeleton'

const FeedSkeleton = ({count = 3}) => {
  return (
    <>
    {
        Array.from({length: count}).map((_, i) => <PostSkeleton key={i} />)
    }
    </>
  )
}

export default FeedSkeleton
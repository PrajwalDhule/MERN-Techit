import React from 'react'
import PostSnippetSkeleton from './ui/PostSnippetSkeleton'

const PostSnippetFeedSkeleton = ({count = 5}) => {
  return (
    <>
    {
        Array.from({length: count}).map((_, i) => <PostSnippetSkeleton key={i} />)
    }
    </>
  )
}

export default PostSnippetFeedSkeleton
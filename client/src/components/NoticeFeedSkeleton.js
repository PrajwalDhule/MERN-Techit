import React from 'react'
import NoticeSkeleton from './ui/NoticeSkeleton'

const NoticeFeedSkeleton = ({count = 3}) => {
  return (
    <>
    {
        Array.from({length: count}).map((_, i) => <NoticeSkeleton key={i} />)
    }
    </>
  )
}

export default NoticeFeedSkeleton
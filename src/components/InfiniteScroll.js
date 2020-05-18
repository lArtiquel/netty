import React, { useRef, useEffect } from 'react'
import PropTypes from 'prop-types'

const InfiniteScroll = ({
  hasMore,
  loadMore,
  isLoading,
  loader,
  endMessage,
  isReverse,
  threshold,
  materialStyle,
  children
}) => {
  const scrollDiv = useRef(null)

  useEffect(() => {
    // this effect needed just to throw error if developer passed wrong threshold value
    const thresholdValue = parseFloat(threshold)
    if (isNaN(thresholdValue) || thresholdValue < 0.4 || thresholdValue > 1)
      throw 'Threshold parameter is not in the range(0.4-1)!'
  }, [])

  const handleScroll = () => {
    if (!hasMore) return
    // offsetHeight - visible height in px of container with it's padding
    // scrollTop - scrolled height in px
    // scrollHeight - visible and non-visible height of container with it's padding
    // so, offsetHeight + scrollTop = scrollHeight
    // threshold - value between 0.4 - 1 when we need to trigger loadMore()
    if (!isReverse) {
      if (
        scrollDiv.current.offsetHeight + scrollDiv.current.scrollTop <
        scrollDiv.current.scrollHeight * threshold
      )
        return
    } else if (
      // chrome flexbox with column-reverse direction still counting it's scrollTop from it's container's top
      scrollDiv.current.scrollHeight * (1 - threshold) <
      scrollDiv.current.scrollTop
    )
      return
    // detach handleScroll func from scroll event here, before loadMore()
    // even knowing that loadMore() mutating `isLoading`, we still can't be sure that
    // it will remove that event listener in useEffect before next event invoke handleScroll
    // i reproduced that bug once doing very fast scrolling
    scrollDiv.current.removeEventListener('scroll', handleScroll)
    loadMore()
  }

  useEffect(() => {
    // if new batch isn't loading -> set event listener again
    if (!isLoading) {
      scrollDiv.current.addEventListener('scroll', handleScroll)
      // and trigger func in case if scroll stuck at the top when we detached handleScroll func and now it not moving
      handleScroll()
    }
    // removes event listener after all `isLoading` flag changes and when component unmounts
    return () => {
      scrollDiv.current.removeEventListener('scroll', handleScroll)
    }
  }, [isLoading])

  return (
    <div className={materialStyle} ref={scrollDiv}>
      {children}
      {isLoading && loader}
      {!hasMore && !isLoading && endMessage}
    </div>
  )
}

InfiniteScroll.propTypes = {
  hasMore: PropTypes.bool.isRequired,
  loadMore: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
  loader: PropTypes.node.isRequired,
  endMessage: PropTypes.node.isRequired,
  isReverse: PropTypes.bool.isRequired,
  threshold: PropTypes.number.isRequired,
  materialStyle: PropTypes.string,
  children: PropTypes.node
}

export default InfiniteScroll

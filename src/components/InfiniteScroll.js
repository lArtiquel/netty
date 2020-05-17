import React, { useState, useRef, useEffect } from 'react'
import PropTypes from 'prop-types'

const InfiniteScroll = ({
  hasMore,
  loadMore,
  loader,
  endMessage,
  reverse,
  threshold,
  materialStyle,
  children
}) => {
  const [isLoading, setIsLoading] = useState(false)
  const scrollDiv = useRef(null)

  useEffect(() => {
    const thresholdValue = parseFloat(threshold)
    if (isNaN(thresholdValue) || thresholdValue < 0.4 || thresholdValue > 1)
      throw 'Threshold parameter is not in the range(0.4-1)!'
  }, [])

  function handleScroll() {
    if (!hasMore) return
    // offsetHeight - visible height in px of container with it's padding
    // scrollTop - scrolled height in px
    // scrollHeight - visible and non-visible height of container with it's padding
    // so, offsetHeight + scrollTop = scrollHeight
    // threshold - value between 0.4 - 1 when we need to trigger loadMore()
    if (!reverse) {
      if (
        scrollDiv.current.offsetHeight + scrollDiv.current.scrollTop <
        scrollDiv.current.scrollHeight * threshold
      )
        return
    } else if (
      // chrome flexbox with column-reverse direction still having it's scrollTop at the container's top corner
      scrollDiv.current.scrollHeight * (1 - threshold) <
      scrollDiv.current.scrollTop
    )
      return

    if (!isLoading) {
      setIsLoading(true)
      loadMore()
      setIsLoading(false)
    }
  }

  return (
    <div className={materialStyle} onScroll={handleScroll} ref={scrollDiv}>
      {children}
      {isLoading && loader}
      {!hasMore && endMessage}
    </div>
  )
}

InfiniteScroll.propTypes = {
  hasMore: PropTypes.bool.isRequired,
  loadMore: PropTypes.func.isRequired,
  loader: PropTypes.node.isRequired,
  endMessage: PropTypes.node.isRequired,
  reverse: PropTypes.bool.isRequired,
  threshold: PropTypes.number.isRequired,
  materialStyle: PropTypes.string,
  children: PropTypes.node
}

export default InfiniteScroll

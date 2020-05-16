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
  const [scrollTop, setScrollTop] = useState(0)

  useEffect(() => {
    const thresholdValue = parseFloat(threshold)
    if (isNaN(thresholdValue) || thresholdValue < 0.4 || thresholdValue > 1)
      throw 'Threshold parameter is not in the range(0.4-1)!'
    // remember initial scrollTop value (needed for reverse-order lists)
  }, [])

  useEffect(() => {
    console.log(scrollTop + scrollDiv.current.scrollTop)
    setScrollTop(scrollTop + scrollDiv.current.scrollTop)
  }, [children])

  function handleScroll() {
    console.log(`scrolled px to top:${scrollTop - scrollDiv.current.scrollTop}`)
    if (!hasMore) return
    // offsetHeight - visible height in px of container with it's padding
    // scrollTop - scrolled heigth in px
    // scrollHeight - visible and non-visible height of container with it's padding
    // threshold - value between 0.4 - 1
    if (!reverse) {
      if (
        scrollDiv.current.offsetHeight + scrollDiv.current.scrollTop <
        scrollDiv.current.scrollHeight * threshold
      )
        return
    } else if (
      scrollDiv.current.offsetHeight + scrollTop - scrollDiv.current.scrollTop <
      scrollDiv.current.scrollHeight * threshold
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

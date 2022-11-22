import React, { ReactNode, useEffect, useRef } from 'react'

interface InfiniteScrollProps {
  hasMore: boolean
  loadMore: () => void
  isLoading: boolean
  loader: ReactNode
  endMessage: ReactNode
  threshold: number
  materialStyle: string
  children: ReactNode
}

const InfiniteScroll = ({
  hasMore,
  loadMore,
  isLoading,
  loader,
  endMessage,
  threshold,
  materialStyle,
  children
}: InfiniteScrollProps) => {
  const scrollDiv = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (threshold < 0.4 || threshold > 1) {
      throw new Error('Threshold parameter is not in the range(0.4-1)!')
    }
  }, [threshold])

  /**
   *
   * Short info regarding scroll vars used here:
   * - offsetHeight - visible height in px of container with it's padding
   * - scrollTop - scrolled height in px (basis in the top of container)
   * - scrollHeight - visible and non-visible height of container with it's padding
   * - so, offsetHeight + scrollTop = scrollHeight
   * - threshold - value between 0.4 - 1 when we need to trigger loadMore()
   */
  useEffect(() => {
    const handleScroll = () => {
      if (!scrollDiv.current) return
      if (!hasMore) return

      const scrollTop = Math.abs(scrollDiv.current.scrollTop)
      if (
        scrollDiv.current.offsetHeight + scrollTop <
        scrollDiv.current.scrollHeight * threshold
      ) {
        return
      }

      // detach handleScroll func from scroll event here, before loadMore()
      // even knowing that loadMore() mutating `isLoading`, we still can't be sure that
      // it will remove that event listener in useEffect before next event invoke handleScroll
      // i reproduced that bug once doing very fast scrolling
      scrollDiv.current.removeEventListener('scroll', handleScroll)
      loadMore()
    }

    const scroll = scrollDiv.current
    if (scroll) {
      // if new batch isn't loading -> set event listener again
      if (!isLoading) {
        scroll.addEventListener('scroll', handleScroll)
        // and trigger func in case if scroll stuck at the top when we detached handleScroll func and now it not moving
        handleScroll()
      }
      // remove event listener after all `isLoading` flag changes and when component unmounts
      return () => {
        scroll.removeEventListener('scroll', handleScroll)
      }
    } else {
      throw new Error('No scroll div assigned!')
    }
  }, [isLoading, hasMore, loadMore, threshold])

  return (
    <div className={materialStyle} ref={scrollDiv}>
      {children}
      {isLoading && loader}
      {!hasMore && !isLoading && endMessage}
    </div>
  )
}

export default InfiniteScroll

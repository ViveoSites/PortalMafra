import classNames from 'classnames'
import React, { useEffect, useRef } from 'react'

const Reveal = ({ active, children }) => {
  const elementReference = useRef<HTMLDivElement>()

  useEffect(() => {
    if (!elementReference.current) return
    elementReference.current.style.height = active
      ? `${elementReference.current.scrollHeight}px`
      : `0px`
  }, [active])

  return (
    <div
      ref={elementReference}
      className={classNames(
        'overflow-hidden transition-all duration-300 ease-in-out',
        {
          'h-auto': active,
        }
      )}
    >
      {children}
    </div>
  )
}

export default Reveal

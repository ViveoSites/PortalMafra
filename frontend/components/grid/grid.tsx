import classNames from 'classnames'
import React from 'react'

interface Properties extends React.BaseHTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode
  className?: string
  noGap?: boolean
}

const Grid: React.FC<Properties> = ({
  children,
  className = '',
  noGap = false,
  ...properties
}) => {
  return (
    <div
      className={classNames('grid grid-cols-1 md:grid-cols-12', {
        'gap-x-4': !noGap,
        [className]: !!className,
      })}
      {...properties}
    >
      {children}
    </div>
  )
}

export default Grid

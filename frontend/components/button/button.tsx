import classNames from 'classnames'
import React from 'react'

import Link from '~/components/link'

interface Properties {
  label: string
  link: string
  target: string
  extraClasses?: string
  buttonExtraClasses?: string
}

const Button: React.FC<Properties> = ({
  label,
  link,
  target,
  extraClasses,
  buttonExtraClasses,
}) => {
  return (
    <div className={classNames('flex w-full', extraClasses)}>
      <Link
        href={link}
        target={target}
        className={classNames(
          'py-5 px-8 rounded-[100px] leading-[22px] border-2 border-solid border-darkness text-base text-darkness  hover:bg-darkness hover:text-white hover:border-2 hover:border-darkness',
          buttonExtraClasses
        )}
      >
        {label}
      </Link>
    </div>
  )
}

export default Button

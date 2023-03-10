import classNames from 'classnames'
import React from 'react'

import Image from '~/components/image'
import RichText from '~/components/rich-text'

interface Properties {
  feature_icon: object
  feature_title: string
  feature_description?: string
  extraClasses?: string
}

const IconCard: React.FC<Properties> = ({
  feature_icon,
  feature_title,
  feature_description,
  extraClasses,
}) => {
  return (
    <li
      className={`col-span-12 rounded-2xl mb-5 flex flex-col items-start justify-start md:justify-center ${extraClasses}`}
    >
      <Image
        width="32"
        height="32"
        className={classNames('mb-4')}
        alt={feature_title}
        src={feature_icon.url}
      />
      <div>
        <div
          className={classNames(
            'text-left text-2xl md:text-4xl mb-4 text-darkness'
          )}
        >
          {feature_title}
        </div>
        <RichText
          htmlText={feature_description}
          className={classNames(
            'lg:grid-cols-1 text-base mb-10 text-darkness text-left'
          )}
        />
      </div>
    </li>
  )
}

export default IconCard

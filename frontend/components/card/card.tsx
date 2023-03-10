import classNames from 'classnames'
import React from 'react'

import Button from '~/components/button'
import Image from '~/components/image'

interface Properties {
  card_image: any
  card_title: string
  card_description?: string
  button_label?: string
  button_link?: string
  button_target?: string
  extraClasses?: string
}

const Card: React.FC<Properties> = ({
  card_image,
  card_title,
  card_description,
  button_label,
  button_link,
  button_target,
  extraClasses,
}) => {
  return (
    <li
      className={classNames(
        'overflow-hidden col-span-12 rounded-2xl mb-10 items-center justify-center',
        extraClasses
      )}
    >
      <Image
        width="350"
        height="310"
        className="object-cover w-full h-[310px]"
        alt={card_title}
        src={card_image.url}
      />
      <div className="md:min-h-[260px] p-8">
        <div
          className={classNames(
            'text-[24px] leading-[28px] md:text-[32px] md:leading-[40px] mb-4'
          )}
        >
          {card_title}
        </div>
        <div className={classNames('text-xl mb-8')}>{card_description}</div>
        {button_label && (
          <Button
            extraClasses="justify-start"
            label={button_label}
            link={button_link}
            target={button_target}
          />
        )}
      </div>
    </li>
  )
}

export default Card

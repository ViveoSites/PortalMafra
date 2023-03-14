import classNames from 'classnames'
import { m } from 'framer-motion'
import React from 'react'

import Image from '~/components/image'
import RichText from '~/components/rich-text'
import useScrollAnimation from '~/helpers/use-scroll-animation'

interface Properties {
  columns_number: number
  features: any
}

const IconCardsList: React.FC<Properties> = ({ features, columns_number }) => {
  const { animationRef, topDownShowAnimation } = useScrollAnimation()

  return (
    <section ref={animationRef} className="icon-cards-list container my-10">
      <ul className="grid grid-cols-12 gap-x-6 md:gap-x-20 mt-12">
        {features &&
          features.map((item, index) => (
            <m.li
              key={`icon-card-${index}`}
              className={classNames(
                `icon-card col-span-12 rounded-2xl mb-6 md:mb-10
                  flex flex-col items-start justify-start`,
                `md:col-span-${12 / columns_number}`,
                {
                  [`col-span-6`]: columns_number === 4,
                  [`col-span-12`]: columns_number !== 4,
                }
              )}
              {...topDownShowAnimation(index * 0.2)}
            >
              <Image
                width="32"
                height="32"
                className={classNames('mb-4')}
                alt={item.feature_title}
                src={item.feature_icon.url}
              />
              <div>
                <div
                  className={classNames(
                    'text-left text-2xl md:text-[32px] md:leading-[36px] mb-4 text-darkness'
                  )}
                >
                  {item.feature_title}
                </div>
                <RichText
                  htmlText={item.feature_description}
                  className={classNames(
                    'lg:grid-cols-1 text-base text-darkness text-left'
                  )}
                />
              </div>
            </m.li>
          ))}
      </ul>
    </section>
  )
}

export default IconCardsList

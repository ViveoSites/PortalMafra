import classNames from 'classnames'
import React from 'react'

import Button from '~/components/button'
import Grid from '~/components/grid'
import Image from '~/components/image'
import RichText from '~/components/rich-text'

interface Properties {
  topics_list: object
}

const CustomerCare: React.FC<Properties> = ({ topics_list }) => {
  return (
    <div className="container my-10">
      {topics_list &&
        topics_list.map((item, index) => {
          const coloredTitle = item.topic_title.replace(
            '<em>',
            `<em class="text-institucionalDark">`
          )
          return (
            <Grid
              className={classNames('col-span-12 mb-10')}
              key={`item-${index}`}
            >
              <div
                className={classNames('flex items-center justify-center col-span-12 md:col-span-5', {
                  'md:justify-start md:col-start-2': index % 2 == 0,
                  'md:justify-end md:col-start-7 md:order-1': index % 2 != 0,
                })}
              >
                <Image
                  width={item.featured_image.width}
                  height={item.featured_image.height}
                  className={classNames('object-cover object-center', {
                    'max-w-[300px]': index % 2 == 0,
                    'ml-auto': index % 2 != 0,
                  })}
                  alt={item.topic_title.replace(/<\/?[^>]+(>|$)/g, "")}
                  src={item.featured_image.url}
                />
              </div>
              <div
                className={classNames(
                  'col-span-12 md:col-span-5 mb-14 md:mb-0 flex-col justify-center',
                  {
                    'md:col-start-2': index % 2 != 0,
                    'md:col-start-7 md:order-1': index % 2 == 0,
                  }
                )}
              >
                <RichText
                  htmlText={coloredTitle}
                  className={classNames(
                    'lg:grid-cols-1 text-5xl leading[54px] mb-6 md:mb-10'
                  )}
                />
                <RichText
                  htmlText={item.topic_description}
                  className={classNames(
                    'lg:grid-cols-1 text-darkness text-base md:text-2xl mb-6'
                  )}
                />
                {item.button_label && (
                  <Button
                    extraClasses="justify-start"
                    label={item.button_label}
                    link={item.button_link}
                    target={item.button_target}
                  />
                )}
              </div>
            </Grid>
          )
        })}
    </div>
  )
}

export default CustomerCare

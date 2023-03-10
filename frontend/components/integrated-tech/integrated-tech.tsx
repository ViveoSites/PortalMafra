import classNames from 'classnames'
import React from 'react'

import Grid from '~/components/grid'
import Image from '~/components/image'

interface Properties {
  background_image: any
  colors: any
  title: string
  subtitle?: string
  topics_list: any
}

const IntegratedTech: React.FC<Properties> = ({
  background_image,
  colors,
  title,
  subtitle,
  topics_list,
}) => {
  return (
    <div>
      <div className="">
        <Image
          width="1200"
          height="680"
          className="object-cover w-full h-[400px] md:h-[680px]"
          alt={title}
          src={background_image.url}
        />
      </div>
      <div className="container my-10 relative -mt-[80px] md:-mt-[320px]">
        <Grid
          className={classNames(
            'pt-10 pb-10 md:pt-20 md:pb-40 rounded-[32px]',
            {
              [`text-${colors.text_color}`]: colors.text_color,
              [`bg-${colors.featured_color}`]: colors.featured_color,
            }
          )}
        >
          <div
            className={classNames(
              'container col-span-12 md:col-span-3 md:col-start-2'
            )}
          >
            <div
              className={classNames(
                'text-4xl leading-[48px] md:text-5xl md:leading-[54px] mb-4 md:mb-6'
              )}
            >
              {title}
            </div>
            <div className={classNames('text-xl md:text-2xl mb-10 md:mb-6')}>
              {subtitle}
            </div>
          </div>
          <div
            className={classNames(
              'container col-span-12 md:col-span-5 md:col-start-7'
            )}
          >
            <ul>
              {topics_list &&
                topics_list.map((item, index) => (
                  <li
                    className={classNames(
                      'flex flex-row items-start justify-start mb-10 text-xl md:text-2xl'
                    )}
                    key={`item-${index}`}
                  >
                    <Image
                      width="32"
                      height="32"
                      className="object-contain w-[32px] h-[32px] mr-4"
                      alt={item.topic_description}
                      src={item.topic_icon.url}
                    />
                    <p>{item.topic_description}</p>
                  </li>
                ))}
            </ul>
          </div>
        </Grid>
      </div>
    </div>
  )
}

export default IntegratedTech

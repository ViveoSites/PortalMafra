import classNames from 'classnames'
import React from 'react'

import Button from '~/components/button'
import Grid from '~/components/grid'
import Image from '~/components/image'

interface Properties {
  title: string
  description: string
  featured_image: object
  image_position: string
  image_format: string
  button_label?: string
  button_link?: string
}

const TextWithImage: React.FC<Properties> = ({
  title,
  description,
  featured_image,
  image_position,
  image_format,
  button_label,
  button_link,
}) => {
  return (
    <div className="container my-10">
      <Grid>
        <div
          className={classNames(
            'text-darkness flex flex-col justify-center col-span-12 mb-6',
            {
              'order-1 md:col-span-5': image_position == 'right',
              'md:col-start-8 md:order-2 md:col-span-5': image_position == 'left',
            }
          )}
        >
          <div
            className={classNames(
              'text-4xl leading-[48px] md:text-5xl md:leading[54px] mb-4'
            )}
          >
            {title}
          </div>
          <div
            dangerouslySetInnerHTML={{ __html: description }}
            className={classNames('text-base md:text-2xl mb-6')}
          ></div>
          {button_label && (
            <Button
              extraClasses="justify-start mb-10 md:mb-0"
              label={button_label}
              link={button_link}
              target="_blank"
            />
          )}
        </div>
        <div
          className={classNames('col-span-12 mb-6', {
            'md:col-start-8 order-2 md:col-span-5':
              image_position == 'right',
            'md:col-span-5': image_position == 'left',
          })}
        >
          <Image
            width={featured_image.width}
            height={featured_image.height}
            className={classNames('w-full object-cover object-center', {
              'h-[425px] md:h-[620px] rounded-[32px]':
                image_format == 'rectangle',
              'md:h-[555px] rounded-[32px]': image_format == 'squared',
              'h-[250px] md:h-[380px] rounded-[500px]': image_format == 'rounded',
            })}
            alt={title}
            src={featured_image.url}
          />
        </div>
      </Grid>
    </div>
  )
}

export default TextWithImage

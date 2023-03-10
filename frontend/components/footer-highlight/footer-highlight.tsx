import classNames from 'classnames'
import React from 'react'

import Button from '~/components/button'
import Grid from '~/components/grid'
import Image from '~/components/image'
import RichText from '~/components/rich-text'

interface Properties {
  colors: object
  title: string
  contents: string
  button_label?: string
  button_link?: string
  featured_image: object
}

const Video: React.FC<Properties> = ({
  colors,
  title,
  contents,
  button_label,
  button_link,
  featured_image,
}) => {
  const coloredTitle = title.replace(
    '<em>',
    `<em class="text-${colors.featured_color}">`
  )
  return (
    <div
      className={classNames('py-[72px] md:mt-[200px] rounded-t-[32px]', {
        [`bg-${'darkness'}`]: 'darkness',
      })}
    >
      <div className="container">
        <Grid>
          <div
            className={classNames(
              'col-span-12 order-2 md:order-1 md:col-span-5',
              {
                [`text-${colors.text_color}`]: colors.text_color,
              }
            )}
          >
            <RichText
              htmlText={coloredTitle}
              className={classNames(
                'lg:grid-cols-1 text-[40px] md:text-6xl leading-[48px] md:leading-[72px] mb-4',
                {
                  [`text-${colors.text_color}`]: colors.text_color,
                }
              )}
            />
            <div className={classNames('text-base mb-6')}>{contents}</div>
            <div className={classNames('mb-6')}>
              <Button
                extraClasses="justify-start"
                buttonExtraClasses={`text-${colors.text_color} border-${colors.text_color} hover:!text-darkness hover:bg-white hover:border-white`}
                label={button_label}
                link={button_link}
                target="_self"
              />
            </div>
          </div>
          <div
            className={classNames(
              'col-span-12 md:col-span-4 md:col-start-9 mb-[40px] md:mb-0 border-1 md:order-2 '
            )}
          >
            <Image
              width={featured_image.width}
              height={featured_image.height}
              className={classNames(
                'w-full h-[480px] md:h-[640px] object-cover object-center max-w-[350px] md:max-w-[410px] md:-mt-[170px] rounded-[1000px]'
              )}
              alt={title}
              src={featured_image.url}
            />
          </div>
        </Grid>
      </div>
    </div>
  )
}

export default Video

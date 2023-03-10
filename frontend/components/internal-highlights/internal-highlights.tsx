import classNames from 'classnames'
import React from 'react'

import Grid from '~/components/grid'
import Image from '~/components/image'
import RichText from '~/components/rich-text'

interface Properties {
  tagline_highlight: string
  title: string
  colors: any
  tagline: string
  contents: string
  highlight_image: any
  image_format: string
  background_image?: any
}

const MainHighlight: React.FC<Properties> = ({
  tagline_highlight,
  title,
  colors,
  contents,
  highlight_image,
  image_format,
  background_image,
}) => {
  const coloredTitle = title.replace(
    '<em>',
    `<em class="text-${colors.featured_color}">`
  )
  return (
    <div
      style={{ backgroundImage: `url(${background_image.url})` }}
      className={classNames('bg-[length:100%_100%] min-h-screen')}
    >
      <Grid className="container bg-cover bg-no-repeat pt-[160px] pb-[48px] md:pt-[120px] md:pb-[72px]">
        <div
          className={classNames(
            'col-span-12 md:col-span-5 text-black justify-center flex flex-col'
          )}
        >
          {tagline_highlight && (
            <div
              className={classNames(
                'w-fit py-[10px] px-4 bg-institucionalLight rounded-[100px] mb-4',
                {
                  [`text-darkness`]: 'darkness',
                }
              )}
            >
              {tagline_highlight}
            </div>
          )}
          <div className={classNames('mb-6')}>
            <RichText
              htmlText={coloredTitle}
              className={classNames(
                'lg:grid-cols-1 text-[40px] leading-[48px] md:text-[64px] md:leading-[68px]',
                {
                  [`text-${colors.text_color}`]: colors.text_color,
                }
              )}
            />
          </div>
          <div className={classNames('mb-6')}>
            <RichText
              htmlText={contents}
              className={classNames('lg:grid-cols-1 text-base md:text-xl', {
                [`text-${colors.text_color}`]: colors.text_color,
              })}
            />
          </div>
        </div>
        <div className={classNames('col-span-12 md:col-span-5 md:col-start-8')}>
          <Image
            width="610"
            height="640"
            className={classNames(
              'w-full h-[370px] md:h-[640px] object-cover object-center',
              {
                'rounded-[32px]': image_format == 'square',
                'rounded-[1000px]': image_format == 'circle',
              }
            )}
            alt={title}
            src={highlight_image.url}
          />
        </div>
      </Grid>
    </div>
  )
}

export default MainHighlight

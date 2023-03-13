import classNames from 'classnames'
import React from 'react'

import Grid from '~/components/grid'
import Image from '~/components/image'
import RichText from '~/components/rich-text'
import GradientCircleBl from '~/icons/gradientborder-circle-bl.svg'
import GradientCircleTopRight from '~/icons/gradientborder-circle-tr.svg'
import GradientSquareRight from '~/icons/gradientborder-square-r.svg'
import GradientSquareTopLeft from '~/icons/gradientborder-square-tl.svg'

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

const InternalHighlight: React.FC<Properties> = ({
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
      className={classNames(
        'bg-[-130px_center] md:bg-center min-h-screen bg-no-repeat',
        {
          'md:bg-[length:100%_100%]': highlight_image,
          'md:bg-cover': !highlight_image,
        }
      )}
    >
      <Grid className="container bg-cover bg-no-repeat pt-[160px] pb-[48px] md:pt-[120px] md:pb-[72px] h-screen">
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
        <div
          className={classNames(
            'col-span-12 md:col-span-5 md:col-start-8 hidden md:flex md:items-center relative'
          )}
        >
          <div className="relative">
            {highlight_image && image_format === 'square' && (
              <>
                <GradientSquareTopLeft
                  className={classNames(
                    'absolute -left-2 -top-2 pointer-events-none z-10 object-contain hidden md:block',
                    {
                      [`gradient-${colors.featured_color}`]:
                        colors.featured_color,
                    }
                  )}
                />
                <GradientSquareRight
                  className={classNames(
                    'absolute -right-2 bottom-12 pointer-events-none z-10 hidden md:block',
                    {
                      [`gradient-${colors.featured_color}`]:
                        colors.featured_color,
                    }
                  )}
                />
              </>
            )}
            {highlight_image && image_format === 'circle' && (
              <>
                <GradientCircleTopRight
                  className={classNames(
                    'absolute -left-2 -top-2 pointer-events-none z-10 object-contain hidden md:block',
                    {
                      [`gradient-${colors.featured_color}`]:
                        colors.featured_color,
                    }
                  )}
                />
                <GradientCircleBl
                  className={classNames(
                    'absolute -right-2 -bottom-2 pointer-events-none z-10 hidden md:block',
                    {
                      [`gradient-${colors.featured_color}`]:
                        colors.featured_color,
                    }
                  )}
                />
              </>
            )}

            {highlight_image && (
              <Image
                width={highlight_image.width}
                height={highlight_image.height}
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
            )}
          </div>
        </div>
      </Grid>
    </div>
  )
}

export default InternalHighlight

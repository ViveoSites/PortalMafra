import classNames from 'classnames'
import React, { useMemo } from 'react'

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
  text_align: string
  highlight_image: any
  image_format: string
  background_image?: any
  mobile_background_image?: any
}

const InternalHighlight: React.FC<Properties> = ({
  tagline_highlight,
  title,
  colors,
  contents,
  text_align,
  highlight_image,
  image_format,
  background_image,
  mobile_background_image,
}) => {
  const coloredTitle = useMemo(
    () => title?.replace('<em>', `<em class="text-${colors?.featured_color}">`),
    [title, colors]
  )

  return (
    <section
      className={classNames(
        'internal-highlights bg-[-130px_center] md:bg-center min-h-screen relative',
        {
          'md:bg-[length:100%_100%]': highlight_image,
          'md:bg-cover': !highlight_image,
        }
      )}
    >
      <Image
        {...background_image}
        className={classNames(
          'absolute object-cover object-center z-10 left-0 top-0 w-full h-full md:block',
          {
            hidden: !!mobile_background_image,
          }
        )}
      />
      {mobile_background_image && (
        <Image
          {...mobile_background_image}
          className={classNames(
            'absolute object-cover object-center z-10 left-0 top-0 w-full h-full md:hidden'
          )}
        />
      )}
      <Grid className="z-20 relative container bg-cover bg-no-repeat pt-[160px] pb-[48px] md:pt-[120px] md:pb-[72px] h-screen">
        <div
          className={classNames(
            'col-span-12 md:col-span-5 text-black flex flex-col',
            {
              'justify-center': text_align == 'center',
            }
          )}
        >
          {tagline_highlight && (
            <div
              className={classNames(
                'w-fit py-[10px] px-4 rounded-[100px] mb-4',
                {
                  [`tag-${colors.featured_color}`]: colors.featured_color,
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
                    'absolute -left-2 -top-2 pointer-events-none z-10 object-contain hidden 1.5xl:block',
                    {
                      [`gradient-${colors.featured_color}`]:
                        colors.featured_color,
                    }
                  )}
                />
                <GradientSquareRight
                  className={classNames(
                    'absolute -right-2 bottom-12 pointer-events-none z-10 hidden 1.5xl:block',
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
                    'absolute -left-2 -top-2 pointer-events-none z-10 object-contain hidden 1.5xl:block',
                    {
                      [`gradient-${colors.featured_color}`]:
                        colors.featured_color,
                    }
                  )}
                />
                <GradientCircleBl
                  className={classNames(
                    'absolute -right-2 -bottom-2 pointer-events-none z-10 hidden 1.5xl:block',
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
                {...highlight_image}
                className={classNames(
                  'w-full h-[370px] md:h-[450px] 1.5xl:h-[600px] object-cover object-center',
                  {
                    'rounded-[32px]': image_format == 'square',
                    'rounded-[1000px]': image_format == 'circle',
                  }
                )}
              />
            )}
          </div>
        </div>
      </Grid>
    </section>
  )
}

export default InternalHighlight

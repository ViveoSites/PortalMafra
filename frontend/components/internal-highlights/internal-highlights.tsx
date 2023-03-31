import classNames from 'classnames'
import React, { useMemo } from 'react'

import Grid from '~/components/grid'
import Image from '~/components/image'
import RichText from '~/components/rich-text'
import GradientRoundedBottomLeft from '~/icons/gradientborder-circle-bl.svg'
import GradientRoundedTopRight from '~/icons/gradientborder-circle-tr.svg'
import GradientCircularBottomRight from '~/icons/gradientborder-circular-br.svg'
import GradientCircularTopLeft from '~/icons/gradientborder-circular-tl.svg'
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
        'internal-highlights bg-[-130px_center] md:bg-center min-h-screen relative'
      )}
    >
      <Image
        {...background_image}
        className={classNames(
          'absolute object-center z-10 left-0 top-0 w-full h-full md:block',
          {
            hidden: !!mobile_background_image,
            'object-cover': !highlight_image,
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
            'col-span-12 lg:col-span-5 text-black flex flex-col',
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
              dangerouslySetInnerHTML={{
                __html: tagline_highlight,
              }}
            ></div>
          )}
          <div className={classNames('mb-6')}>
            <RichText
              htmlText={coloredTitle}
              className={classNames(
                'lg:grid-cols-1 text-[40px] leading-[48px] md:text-[64px] md:leading-[68px] break-words',
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
            'col-span-12 hidden lg:flex lg:items-center relative',
            {
              'lg:col-span-6 lg:col-start-7':
                image_format == 'square' || 'circle',
              'lg:col-span-4 lg:col-start-8': image_format == 'rounded',
            }
          )}
        >
          <div className="relative w-full">
            {highlight_image && image_format === 'square' && (
              <>
                <GradientSquareTopLeft
                  className={classNames(
                    'absolute -left-2 -top-2 pointer-events-none z-10 object-contain hidden xl:block',
                    {
                      [`gradient-${colors.featured_color}`]:
                        colors.featured_color,
                    }
                  )}
                />
                <GradientSquareRight
                  className={classNames(
                    'absolute -right-2 bottom-12 pointer-events-none z-10 hidden xl:block',
                    {
                      [`gradient-${colors.featured_color}`]:
                        colors.featured_color,
                    }
                  )}
                />
              </>
            )}
            {highlight_image && image_format === 'rounded' && (
              <>
                <GradientRoundedTopRight
                  className={classNames(
                    'absolute -left-2 -top-2 pointer-events-none z-10 object-contain hidden xl:block',
                    {
                      [`gradient-${colors.featured_color}`]:
                        colors.featured_color,
                    }
                  )}
                />
                <GradientRoundedBottomLeft
                  className={classNames(
                    'absolute -right-2 -bottom-2 pointer-events-none z-10 hidden xl:block',
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
                <GradientCircularTopLeft
                  className={classNames(
                    'absolute -left-2 -top-2 pointer-events-none z-10 object-contain hidden xl:block',
                    {
                      [`gradient-${colors.featured_color}`]:
                        colors.featured_color,
                    }
                  )}
                />
                <GradientCircularBottomRight
                  className={classNames(
                    'absolute -right-2 -bottom-2 pointer-events-none z-10 hidden xl:block',
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
                  'w-full h-[370px] lg:h-[450px] xl:h-[560px] object-cover object-center',
                  {
                    'rounded-[32px]': image_format == 'square',
                    'rounded-[1000px] max-w-[450px] lg:h-[580px] xl:h-[620px]':
                      image_format == 'rounded',
                    'rounded-[100%] lg:max-w-[460px] xl:max-w-[unset] lg:w-full xl:h-[590px]':
                      image_format == 'circle',
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

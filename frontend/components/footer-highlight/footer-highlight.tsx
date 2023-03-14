import classNames from 'classnames'
import { m } from 'framer-motion'
import React, { useMemo } from 'react'

import Button from '~/components/button'
import Grid from '~/components/grid'
import Image from '~/components/image'
import RichText from '~/components/rich-text'
import useScrollAnimation from '~/helpers/use-scroll-animation'
import GradientCircleBl from '~/icons/gradientborder-circle-bl.svg'
import GradientCircleBlMobile from '~/icons/gradientborder-circle-bl-mobile.svg'
import GradientCircleTopRight from '~/icons/gradientborder-circle-tr.svg'
import GradientCircleTopRightMobile from '~/icons/gradientborder-circle-tr-mobile.svg'

interface Properties {
  colors: any
  title: string
  contents: string
  button_label?: string
  button_link?: string
  featured_image: any
}

const Video: React.FC<Properties> = ({
  colors,
  title,
  contents,
  button_label,
  button_link,
  featured_image,
}) => {
  const { animationRef, topDownShowAnimation } = useScrollAnimation()

  const coloredTitle = useMemo(
    () => title?.replace('<em>', `<em class="text-${colors?.featured_color}">`),
    [title, colors]
  )

  return (
    <m.div
      {...topDownShowAnimation()}
      ref={animationRef}
      className={classNames(
        'footer-highlight py-[72px] md:mt-[200px] rounded-t-[32px]',
        {
          [`bg-${'darkness'}`]: 'darkness',
        }
      )}
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
              'col-span-12 md:col-span-4 md:col-start-9 mb-[40px] md:mb-0 border-1 md:order-2 justify-center md:justify-end flex relative md:-mt-[170px]'
            )}
          >
            <GradientCircleTopRight
              className={classNames(
                'absolute -left-2 -top-2 pointer-events-none z-10 object-contain hidden md:block',
                {
                  [`gradient-${colors.text_color}`]: colors.text_color,
                }
              )}
            />
            <GradientCircleTopRightMobile
              className={classNames(
                'absolute left-10 -top-2 pointer-events-none z-10 object-contain md:hidden',
                {
                  [`gradient-${colors.text_color}`]: colors.text_color,
                }
              )}
            />
            <GradientCircleBl
              className={classNames(
                'absolute -right-2 -bottom-2 pointer-events-none z-10 hidden md:block',
                {
                  [`gradient-${colors.text_color}`]: colors.text_color,
                }
              )}
            />
            <GradientCircleBlMobile
              className={classNames(
                'absolute right-6 -bottom-2 pointer-events-none z-10 md:hidden',
                {
                  [`gradient-${colors.text_color}`]: colors.text_color,
                }
              )}
            />
            <Image
              width={featured_image.width}
              height={featured_image.height}
              className={classNames(
                'w-full h-[480px] md:h-[640px] object-cover object-center max-w-[350px] md:max-w-[410px] rounded-[1000px]'
              )}
              alt={title}
              src={featured_image.url}
            />
          </div>
        </Grid>
      </div>
    </m.div>
  )
}

export default Video

import classNames from 'classnames'
import { m } from 'framer-motion'
import React from 'react'

import Grid from '~/components/grid'
import Image from '~/components/image'
import Link from '~/components/link'
import useScrollAnimation from '~/helpers/use-scroll-animation'
import ArrowRight from '~/icons/arrow-right.svg'
import GradientCircleBl from '~/icons/gradientborder-circle-bl.svg'
import GradientCircleTopRight from '~/icons/gradientborder-circle-tr.svg'
import GradientSquareRight from '~/icons/gradientborder-square-r.svg'
import GradientSquareTopLeft from '~/icons/gradientborder-square-tl.svg'

interface Properties {
  title: string
  description: string
  featured_image: any
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
  const { animationRef, topDownShowAnimation } = useScrollAnimation()

  return (
    <section ref={animationRef} className="text-with-image container my-10">
      <Grid>
        <m.div
          {...topDownShowAnimation()}
          className={classNames(
            'text-darkness flex flex-col justify-center col-span-12 mb-6',
            {
              'order-1 md:col-span-5': image_position == 'right',
              'md:col-start-8 md:order-2 md:col-span-5':
                image_position == 'left',
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
          />
          {button_label && (
            <Link
              href={button_link}
              className={classNames(
                'py-5 px-8 rounded-[100px] text-base leading-[22px] border-2 border-solid text-white border-darkness bg-darkness  hover:bg-white hover:text-darkness hover:border-2 hover:border-darkness flex items-center justify-center w-fit stroke-white hover:stroke-darkness'
              )}
              rel="noreferrer"
            >
              {button_label}
              <ArrowRight className="w-6 h-[25px] ml-2" />
            </Link>
          )}
        </m.div>
        <m.div
          {...topDownShowAnimation(0.2)}
          className={classNames('col-span-12 mb-6 relative', {
            'md:col-start-8 order-2 md:col-span-5': image_position == 'right',
            'md:col-span-5': image_position == 'left',
          })}
        >
          {featured_image && image_format === 'squared' && (
            <>
              <GradientSquareTopLeft
                className={classNames(
                  'absolute -left-2 -top-2 pointer-events-none z-10 object-contain hidden md:block'
                )}
              />
              <GradientSquareRight
                className={classNames(
                  'absolute -right-2 bottom-12 pointer-events-none z-10 hidden md:block'
                )}
              />
            </>
          )}
          {featured_image && image_format === 'rounded' && (
            <>
              <GradientCircleTopRight
                className={classNames(
                  'absolute -left-2 -top-2 pointer-events-none z-10 object-contain hidden md:block'
                )}
              />
              <GradientCircleBl
                className={classNames(
                  'absolute -right-2 -bottom-2 pointer-events-none z-10 hidden md:block'
                )}
              />
            </>
          )}
          <Image
            {...featured_image}
            className={classNames('w-full object-cover object-center', {
              'h-[425px] md:h-[620px] rounded-[32px]':
                image_format == 'rectangle',
              'md:h-[555px] rounded-[32px]': image_format == 'squared',
              'h-[250px] md:h-[380px] rounded-[500px]':
                image_format == 'rounded',
            })}
          />
        </m.div>
      </Grid>
    </section>
  )
}

export default TextWithImage

import classNames from 'classnames'
import { m } from 'framer-motion'
import React, { useState } from 'react'

import Button from '~/components/button'
import Grid from '~/components/grid'
import Image from '~/components/image'
import useScrollAnimation from '~/helpers/use-scroll-animation'
import ButtonPlay from '~/icons/btn-play.svg'
import GradientBorderBl32 from '~/icons/gradientborder-bl-32.svg'
import GradientBorderBl32Mobile from '~/icons/gradientborder-bl-32-mobile.svg'
import GradientBorderTop from '~/icons/gradientborder-top.svg'
import GradientBorderTopMobile from '~/icons/gradientborder-top-mobile.svg'

interface Properties {
  featured_color: string
  video: any
  poster_image: any
  button_label?: string
  button_link?: string
  button_target?: string
}

const Video: React.FC<Properties> = ({
  featured_color,
  video,
  poster_image,
  button_label,
  button_link,
  button_target,
}) => {
  const { animationRef, topDownShowAnimation } = useScrollAnimation()
  const [videoPlaying, setVideoPlaying] = useState(false)

  const playVideo = () => {
    setVideoPlaying(true)
  }

  return (
    <div ref={animationRef} className="video container my-10 mb-20">
      <Grid>
        <div
          className={classNames(
            'col-span-12 md:col-span-8 md:col-start-3 rounded-[32px] relative'
          )}
        >
          <m.div
            {...topDownShowAnimation()}
            className="w-full h-[360px] md:h-[580px] mb-7 md:mb-10 rounded-[32px] relative"
          >
            <GradientBorderTop
              className={classNames(
                'absolute left-[40px] -top-2 pointer-events-none z-10 object-contain h-4 hidden md:block',
                {
                  [`gradient-${featured_color}`]: featured_color,
                }
              )}
            />
            <GradientBorderTopMobile
              className={classNames(
                'absolute left-[55px] -top-2 pointer-events-none z-10 object-contain h-4 md:hidden',
                {
                  [`gradient-${featured_color}`]: featured_color,
                }
              )}
            />
            <GradientBorderBl32
              className={classNames(
                'absolute -right-2 -bottom-2 pointer-events-none z-10 hidden md:block',
                {
                  [`gradient-${featured_color}`]: featured_color,
                }
              )}
            />
            <GradientBorderBl32Mobile
              className={classNames(
                'absolute -right-2 -bottom-2 pointer-events-none z-10 md:hidden',
                {
                  [`gradient-${featured_color}`]: featured_color,
                }
              )}
            />
            <Image
              className={classNames(
                'w-full h-full object-cover object-center rounded-[32px] overflow-hidden',
                { hidden: videoPlaying }
              )}
              width={poster_image.width}
              height={poster_image.height}
              alt="Video"
              src={poster_image.url}
            />
            <ButtonPlay
              onClick={() => playVideo()}
              className={classNames(
                'absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 hover:opacity-60 hover:scale-125 cursor-pointer transition-all',
                {
                  hidden: videoPlaying,
                }
              )}
            />
            <iframe
              className={classNames(
                'w-full h-full object-cover rounded-[32px] overflow-hidden',
                {
                  hidden: !videoPlaying,
                }
              )}
              title="YouTube Player"
              src={`https://www.youtube.com/embed/${video}`}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            />
          </m.div>
          <m.div {...topDownShowAnimation(0.2)}>
            <Button
              extraClasses="justify-center"
              label={button_label}
              link={button_link}
              target={button_target}
            />
          </m.div>
        </div>
      </Grid>
    </div>
  )
}

export default Video

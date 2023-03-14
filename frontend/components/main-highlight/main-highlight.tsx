import classNames from 'classnames'
import React from 'react'

import Button from '~/components/button'
import Grid from '~/components/grid'
import RichText from '~/components/rich-text'
import ArrowDown from '~/icons/arrow-down.svg'

interface Properties {
  colors: any
  title: string
  tagline: string
  button_label?: string
  button_link?: string
  button_target?: string
  background_image: any
}

const handleScroll = () => {
  window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })
}

const MainHighlight: React.FC<Properties> = ({
  colors,
  title,
  tagline,
  button_label,
  button_link,
  button_target,
  background_image,
}) => {
  const coloredTitle = title.replace(
    '<em>',
    `<em class="text-${colors.featured_color}">`
  )

  return (
    <div
      style={{ backgroundImage: `url(${background_image.url})` }}
      className="bg-cover bg-[-110px] md:bg-center md:bg-100% bg-no-repeat h-screen"
    >
      <Grid className="container bg-cover bg-no-repeat">
        <div
          className={classNames(
            'py-[160px] md:py-[230px] col-span-12 md:col-span-8 md:col-start-3 1.5xl:col-span-10 1.5xl:col-start-2 w-full flex flex-col items-center justify-center text-center text-white'
          )}
        >
          <div className={classNames('text-xl mb-6')}>{tagline}</div>
          <RichText
            htmlText={coloredTitle}
            className={classNames(
              'text-5xl leading-[54px] md:text-[64px] md:leading-[72px] 1.5xl:text-[90px] 1.5xl:leading-[98px] mb-6',
              {
                [`text-${colors.text_color}`]: colors.text_color,
              }
            )}
          />
          {button_label && (
            <Button
              extraClasses="justify-center"
              buttonExtraClasses="text-white border-white hover:bg-white hover:!text-darkness hover:border-white"
              label={button_label}
              link={button_link}
              target={button_target}
            />
          )}
        </div>
      </Grid>
      <ArrowDown
        onClick={handleScroll}
        className="hidden md:block absolute bottom-5 left-1/2 -translate-x-1/2 animate-bounce cursor-pointer"
      />
    </div>
  )
}

export default MainHighlight

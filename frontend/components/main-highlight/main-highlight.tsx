import classNames from 'classnames'
import React from 'react'

import Button from '~/components/button'
import Grid from '~/components/grid'
import RichText from '~/components/rich-text'

interface Properties {
  colors: object
  title: string
  tagline: string
  button_label?: string
  button_link?: string
  button_target?: string
  background_image: object
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
      className="bg-100% bg-no-repeat"
    >
      <Grid className="container bg-cover bg-no-repeat">
        <div
          className={classNames(
            'py-[160px] md:py-[230px] col-span-12 md:col-span-8 md:col-start-3 w-full flex flex-col items-center justify-center text-center text-white'
          )}
        >
          <div className={classNames('text-xl mb-6')}>{tagline}</div>
          <RichText
            htmlText={coloredTitle}
            className={classNames(
              'text-5xl leading-[54px] md:text-[100px] md:leading-[108px] mb-6',
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
    </div>
  )
}

export default MainHighlight

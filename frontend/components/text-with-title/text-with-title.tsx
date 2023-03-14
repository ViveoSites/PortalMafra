import classNames from 'classnames'
import React from 'react'

import Grid from '~/components/grid'
import RichText from '~/components/rich-text'

interface Properties {
  title: string
  contents: string
  colors: any
}

const TextWithTitle: React.FC<Properties> = ({ title, contents, colors }) => {
  const coloredTitle = title.replace(
    '<em>',
    `<em class="text-${colors.featured_color}">`
  )

  return (
    <div className="text-with-title container my-10">
      <Grid>
        <div className={classNames('col-span-12 md:col-span-5')}>
          <RichText
            htmlText={coloredTitle}
            className={classNames(
              'lg:grid-cols-1 text-4xl leading-[48px] mb-10 md:mb-[0px]',
              {
                [`text-${colors.text_color}`]: colors.text_color,
              }
            )}
          />
        </div>
        <div
          className={classNames(
            'col-span-12 md:col-span-5 md:col-start-8 text-2xl'
          )}
        >
          {contents}
        </div>
      </Grid>
    </div>
  )
}

export default TextWithTitle

import classNames from 'classnames'
import { m } from 'framer-motion'
import React, { useMemo } from 'react'

import Grid from '~/components/grid'
import RichText from '~/components/rich-text'
import useScrollAnimation from '~/helpers/use-scroll-animation'

interface Properties {
  title: string
  contents: string
  colors: any
}

const TextWithTitle: React.FC<Properties> = ({ title, contents, colors }) => {
  const { animationRef, topDownShowAnimation } = useScrollAnimation()

  const coloredTitle = useMemo(
    () => title?.replace('<em>', `<em class="text-${colors?.featured_color}">`),
    [title, colors]
  )

  return (
    <section ref={animationRef} className="text-with-title container my-10">
      <Grid>
        <m.div
          {...topDownShowAnimation()}
          className={classNames('col-span-12 md:col-span-5')}
        >
          <RichText
            htmlText={coloredTitle}
            className={classNames(
              'lg:grid-cols-1 text-4xl leading-[48px] mb-10 md:mb-[0px]',
              {
                [`text-${colors.text_color}`]: colors.text_color,
              }
            )}
          />
        </m.div>
        <m.div
          {...topDownShowAnimation(0.2)}
          className={classNames(
            'col-span-12 md:col-span-5 md:col-start-8 text-2xl'
          )}
        >
          {contents}
        </m.div>
      </Grid>
    </section>
  )
}

export default TextWithTitle

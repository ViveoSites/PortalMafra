import classNames from 'classnames'
import { m } from 'framer-motion'
import React, { useMemo } from 'react'

import Grid from '~/components/grid'
import RichText from '~/components/rich-text'
import useScrollAnimation from '~/helpers/use-scroll-animation'

interface Properties {
  title: string
  addresses: any
}

const OurAddresses: React.FC<Properties> = ({ title, addresses }) => {
  const { animationRef, topDownShowAnimation } = useScrollAnimation()

  const coloredTitle = useMemo(
    () => title?.replace('<em>', `<em class="text-institucionalDark">`),
    [title]
  )

  return (
    <section ref={animationRef} className="our-addresses container my-10">
      <Grid>
        <m.div
          {...topDownShowAnimation()}
          className="col-span-12 mb-10 md:mb-20"
        >
          <RichText
            htmlText={coloredTitle}
            className={classNames(
              'lg:grid-cols-1 text-[32px] text-darkness md:text-[40px] leading-[40px] md:leading-[48px]'
            )}
          />
        </m.div>
      </Grid>
      <ul className="grid grid-cols-6 md:grid-cols-12 md:gap-x-20">
        {addresses &&
          addresses.map((item, index) => (
            <m.li
              key={`address-${index}`}
              className={classNames('col-span-12 md:col-span-4 mb-6 md:mb-16')}
              {...topDownShowAnimation(index * 0.1)}
            >
              <div
                className={classNames(
                  'text-[24px] leading-[28px] md:text-[32px] md:leading-[36px] text-institucionalDark mb-4'
                )}
              >
                {item.title}
              </div>
              <div className={classNames('text-base md:text-xl text-black')}>
                {item.description}
              </div>
            </m.li>
          ))}
      </ul>
    </section>
  )
}

export default OurAddresses

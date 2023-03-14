import classNames from 'classnames'
import { m } from 'framer-motion'
import React from 'react'

import Grid from '~/components/grid'
import Image from '~/components/image'
import useScrollAnimation from '~/helpers/use-scroll-animation'

interface Properties {
  background_image: any
  colors: any
  title: string
  subtitle?: string
  topics_list: any
}

const IntegratedTech: React.FC<Properties> = ({
  background_image,
  colors,
  title,
  subtitle,
  topics_list,
}) => {
  const { animationRef, topDownShowAnimation } = useScrollAnimation()

  return (
    <section ref={animationRef} className="integrated-tech">
      <m.div {...topDownShowAnimation()}>
        <Image
          className="object-cover w-full h-[400px] md:h-[680px]"
          {...background_image}
        />
      </m.div>
      <m.div
        {...topDownShowAnimation(0.2)}
        className="container px-0 my-10 relative -mt-[80px] md:-mt-[320px]"
      >
        <Grid
          className={classNames(
            'pt-10 pb-10 md:pt-20 md:pb-20 rounded-t-[32px] md:rounded-[32px]',
            {
              [`text-${colors.text_color}`]: colors.text_color,
              [`bg-${colors.featured_color}`]: colors.featured_color,
            }
          )}
        >
          <div
            className={classNames(
              'container col-span-12 md:col-span-3 md:col-start-2'
            )}
          >
            <div
              className={classNames(
                'text-4xl leading-[48px] md:text-5xl md:leading-[54px] mb-4 md:mb-6'
              )}
            >
              {title}
            </div>
            <div className={classNames('text-xl md:text-2xl mb-10 md:mb-6')}>
              {subtitle}
            </div>
          </div>
          <div
            className={classNames(
              'container col-span-12 md:col-span-5 md:col-start-7'
            )}
          >
            <ul>
              {topics_list &&
                topics_list.map((item, index) => (
                  <m.li
                    key={`topics-list-item-${index}`}
                    className={classNames(
                      'flex flex-row items-start justify-start mb-10 last:mb-0 text-xl md:text-2xl'
                    )}
                    {...topDownShowAnimation(index * 0.3)}
                  >
                    <Image
                      {...item.topic_icon}
                      className="object-contain w-[32px] h-[32px] mr-4"
                    />
                    <p>{item.topic_description}</p>
                  </m.li>
                ))}
            </ul>
          </div>
        </Grid>
      </m.div>
    </section>
  )
}

export default IntegratedTech

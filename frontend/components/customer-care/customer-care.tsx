import classNames from 'classnames'
import { m } from 'framer-motion'
import React from 'react'

import Grid from '~/components/grid'
import Image from '~/components/image'
import RichText from '~/components/rich-text'
import useScrollAnimation from '~/helpers/use-scroll-animation'
import ArrowRight from '~/icons/arrow-right.svg'

interface Properties {
  topics_list: any
}

const CustomerCare: React.FC<Properties> = ({ topics_list }) => {
  const { animationRef, topDownShowAnimation } = useScrollAnimation()

  return (
    <section
      ref={animationRef}
      className="customer-care bg-institucionalLight py-10"
    >
      <m.div {...topDownShowAnimation()} className="container my-10 ">
        {topics_list &&
          topics_list.map((item, index) => {
            const coloredTitle = item.topic_title.replace(
              '<em>',
              `<em class="text-institucionalDark">`
            )
            return (
              <Grid
                className={classNames('col-span-12 mb-4 md:mb-10')}
                key={`item-${index}`}
              >
                <div
                  className={classNames(
                    'flex items-center md:justify-center col-span-12 md:col-span-5 mb-6 md:mb-0',
                    {
                      'md:justify-start md:col-start-2': index % 2 == 0,
                      'md:justify-end md:col-start-7 md:order-1':
                        index % 2 != 0,
                    }
                  )}
                >
                  <Image
                    width={item.featured_image.width}
                    height={item.featured_image.height}
                    className={classNames(
                      'object-contain object-center max-w-[300px] min-h-[200px]',
                      {
                        'md:ml-auto': index % 2 != 0,
                      }
                    )}
                    alt={item.topic_title.replace(/<\/?[^>]+(>|$)/g, '')}
                    src={item.featured_image.url}
                  />
                </div>
                <div
                  className={classNames(
                    'col-span-12 md:col-span-5 mb-6 md:mb-0 flex-col justify-center',
                    {
                      'md:col-start-2': index % 2 != 0,
                      'md:col-start-7 md:order-1': index % 2 == 0,
                    }
                  )}
                >
                  <RichText
                    htmlText={coloredTitle}
                    className={classNames(
                      'lg:grid-cols-1 text-5xl leading[54px] mb-6 md:mb-10'
                    )}
                  />
                  <RichText
                    htmlText={item.topic_description}
                    className={classNames(
                      'lg:grid-cols-1 text-darkness text-base md:text-2xl mb-6'
                    )}
                  />
                  {item.button_label && (
                    <a
                      href={item.button_link}
                      target={item.button_target}
                      className={classNames(
                        'py-5 px-8 rounded-[100px] text-base leading-[22px] border-2 border-solid text-white border-darkness bg-darkness  hover:bg-white hover:text-darkness hover:border-2 hover:border-darkness flex items-center justify-center w-fit stroke-white hover:stroke-darkness'
                      )}
                    >
                      {item.button_label}
                      <ArrowRight className="w-6 h-[25px] ml-2" />
                    </a>
                  )}
                </div>
              </Grid>
            )
          })}
      </m.div>
    </section>
  )
}

export default CustomerCare

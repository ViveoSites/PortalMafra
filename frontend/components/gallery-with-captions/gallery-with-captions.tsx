import classNames from 'classnames'
import { m } from 'framer-motion'
import React from 'react'

import Grid from '~/components/grid'
import Image from '~/components/image'
import useScrollAnimation from '~/helpers/use-scroll-animation'

interface Properties {
  featured_image: any
  features_list: any
}

const GalleryWithCaptions: React.FC<Properties> = ({
  featured_image,
  features_list,
}) => {
  const { animationRef, topDownShowAnimation } = useScrollAnimation()

  return (
    <section ref={animationRef} className="gallery-with-captions">
      <m.div {...topDownShowAnimation()}>
        <Grid className="my-10">
          <div className="container col-span-12 px-0 md:px-4 md:rounded-[32px]">
            <Image
              {...featured_image}
              className="object-cover w-full h-[400px] md:h-[600px] md:rounded-[32px]"
            />
          </div>
          <div className="col-span-12 bg-dark text-white rounded-[32px] md:rounded-none py-10 md:py-20 -mt-[80px] md:-mt-[200px]">
            <div className="container flex flex-wrap justify-start items-start">
              {features_list &&
                features_list.map((item, index) => (
                  <div
                    key={`features-list-item-${index}-${item.icon?.id}`}
                    className={classNames(
                      'flex flex-col items-start px-4 justify-start break-words mb-10 text-[24px] leading-[28px] md:text-[32px] md:leading-[36px] w-[50%] md:w-[25%] xl:w-[20%]'
                    )}
                  >
                    {item.icon?.url && (
                      <Image
                        {...item.icon}
                        className="object-contain w-[48px] h-[48px] mb-4"
                      />
                    )}
                    <p>{item.title}</p>
                  </div>
                ))}
            </div>
          </div>
        </Grid>
      </m.div>
    </section>
  )
}

export default GalleryWithCaptions

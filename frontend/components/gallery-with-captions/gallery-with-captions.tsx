import classNames from 'classnames'
import React from 'react'

import Grid from '~/components/grid'
import Image from '~/components/image'

interface Properties {
  featured_image: any
  features_list: any
}

const GalleryWithCaptions: React.FC<Properties> = ({
  featured_image,
  features_list,
}) => {
  return (
    <Grid className="gallery-with-captions my-10">
      <div className="container col-span-12 px-0 md:px-4 md:rounded-[32px]">
        <Image
          width={featured_image.width}
          height={featured_image.height}
          className="object-cover w-full h-[400px] md:h-[600px] md:rounded-[32px]"
          alt={featured_image.title}
          src={featured_image.url}
        />
      </div>
      <ul className="col-span-12 bg-dark text-white rounded-[32px] md:rounded-none py-10 md:py-20 -mt-[80px] md:-mt-[200px]">
        <div className="container flex flex-wrap justify-start items-start">
          {features_list &&
            features_list.map((item, index) => (
              <li
                className={classNames(
                  'flex flex-col items-start px-4 justify-start break-words mb-10 text-[24px] leading-[28px] md:text-[32px] md:leading-[36px] w-[50%] md:w-[25%] xl:w-[20%]'
                )}
                key={`item-${index}`}
              >
                <Image
                  width={item.icon.width}
                  height={item.icon.height}
                  className="object-contain w-[48px] h-[48px] mb-4"
                  alt={item.title}
                  src={item.icon.url}
                />
                <p>{item.title}</p>
              </li>
            ))}
        </div>
      </ul>
    </Grid>
  )
}

export default GalleryWithCaptions

import classNames from 'classnames'
import { m } from 'framer-motion'
import React from 'react'

import Button from '~/components/button'
import Image from '~/components/image'
import useScrollAnimation from '~/helpers/use-scroll-animation'

interface Properties {
  title: string
  contents: string
  categories: any
  columns_number: number
}

const ProductCategories: React.FC<Properties> = ({
  categories,
  columns_number,
}) => {
  const { animationRef, topDownShowAnimation } = useScrollAnimation()

  return (
    <div ref={animationRef} className="product-categories container my-10">
      <ul className="grid grid-cols-12 gap-x-5 mt-12">
        {categories &&
          categories.map((item, index) => (
            <m.li
              key={`product-category-${index}`}
              {...topDownShowAnimation(index * 0.2)}
              style={{ backgroundColor: `${item.acf?.background_color}` }}
              className={classNames(
                'overflow-hidden col-span-12 text-darkness rounded-2xl mb-10 items-center justify-center',
                {
                  [`md:col-span-${12 / columns_number}`]: columns_number,
                }
              )}
            >
              <Image
                width={item.acf?.image.width}
                height={item.acf?.image.height}
                className="object-cover w-full h-[310px]"
                alt={item.name}
                src={item.acf?.image.url}
              />
              <div className="md:min-h-[260px] p-8">
                <div
                  className={classNames(
                    'text-[32px] leading-[40px] md:text-[40px] md:leading-[48px] mb-4'
                  )}
                >
                  {item.name}
                </div>
                <div className={classNames('text-base md:text-xl mb-8')}>
                  {item.description}
                </div>
                {item.acf?.category_page && (
                  <Button
                    extraClasses="justify-start"
                    label="Saiba mais"
                    link={item.acf?.category_page}
                    target="_self"
                  />
                )}
              </div>
            </m.li>
          ))}
      </ul>
    </div>
  )
}

export default ProductCategories

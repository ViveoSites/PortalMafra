import classNames from 'classnames'
import React from 'react'

import Image from '~/components/image'

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
  return (
    <div className="product-categories container my-10">
      <ul className="grid grid-cols-12 gap-x-5 mt-12">
        {categories &&
          categories.map((item, index) => (
            <li
              style={{ backgroundColor: `${item.acf.background_color}` }}
              className={classNames(
                'overflow-hidden col-span-12 text-darkness rounded-2xl mb-10 items-center justify-center',
                {
                  [`md:col-span-${12 / columns_number}`]: columns_number,
                }
              )}
              key={`icon-card-${index}`}
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
                {/* {item.description && (
                  <Button
                    extraClasses="justify-start"
                    label="Saiba mais"
                    link="#"
                    target="_self"
                  />
                )} */}
              </div>
            </li>
          ))}
      </ul>
    </div>
  )
}

export default ProductCategories

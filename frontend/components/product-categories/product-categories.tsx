import classNames from 'classnames'
import React from 'react'

import Button from '~/components/button'
import Grid from '~/components/grid'
import Image from '~/components/image'

interface Properties {
  title: string
  contents: string
  categories: object
  columns_number: number
}

const ProductCategories: React.FC<Properties> = ({
  title,
  contents,
  categories,
  columns_number,
}) => {
  console.log(categories)
  return (
    <div className="container my-10">
      <Grid>
        <div
          className={classNames(
            'col-span-12 md:col-span-2 text-[40px] leading-[48px]'
          )}
        >
          {title}
        </div>
        <div
          className={classNames(
            'col-span-12 md:col-span-4 md:col-start-5 text-base md:text-2xl'
          )}
        >
          {contents}
        </div>
      </Grid>
      <ul className="grid grid-cols-12 gap-x-4 mt-12">
        {categories &&
          categories.map((item, index) => (
            <li
              className={classNames(
                `overflow-hidden col-span-12 text-darkness bg-institucionalLight rounded-2xl mb-10 items-center justify-center md:col-span-${
                  12 / columns_number
                }`
              )}
              key={`icon-card-${index}`}
            >
              {/* <Image
                width="350"
                height="310"
                className="object-cover w-full h-[310px]"
                alt={card_title}
                src={card_image.url}
              /> */}
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
                {item.description && (
                  <Button
                    extraClasses="justify-start"
                    label="Saiba mais"
                    link="#"
                    target="_self"
                  />
                )}
              </div>
            </li>
          ))}
      </ul>
    </div>
  )
}

export default ProductCategories

import classNames from 'classnames'
import React from 'react'

import Grid from '~/components/grid'
import RichText from '~/components/rich-text'

interface Properties {
  title: string
  addresses: object
}

const OurAddresses: React.FC<Properties> = ({ title, addresses }) => {
  const coloredTitle = title.replace(
    '<em>',
    `<em class="text-institucionalDark">`
  )
  return (
    <div className="container my-10">
      <Grid>
        <div className="col-span-12 mb-10 md:mb-20">
          <RichText
            htmlText={coloredTitle}
            className={classNames(
              'lg:grid-cols-1 text-[32px] text-darkness md:text-[40px] leading-[40px] md:leading-[48px]'
            )}
          />
        </div>
      </Grid>
      <ul className="grid grid-cols-6 md:grid-cols-12 md:gap-x-20">
        {addresses &&
          addresses.map((item, index) => (
            <li
              className={classNames('col-span-12 md:col-span-4 mb-6 md:mb-16')}
              key={`item-${index}`}
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
            </li>
          ))}
      </ul>
    </div>
  )
}

export default OurAddresses

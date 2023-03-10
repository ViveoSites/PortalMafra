/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import classNames from 'classnames'
import React, { useState } from 'react'

import Grid from '~/components/grid'
import Image from '~/components/image'
import PinAddress from '~/icons/address.svg'
import ArrowDown from '~/icons/arrow-accordion-down.svg'

interface Properties {
  title: string
  units: any
}

const OurLocations: React.FC<Properties> = ({ title, units }) => {
  const [selected, setSelected] = useState(0)

  const toggle = (index) => {
    if (selected === index) {
      return setSelected(0)
    }
    setSelected(index)
  }

  return (
    <div className="py-10 bg-neutralLight">
      <div className={classNames('container text-4xl leading-[48px]')}>
        {title}
      </div>
      <Grid className="container mt-10">
        <div className={classNames('col-span-12 md:col-span-6 mb-10 md:mb-0')}>
          <Image
            width={units[selected].image.width}
            height={units[selected].image.height}
            className="w-full h-[400px] md:h-[640px] object-cover object-center rounded-3xl"
            alt={title}
            src={units[selected].image.url}
          />
        </div>
        <div
          className={classNames(
            'col-span-12 md:col-span-6 md:col-start-7 text-xl leading-7'
          )}
        >
          <ul>
            {units &&
              units.map((item, index) => (
                <li
                  className={classNames('py-8 rounded-[24px]', {
                    'bg-white': selected == index,
                  })}
                  onClick={() => toggle(index)}
                  key={`item-${index}`}
                >
                  <div className="h-[76px] border-b-8 border-white">
                    <div className="flex px-8 items-center">
                      <span className="text-3xl">{item.title}</span>
                      <ArrowDown
                        className={classNames(
                          'min-w-11 min-h-11 w-11 h-11 ml-auto',
                          {
                            'rotate-180': selected == index,
                          }
                        )}
                      />
                    </div>
                  </div>
                  <div
                    className={classNames('flex row w-full px-8 flex-wrap', {
                      hidden: selected != index,
                    })}
                  >
                    <p
                      className="mt-8 text-base w-full"
                      dangerouslySetInnerHTML={{ __html: item.description }}
                    ></p>
                    <div className="flex flex-nowrap mt-8 text-base">
                      <PinAddress className="w-[24px] h-6 mr-6" />
                      <p className="ml-auto w-full">{item.address}</p>
                    </div>
                    <Grid className="mt-8">
                      <div className="col-span-12 md:col-span-6">
                        <h4 className="text-[14px]">Central de atendimento</h4>
                        <p
                          className="text-base w-full"
                          dangerouslySetInnerHTML={{ __html: item.phones }}
                        ></p>
                      </div>
                      <div className="col-span-12 md:col-span-6">
                        <h4 className="text-[14px]">E-mail</h4>
                        <p
                          className="text-base w-full"
                          dangerouslySetInnerHTML={{ __html: item.emails }}
                        ></p>
                      </div>
                    </Grid>
                    <Grid className="mt-8">
                      {item.features &&
                        item.features.map((featureItem, featureIndex) => (
                          <div
                            className="col-span-6 flex items-center mb-4"
                            key={`feature-item-${featureIndex}`}
                          >
                            <Image
                              width={featureItem.icon.width}
                              height={featureItem.icon.height}
                              alt={title}
                              src={featureItem.icon.url}
                            />
                            <p className="w-full text-base ml-2 leading-5">
                              {featureItem.title}
                            </p>
                          </div>
                        ))}
                    </Grid>
                  </div>
                </li>
              ))}
          </ul>
        </div>
      </Grid>
    </div>
  )
}

export default OurLocations

/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import classNames from 'classnames'
import React, { useRef, useState } from 'react'

import Grid from '~/components/grid'
import Image from '~/components/image'
import RichText from '~/components/rich-text'
import PinAddress from '~/icons/address.svg'
import ArrowDown from '~/icons/arrow-accordion-down.svg'
import GradientSquareRight from '~/icons/gradientborder-square-r.svg'
import GradientSquareBottom from '~/icons/gradientborder-top-mobile.svg'

interface Properties {
  title: string
  units: any
  featured_color: string
}

const OurLocations: React.FC<Properties> = ({
  title,
  units,
  featured_color,
}) => {
  const [selected, setSelected] = useState(0)
  const accordionReference = useRef(null)

  const coloredTitle = title.replace(
    '<em>',
    `<em class="text-${featured_color}">`
  )

  const toggle = (index) => {
    if (selected === index) {
      return setSelected(0)
    }
    scrollToTopOfElement(index)
    setSelected(index)
  }

  const scrollToTopOfElement = (index) => {
    const elementTop =
      accordionReference.current.getBoundingClientRect().top + 50 * index - 100
    window.scrollTo({
      top: window.pageYOffset + elementTop,
      behavior: 'smooth',
    })
  }

  return (
    <div className="py-6 md:py-10 bg-neutralLight">
      <RichText
        htmlText={coloredTitle}
        className={classNames(
          'lg:grid-cols-1 container text-4xl leading-[48px]'
        )}
      />

      <Grid className="container mt-10">
        <div
          className={classNames(
            'col-span-12 md:col-span-6 mb-10 hidden md:block'
          )}
        >
          <div className="relative">
            <GradientSquareBottom
              className={classNames(
                'absolute left-10 -bottom-2 pointer-events-none z-10 object-contain hidden md:block',
                {
                  [`gradient-${featured_color}`]: featured_color,
                }
              )}
            />
            <GradientSquareRight
              className={classNames(
                'absolute -right-2 top-12 pointer-events-none z-10 hidden md:block',
                {
                  [`gradient-${featured_color}`]: featured_color,
                }
              )}
            />
            <Image
              width={units[selected].image.width}
              height={units[selected].image.height}
              className="w-full h-[400px] md:h-[640px] object-cover object-center rounded-3xl"
              alt={title}
              src={units[selected].image.url}
            />
          </div>
        </div>
        <div
          className={classNames(
            'col-span-12 md:col-span-6 md:col-start-7 text-xl leading-7'
          )}
        >
          <ul ref={accordionReference}>
            {units &&
              units.map((item, index) => (
                <li
                  className={classNames('pb-2 rounded-[24px]', {
                    'bg-white pt-8 mb-4': selected == index,
                    'pt-2': selected != index,
                  })}
                  onClick={() => toggle(index)}
                  key={`item-${index}`}
                >
                  <div className="pb-4 border-b-8 border-white">
                    <div className="flex px-4 md:px-8 items-center cursor-pointer">
                      <span className="text-2xl md:text-3xl">{item.title}</span>
                      <ArrowDown
                        className={classNames(
                          'min-w-11 min-h-11 w-11 h-11 ml-auto',
                          {
                            'rotate-180 gradient-accordion-button':
                              selected == index,
                            'gradient-accordion-button-deselected':
                              selected != index,
                          }
                        )}
                      />
                    </div>
                  </div>
                  <div
                    className={classNames(
                      'flex row w-full px-8 flex-wrap transition-all overflow-hidden duration-300',
                      {
                        'max-h-0': selected != index,
                        'max-h-[1000px]': selected == index,
                      }
                    )}
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

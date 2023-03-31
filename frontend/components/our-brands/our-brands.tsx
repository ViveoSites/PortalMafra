/* eslint-disable unicorn/no-array-reduce */
import React, { useRef } from 'react'
import Slider from 'react-slick'

import Grid from '~/components/grid'
import Image from '~/components/image'
import useScrollAnimation from '~/helpers/use-scroll-animation'
import Button from '~/icons/darkness-carousel-button.svg'

interface Properties {
  brands_list: any
}

const OurBrands: React.FC<Properties> = ({ brands_list }) => {
  const { animationRef } = useScrollAnimation()
  const sliderReference = useRef(null)

  const settings = {
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    dots: false,
    infinite: true,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          arrows: false,
          dots: false,
          infinite: false,
        },
      },
    ],
  }

  const handlePreviousClick = () => {
    sliderReference?.current?.slickPrev()
  }

  const handleNextClick = () => {
    sliderReference?.current?.slickNext()
  }

  return (
    <section ref={animationRef} className="cards-list container my-20">
      <Grid className="relative overflow-x-hidden pb-[40px]">
        <Slider
          {...settings}
          ref={sliderReference}
          className="col-span-12 md:col-span-8 md:col-start-5 overflow-hidden"
        >
          {brands_list
            .reduce((accumulator, current, index) => {
              if (index % 9 === 0) {
                accumulator.push(brands_list.slice(index, index + 9))
              }
              return accumulator
            }, [])
            .map((group, index) => (
              <li
                className="!flex flex-wrap mb-0 mr-4 min-h-[530px]"
                key={`card-mobile-${index}`}
              >
                {group.map((content, index_) => (
                  <div
                    className="w-[33%] max-h-[130px] flex items-center justify-center"
                    key={`card-mobile-${index}-${index_}`}
                  >
                    <Image
                      key={`card-mobile-${index}-${index_}`}
                      width="220"
                      height="120"
                      className="object-contain max-h-[100%] max-w-[100%]"
                      alt="Brand"
                      src={content.brand_logo.url}
                    />
                  </div>
                ))}
              </li>
            ))}
        </Slider>
        <div className="col-span-12 md:col-span-8 md:col-start-5 flex absolute bottom-0 left-0">
          <Button
            className="cursor-pointer"
            onClick={handlePreviousClick}
          ></Button>
          <Button
            className="ml-4 rotate-180 cursor-pointer"
            onClick={handleNextClick}
          />
        </div>
      </Grid>
    </section>
  )
}

export default OurBrands

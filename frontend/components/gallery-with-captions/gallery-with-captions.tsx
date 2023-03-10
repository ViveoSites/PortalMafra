import React, { useRef } from 'react'
import Slider from 'react-slick'

import Grid from '~/components/grid'
import Image from '~/components/image'
import Button from '~/icons/carousel-button.svg'

interface Properties {
  carousel: any
}

const GalleryWithCaptions: React.FC<Properties> = ({ carousel }) => {
  const sliderReference = useRef(null)
  const sliderTextReference = useRef(null)

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
    sliderTextReference?.current?.slickPrev()
  }

  const handleNextClick = () => {
    sliderReference?.current?.slickNext()
    sliderTextReference?.current?.slickNext()
  }

  return (
    <div className="container mb-[100px]">
      {carousel && (
        <Slider
          className="carousel-main-banner w-full h-[320px] lg:h-[600px] lg:overflow-hidden rounded-[32px]"
          {...settings}
          ref={sliderReference}
        >
          {carousel.map((content, index) => (
            <div key={`image-${index}`} className="h-full lg:col-span-1">
              <Image
                className="w-full h-[320px] lg:h-[600px] object-cover object-center"
                src={content.image.url}
                width={content.image.width}
                height={content.image.height}
                alt={content.description.replace(/<\/?[^>]+(>|$)/g, '')}
              />
            </div>
          ))}
        </Slider>
      )}
      <Grid>
        <div className="relative h-[400px] col-span-6 col-start-2 bg-dark text-white py-20 rounded-[32px] -mt-[320px]">
          <Slider
            {...settings}
            ref={sliderTextReference}
            className="lg:overflow-hidden"
          >
            {carousel.map((content, index) => (
              <div key={`image-${index}`} className="pl-20 pr-[120px]">
                <h2 className="text-5xl mb-4">{content.title}</h2>
                <p className="text-xl leading-[28px]">{content.description}</p>
              </div>
            ))}
          </Slider>
          <div className="flex absolute bottom-10 left-20">
            <Button onClick={handlePreviousClick}></Button>
            <Button
              className="ml-4 rotate-180"
              onClick={handleNextClick}
            ></Button>
          </div>
        </div>
      </Grid>
    </div>
  )
}

export default GalleryWithCaptions

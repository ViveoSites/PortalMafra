import React from 'react'
import Slider, { Settings } from 'react-slick'

import Image from '~/components/image'

const Carousel = () => {
  const settings: Settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 4000,
        settings: 'unslick',
      },
      {
        breakpoint: 1023,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  }

  const images = [
    'https://picsum.photos/id/237/320/300',
    'https://picsum.photos/id/238/320/300',
    'https://picsum.photos/id/239/320/300',
    'https://picsum.photos/id/240/320/300',
    'https://picsum.photos/id/241/320/300',
    'https://picsum.photos/id/241/320/300',
  ]

  return (
    <div className="container pb-10">
      <Slider
        className="carousel w-full max-w-80 mx-auto lg:grid lg:grid-cols-2 lg:gap-10"
        {...settings}
      >
        {images.map((image, imageIndex) => (
          <div key={`image-${imageIndex}`} className="lg:col-span-1">
            <Image
              src={image}
              alt={`Imagem ${imageIndex}`}
              width="320"
              height="300"
              className="w-full h-auto"
            />
          </div>
        ))}
      </Slider>
    </div>
  )
}

export default Carousel

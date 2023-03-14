import React, { useRef } from 'react'
import Slider from 'react-slick'

import Card from '~/components/card'
import Grid from '~/components/grid'
import Button from '~/icons/darkness-carousel-button.svg'

interface Properties {
  cards_list: any
}

const CardsList: React.FC<Properties> = ({ cards_list }) => {
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
    <div className="cards-list container my-10">
      <Grid className="md:hidden relative overflow-x-hidden pb-[90px]">
        <Slider
          {...settings}
          ref={sliderReference}
          className="col-span-12 list-none"
        >
          {cards_list.map((content, index) => (
            <Card
              key={`card-${index}`}
              extraClasses={`bg-greenDark text-darkness mb-0 mr-4 min-h-[530px]`}
              {...content}
            />
          ))}
        </Slider>
        <div className="flex absolute bottom-0 left-0">
          <Button onClick={handlePreviousClick}></Button>
          <Button
            className="ml-4 rotate-180"
            onClick={handleNextClick}
          ></Button>
        </div>
      </Grid>
      <div className="my-10 hidden md:block">
        <ul className="grid grid-cols-12 gap-x-4 mt-12">
          {cards_list &&
            cards_list.map((item, index) => (
              <Card
                key={`card-${index}`}
                extraClasses={`md:col-span-4 bg-greenDark text-darkness`}
                {...item}
              />
            ))}
        </ul>
      </div>
    </div>
  )
}

export default CardsList

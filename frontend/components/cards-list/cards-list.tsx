import classNames from 'classnames'
import { m } from 'framer-motion'
import React, { useRef } from 'react'
import Slider from 'react-slick'

import Grid from '~/components/grid'
import Image from '~/components/image'
import useScrollAnimation from '~/helpers/use-scroll-animation'
import Button from '~/icons/darkness-carousel-button.svg'

interface Properties {
  cards_list: any
}

const CardsList: React.FC<Properties> = ({ cards_list }) => {
  const { animationRef, topDownShowAnimation } = useScrollAnimation()
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

  const Card = ({
    card_image,
    card_title,
    card_description,
    button_label,
    button_link,
    button_target,
  }) => (
    <div
      className="card relative overflow-hidden rounded-2xl
        items-center justify-center bg-greenDark text-darkness h-full"
    >
      <Image
        width="350"
        height="310"
        className="object-cover w-full h-[310px]"
        alt={card_title}
        src={card_image.url}
      />
      <div className="md:min-h-[260px] p-8">
        <div
          className={classNames(
            'text-[24px] leading-[28px] md:text-[32px] md:leading-[40px] mb-4'
          )}
        >
          {card_title}
        </div>
        <div className={classNames('text-xl mb-8')}>{card_description}</div>
        {button_label && (
          <Button
            extraClasses="justify-start"
            label={button_label}
            link={button_link}
            target={button_target}
          />
        )}
      </div>
    </div>
  )

  return (
    <section ref={animationRef} className="cards-list container my-10">
      <Grid className="md:hidden relative overflow-x-hidden pb-[90px]">
        <Slider
          {...settings}
          ref={sliderReference}
          className="col-span-12 list-none"
        >
          {cards_list.map((content, index) => (
            <li
              key={`card-mobile-${index}`}
              className="col-span-12 mb-0 mr-4 min-h-[530px]"
            >
              <Card {...content} />
            </li>
          ))}
        </Slider>
        <div className="flex absolute bottom-0 left-0">
          <Button onClick={handlePreviousClick}></Button>
          <Button className="ml-4 rotate-180" onClick={handleNextClick} />
        </div>
      </Grid>
      <div className="my-10 hidden md:block">
        <ul className="grid grid-cols-12 gap-x-4 mt-12 gap-y-10">
          {cards_list &&
            cards_list.map((item, index) => (
              <m.li
                key={`card-${index}`}
                className="col-span-12 md:col-span-4"
                {...topDownShowAnimation(index * 0.1)}
              >
                <Card {...item} />
              </m.li>
            ))}
        </ul>
      </div>
    </section>
  )
}

export default CardsList

import classNames from 'classnames'
import { m } from 'framer-motion'
import React from 'react'

import Button from '~/components/button'
import Grid from '~/components/grid'
import useScrollAnimation from '~/helpers/use-scroll-animation'

interface Properties {
  boxes: any
}

const CallToActionBox: React.FC<Properties> = ({ boxes }) => {
  const { animationRef, topDownShowAnimation } = useScrollAnimation()

  return (
    <div className="call-to-action-box" ref={animationRef}>
      <Grid className="container my-8 gap-x-5">
        {boxes?.length > 0 &&
          boxes.map((item, index) => (
            <m.div
              key={`cta-box-item-${index}`}
              className={classNames(
                'col-span-12 md:col-span-6 rounded-3xl bg-institucionalLight text-darkness p-10 mb-10 md:mb-4'
              )}
              {...topDownShowAnimation(index * 0.2)}
            >
              <h2 className="mb-4 text-4xl">{item.title}</h2>
              <p className="leading-7 text-xl">{item.contents}</p>
              {item.button_label && (
                <Button
                  buttonExtraClasses="text-darkness border-darkness hover:bg-darkness hover:text-white hover:border-darkness mt-6"
                  label={item.button_label}
                  link={item.button_link}
                  target={item.button_target}
                />
              )}
            </m.div>
          ))}
      </Grid>
    </div>
  )
}

export default CallToActionBox

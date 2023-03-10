import classNames from 'classnames'
import React from 'react'

import Button from '~/components/button'
import Grid from '~/components/grid'

interface Properties {
  boxes: any
}

const CallToActionBox: React.FC<Properties> = ({ boxes }) => {
  return (
    <Grid className="container mt-8">
      {boxes &&
        boxes.map((item, index) => (
          <div
            className={classNames(
              'col-span-12 md:col-span-6 rounded-3xl bg-institucionalLight text-darkness p-10 mb-4'
            )}
            key={`item-${index}`}
          >
            <h2 className="mb-10 text-4xl">{item.title}</h2>
            <p>{item.contents}</p>
            {item.button_label && (
              <Button
                extraClasses="justify-center"
                buttonExtraClasses="text-darkness border-darkness hover:bg-darkness hover:text-white hover:border-darkness mt-6"
                label={item.button_label}
                link={item.button_link}
                target={item.button_target}
              />
            )}
          </div>
        ))}
    </Grid>
  )
}

export default CallToActionBox

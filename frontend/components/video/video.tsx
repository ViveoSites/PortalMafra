import classNames from 'classnames'
import React from 'react'

import Button from '~/components/button'
import Grid from '~/components/grid'

interface Properties {
  video: object
  button_label?: string
  button_link?: string
  button_target?: string
}

const Video: React.FC<Properties> = ({
  video,
  button_label,
  button_link,
  button_target,
}) => {
  return (
    <div className="container my-10">
      <Grid>
        <div
          className={classNames(
            'col-span-12 md:col-span-8 md:col-start-3 rounded-[32px] overflow-hidden'
          )}
        >
          <video
            className={classNames(
              'w-full h-[360px] md:h-[580px] mb-[58px] rounded-[32px] object-cover'
            )}
            controls
          >
            <source src={video.url} type="video/mp4" />
            <track
              src=""
              kind="captions"
              srcLang="en"
              label="english_captions"
            ></track>
          </video>
          <Button
            extraClasses="justify-center"
            label={button_label}
            link={button_link}
            target={button_target}
          />
        </div>
      </Grid>
    </div>
  )
}

export default Video

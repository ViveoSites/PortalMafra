import React from 'react'

import Button from '~/components/button'

interface Properties {
  title: string
  button_label?: string
  button_link?: string
  button_target?: string
  background_image: any
}

const CallToActionBanner: React.FC<Properties> = ({
  title,
  background_image,
  button_link,
  button_target,
  button_label,
}) => {
  return (
    <div
      style={{ backgroundImage: `url(${background_image.url})` }}
      className="bg-100% bg-no-repeat py-[132px]"
    >
      <div className="container flex items-center justify-center flex-col">
        <h2
          className="text-5xl leading-[54px] text-center"
          dangerouslySetInnerHTML={{ __html: title }}
        ></h2>
        {button_label && (
          <Button
            extraClasses="justify-center"
            buttonExtraClasses="h-[58px] flex items-center text-white bg-darkness border-darkness hover:bg-transparent hover:!text-darkness mt-10"
            label={button_label}
            link={button_link}
            target={button_target}
          />
        )}
      </div>
    </div>
  )
}

export default CallToActionBanner

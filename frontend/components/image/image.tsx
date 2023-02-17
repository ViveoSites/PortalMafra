import NextImage, { ImageProps } from 'next/image'
import React from 'react'

const megaInByes = 1000 * 1000

type Properties = {
  url?: string
  filesize?: number
  size?: string
  layout?: string
} & ImageProps

const Image: React.FC<Properties> = ({
  src,
  url,
  filesize = 0,
  size = '',
  sizes = {},
  alt = '',
  width,
  height,
  loading = 'lazy',
  ...properties
}) => {
  const originalUrl = sizes?.[size] || src || url
  const thumbnailUrl = sizes?.['thumbnail']

  if (!originalUrl) {
    return
  }

  return (
    <NextImage
      src={originalUrl}
      alt={alt}
      width={width}
      height={height}
      loading={loading}
      unoptimized={filesize >= megaInByes}
      placeholder={thumbnailUrl ? 'blur' : 'empty'}
      blurDataURL={thumbnailUrl || ''}
      {...properties}
    />
  )
}

export default Image

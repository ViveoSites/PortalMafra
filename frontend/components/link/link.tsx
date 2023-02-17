/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import NextLink, { LinkProps } from 'next/link'
import React from 'react'

import { isEmail } from '~/utils/global'
import { isUrlExternal } from '~/utils/route'

type Properties = {
  children: React.ReactNode
  isExternal?: boolean
} & Partial<React.AnchorHTMLAttributes<HTMLAnchorElement>> &
  Partial<LinkProps> &
  Partial<React.ButtonHTMLAttributes<HTMLButtonElement>>

const Link: React.FC<Properties> = ({
  children,
  className = '',
  href,
  type,
  onClick,
  isExternal = false,
  ...properties
}) => {
  if (href) {
    if (isUrlExternal(href) || isExternal || isEmail(href)) {
      return isEmail(href) ? (
        <a href={`mailto:${href}`} className={className} onClick={onClick}>
          {children}
        </a>
      ) : (
        <a
          href={href}
          className={className}
          onClick={onClick}
          target="_blank"
          rel="noreferrer"
        >
          {children}
        </a>
      )
    }

    return (
      <NextLink
        href={href}
        passHref
        {...properties}
        className={className}
        onClick={onClick}
      >
        {children}
      </NextLink>
    )
  }

  return (
    <button type={type} className={className} onClick={onClick} {...properties}>
      {children}
    </button>
  )
}

export default Link

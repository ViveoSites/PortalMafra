/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */

import classNames from 'classnames'
import { useRouter } from 'next/router'
import React, { useState } from 'react'

import Grid from '~/components/grid'
import Link from '~/components/link'
import useGlobal from '~/hooks/use-global'
import Mafra from '~/icons/mafra.svg'

const Header = () => {
  const {
    state: { menus },
  } = useGlobal()

  const router = useRouter()

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const toggleMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen)
  }

  const closeMenu = () => {
    setMobileMenuOpen(false)
  }

  return (
    <header className="fixed top-0 left-0 w-full z-50">
      <Grid className="py-4 px-10">
        <div className="col-span-12 md:col-span-2 z-10 relative text-center md:text-left mt-6 md:mt-0">
          <h1>
            <Link href="/">
              <Mafra className="inline-block w-[104px] md:w-[131px]" />
            </Link>
          </h1>
        </div>

        <div className="hidden md:flex col-span-8 col-start-3 items-center justify-center">
          {menus.header?.length && (
            <ul className="flex items-center space-x-2 bg-white h-[58px] rounded-[100px] overflow-hidden">
              {menus.header.map((item, index) => (
                <li
                  onClick={() => closeMenu()}
                  className={classNames(
                    'px-8 h-full flex items-center rounded-[100px] hover:bg-institucionalLight',
                    {
                      '!bg-destaque': router.asPath === item.url,
                    }
                  )}
                  key={`header-menu-${index}`}
                >
                  <Link className="h-full flex items-center" href={item.url}>
                    {item.title}
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div
          onClick={() => toggleMenu()}
          className={classNames(
            'tap-transparent z-20 cursor-pointer md:hidden w-[58px] h-[58px] rounded-full fixed left-5 top-6 flex items-center justify-center',
            {
              'bg-darkness': !mobileMenuOpen,
              'bg-dark': mobileMenuOpen,
            }
          )}
        >
          <div className="flex-col w-6">
            <div
              className={classNames('w-full h-[2px] bg-white transition-all', {
                'rotate-45': mobileMenuOpen,
              })}
            ></div>
            <div
              className={classNames(
                'w-2/3 h-[2px] bg-white mt-1 ml-auto transition-all',
                {
                  hidden: mobileMenuOpen,
                }
              )}
            ></div>
            <div
              className={classNames('h-[2px] bg-white transition-all', {
                'w-1/2 mt-1 ml-auto': !mobileMenuOpen,
                'rotate-[135deg] w-full -mt-[1px]': mobileMenuOpen,
              })}
            ></div>
          </div>
        </div>

        <div
          className={classNames(
            'w-screen h-screen fixed top-0 md:hidden bg-darkness text-white transition-all',
            {
              'left-0': mobileMenuOpen,
              'left-[100%]': !mobileMenuOpen,
            }
          )}
        >
          {menus.header?.length && (
            <ul className="flex flex-col space-y-10 mt-[200px] px-8">
              {menus.header.map((item, index) => (
                <li
                  onClick={() => closeMenu()}
                  className={classNames('text-5xl', {
                    'italic text-destaque': router.asPath === item.url,
                  })}
                  key={`header-menu-${index}`}
                >
                  <Link href={item.url}>{item.title}</Link>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="col-span-2 col-start-10"></div>
      </Grid>
    </header>
  )
}

export default Header

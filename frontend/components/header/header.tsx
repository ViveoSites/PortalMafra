/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */

import classNames from 'classnames'
import { useRouter } from 'next/router'
import React, { useCallback, useMemo, useState } from 'react'

import Grid from '~/components/grid'
import Link from '~/components/link'
import useGlobal from '~/hooks/use-global'
import Mafra from '~/icons/mafra.svg'

const Header = () => {
  const {
    state: { menus },
  } = useGlobal()

  const router = useRouter()
  const headerMenu = useMemo(() => menus?.['header-menu'], [menus])

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const toggleMenu = useCallback(() => {
    setMobileMenuOpen((oldMobileMenuOpen) => !oldMobileMenuOpen)
  }, [])

  const closeMenu = useCallback(() => {
    setMobileMenuOpen(false)
  }, [])

  return (
    <header className="header fixed top-0 left-0 w-full z-50">
      <div className="w-screen h-[120px] absolute top-0 left-0 bg-header" />
      <Grid className="py-4 px-10">
        <div className="col-span-12 md:col-span-2 z-20 relative text-center md:text-left mt-6 md:mt-0">
          <Link href="/">
            <Mafra className="inline-block w-[104px] md:w-[131px]" />
          </Link>
        </div>

        <div className="z-20 relative hidden md:flex col-span-8 col-start-3 items-center justify-center">
          {headerMenu?.length > 0 && (
            <ul className="flex items-center space-x-2 bg-white h-[58px] rounded-[100px] overflow-hidden">
              {headerMenu.map((item, index) => (
                <li
                  key={`header-menu-${index}`}
                  className="h-full flex items-center"
                >
                  <Link
                    className={classNames(
                      'h-full flex items-center px-8 rounded-[100px] hover:bg-institucionalLight',
                      {
                        '!bg-destaque': router.asPath === item.url,
                      }
                    )}
                    href={item.url}
                    onClick={() => closeMenu()}
                  >
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
            />
            <div
              className={classNames(
                'w-2/3 h-[2px] bg-white mt-1 ml-auto transition-all',
                {
                  hidden: mobileMenuOpen,
                }
              )}
            />
            <div
              className={classNames('h-[2px] bg-white transition-all', {
                'w-1/2 mt-1 ml-auto': !mobileMenuOpen,
                'rotate-[135deg] w-full -mt-[1px]': mobileMenuOpen,
              })}
            />
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
          {headerMenu?.length && (
            <ul className="flex flex-col space-y-10 mt-[200px] px-8">
              {headerMenu.map((item, index) => (
                <li key={`header-menu-${index}`} className="text-5xl">
                  <Link
                    href={item.url}
                    onClick={() => closeMenu()}
                    className={classNames({
                      'italic text-destaque': router.asPath === item.url,
                    })}
                  >
                    {item.title}
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="col-span-2 col-start-10" />
      </Grid>
    </header>
  )
}

export default Header

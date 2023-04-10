/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */

import classNames from 'classnames'
import { useRouter } from 'next/router'
import React, { useEffect, useMemo, useState } from 'react'

import Cart from '~/components/cart'
import Grid from '~/components/grid'
import Link from '~/components/link'
import useGlobal from '~/hooks/use-global'
import CartIcon from '~/icons/cart.svg'
import Mafra from '~/icons/mafra.svg'

const Header = () => {
  const {
    state: { menus },
    cart,
  } = useGlobal()

  const router = useRouter()

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [currentIndex, setCurrentIndex] = useState(-1)
  const headerMenu = useMemo(() => menus?.['header-menu'], [menus])

  const toggleMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen)
  }

  const closeMenu = () => {
    setMobileMenuOpen(false)
  }

  useEffect(() => {
    document.body.style.overflow = mobileMenuOpen ? 'hidden' : ''
  }, [mobileMenuOpen])

  return (
    <header className="fixed top-0 left-0 w-full z-50">
      <div className="w-screen h-[120px] absolute top-0 left-0 bg-header"></div>
      <Grid className="py-4 px-10">
        <div className="col-span-12 md:col-span-2 z-20 relative text-center md:text-left mt-6 md:mt-0">
          <Link href="/">
            <Mafra className="inline-block w-[104px] md:w-[131px]" />
          </Link>
        </div>

        <div className="z-20 relative hidden md:flex col-span-8 col-start-3 items-center justify-center">
          {headerMenu?.length && (
            <ul className="flex items-center space-x-2 bg-white h-[58px] rounded-[100px]">
              {headerMenu.map((item, index) => (
                <li
                  onClick={() => closeMenu()}
                  onMouseEnter={() => setCurrentIndex(index)}
                  className={classNames(
                    'relative px-8 h-full flex items-center rounded-[100px] hover:bg-institucionalLight',
                    {
                      '!bg-destaque': router.asPath === item.url,
                    }
                  )}
                  key={`header-menu-${index}`}
                >
                  <Link className="h-full flex items-center" href={item.url}>
                    {item.title}
                  </Link>
                  {item.children.length > 0 && (
                    <div className="absolute top-[55px]">
                      <ul
                        className={classNames(
                          'my-4 py-4 bg-white rounded-3xl overflow-hidden -ml-8',
                          {
                            hidden: currentIndex != index,
                            block: currentIndex == index,
                          }
                        )}
                        onMouseLeave={() => setCurrentIndex(-1)}
                      >
                        {item.children.map((item, index) => (
                          <li
                            onClick={() => closeMenu()}
                            className={classNames(
                              'relative px-8 h-[58px] flex text-xl text-center hover:bg-institucionalLight',
                              {
                                '!bg-destaque': router.asPath === item.url,
                              }
                            )}
                            key={`header-menu-${index}`}
                          >
                            <Link
                              className="h-full flex items-center"
                              href={item.url}
                            >
                              {item.title}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </li>
              ))}
            </ul>
          )}
        </div>

        {cart.cartItems.length > 0 && (
          <button
            onClick={() => cart.toggleCart(true)}
            className={classNames(
              'tap-transparent z-20 cursor-pointer h-[58px] rounded-full fixed right-5 top-6 flex items-center justify-center bg-darkness w-[58px] md:w-auto md:px-8'
            )}
          >
            <span className="text-darkness flex items-center justify-center text-sm md:text-base md:text-white absolute px-2 md:px-0 md:relative min-w-6 h-6 md:w-auto md:auto -top-2 -right-2 md:right-0 md:top-0 bg-destaque md:bg-transparent rounded-xl">
              {cart.cartItems.length}
            </span>
            <CartIcon className="md:ml-4" />
          </button>
        )}

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
            'w-screen h-screen fixed top-0 md:hidden bg-darkness text-white transition-all overflow-scroll',
            {
              'left-0': mobileMenuOpen,
              'left-[100%]': !mobileMenuOpen,
            }
          )}
        >
          {headerMenu?.length && (
            <ul className="flex flex-col space-y-10 mt-[140px] px-8">
              {headerMenu.map((item, index) => (
                <li
                  onClick={() => closeMenu()}
                  className={classNames('text-5xl', {
                    'italic text-destaque': router.asPath === item.url,
                  })}
                  key={`header-menu-${index}`}
                >
                  <Link href={item.url}>{item.title}</Link>
                  {item.children.length > 0 && (
                    <ul className={classNames('py-2 overflow-hidden ml-2')}>
                      {item.children.map((item, index) => (
                        <li
                          className={classNames('relative px-8 text-4xl mt-6', {
                            '!bg-destaque': router.asPath === item.url,
                          })}
                          key={`header-menu-${index}`}
                        >
                          <Link
                            className="h-full flex items-center"
                            href={item.url}
                          >
                            {item.title}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="col-span-2 col-start-10" />
      </Grid>
      <Cart
        isOpen={cart.cartOpen}
        onClose={() => cart.toggleCart(false)}
      ></Cart>
    </header>
  )
}

export default Header

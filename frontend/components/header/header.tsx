import React from 'react'

import Grid from '~/components/grid'
import Link from '~/components/link'
import useGlobal from '~/hooks/use-global'
import SearchSvg from '~/icons/search.svg'

/**
 * styles just for example
 * always prefer use tailwindcss directly in the component
 */
import styles from './header.module.css'

const Header = () => {
  const {
    state: { menus },
  } = useGlobal()

  return (
    <header className="relative bg-black bg-opacity-20">
      <Grid className="container py-4">
        <div className="col-span-12 lg:col-span-5 lg:col-start-2">
          <h1 className={styles.title}>
            <Link href="/">Logo</Link>
          </h1>
        </div>

        <div className="col-span-12 flex items-center justify-end lg:col-span-5 lg:col-start-7">
          {menus.header?.length && (
            <ul className="flex items-center space-x-10">
              {menus.header.map((item, index) => (
                <li key={`header-menu-${index}`}>
                  <Link href={item.url}>{item.title}</Link>
                </li>
              ))}
            </ul>
          )}

          <button type="button" aria-label="Abrir busca" className="ml-10">
            <SearchSvg />
          </button>

          <button type="button" className="ml-auto inline-block md:hidden">
            abrir menu
          </button>
        </div>
      </Grid>
    </header>
  )
}

export default Header

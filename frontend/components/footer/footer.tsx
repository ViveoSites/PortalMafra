import React, { useMemo } from 'react'

import Grid from '~/components/grid'
import Link from '~/components/link'
import RichText from '~/components/rich-text'
import useGlobal from '~/hooks/use-global'
import ArrowRight from '~/icons/arrow-right.svg'
import FutureBrand from '~/icons/futurebrand.svg'
import Mafra from '~/icons/mafra-light.svg'

const Footer = () => {
  const {
    state: { menus, options },
  } = useGlobal()

  const headerMenu = useMemo(() => menus?.['header-menu'], [menus])
  const footerMenu = useMemo(() => menus?.footer, [menus])

  return (
    <footer className="footer bg-dark text-white relative">
      <Grid className="py-7 container px-8 md:px-4">
        <div className="col-span-12 lg:col-span-5 lg:col-start-1">
          <Link href="/">
            <Mafra className="w-[130px]" />
          </Link>
          <p className="mt-6 text-[14px]">{options.footer_description}</p>
          {footerMenu?.length > 0 && (
            <ul className="mt-10 md:mt-[100px]">
              {footerMenu.map((item, index) => (
                <li className="mb-4 md:mb-1 flex" key={`footer-menu-${index}`}>
                  <ArrowRight className="w-6 h-[25px] mr-2 stroke-white" />
                  <Link href={item.url}>{item.title}</Link>
                </li>
              ))}
            </ul>
          )}
        </div>
        <div className="col-span-12 lg:col-span-6 lg:col-start-7">
          {headerMenu?.length > 0 && (
            <ul className="flex md:items-center md:space-x-10 flex-col md:flex-row mt-8 md:mt-0">
              {headerMenu.map((item, index) => (
                <li key={`header-menu-${index}`} className="mb-4 md:mb-0">
                  <Link href={item.url}>{item.title}</Link>
                </li>
              ))}
            </ul>
          )}
          <div className="mt-10 md:mt-[74px]">
            <h2 className="text-[20px]">Canais de distribuição</h2>
            <Grid className="md:grid-cols-2">
              {options.footer_channels?.length > 0 &&
                options.footer_channels.map((item, index) => (
                  <div
                    className="col-span-12 md:col-span-1"
                    key={`channels-${index}`}
                  >
                    <p className="text-[14px] mb-4">{item.title}</p>
                    <ul>
                      {item.locations &&
                        item.locations.map((locationItem, locationIndex) => (
                          <li
                            className="mb-4"
                            key={`location-${locationIndex}`}
                          >
                            <h3 className="text-destaque text-base">
                              {locationItem.location}
                            </h3>
                            <RichText
                              className="grid-cols-1 md:grid-cols-1 text-white"
                              htmlText={locationItem.phones}
                            />
                          </li>
                        ))}
                    </ul>
                  </div>
                ))}
            </Grid>
          </div>
        </div>
        <div className="col-span-12 mt-10 md:mt-24 flex flex-wrap md:flex-nowrap text-[14px] md:text-base">
          <p>{options.footer_copyright}</p>
          <div className="md:ml-auto mt-10 md:mt-0">
            <span className="mr-2">Designed by</span>
            <Link
              href="https://www.futurebrand.com.br"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block"
            >
              <FutureBrand />
            </Link>
          </div>
        </div>
      </Grid>
    </footer>
  )
}

export default Footer

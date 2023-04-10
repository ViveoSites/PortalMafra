import { m } from 'framer-motion'
import React, { useEffect, useRef, useState } from 'react'

import Grid from '~/components/grid'
import useScrollAnimation from '~/helpers/use-scroll-animation'
import Search from '~/icons/search.svg'

interface Properties {
  placeholder: any
}

const SearchBar: React.FC<Properties> = ({ placeholder }) => {
  const { animationRef, topDownShowAnimation } = useScrollAnimation()
  const searchReference = useRef(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    setIsMobile(window.innerWidth < 767)
  }, [])

  return (
    <section className="search-bar md:mb-[60px]" ref={animationRef}>
      <m.div {...topDownShowAnimation()}>
        <Grid className="md:my-10 container">
          <div className="col-span-12 md:col-span-6 md:col-start-7">
            <form
              action="/produtos-resultados"
              className="md:mb-5 w-full relative"
              ref={searchReference}
              // onSubmit={handleSearch}
            >
              <input
                className="w-full h-[58px] rounded-[100px] pl-16"
                type="text"
                name="termo"
                value={searchTerm}
                onChange={(event) => setSearchTerm(event.target.value)}
                placeholder={isMobile ? 'O que você procura?' : placeholder}
              />
              <Search className="top-1/2 left-8 -translate-y-1/2 absolute" />
            </form>
          </div>
        </Grid>
      </m.div>
    </section>
  )
}

export default SearchBar

import { m } from 'framer-motion'
import React, { useRef, useState } from 'react'

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

  return (
    <section className="search-bar mb-[60px]" ref={animationRef}>
      <m.div {...topDownShowAnimation()}>
        <Grid className="my-10 container">
          <div className="col-span-6 col-start-7">
            <form
              action="/produtos-resultados"
              className="mb-5 w-full relative"
              ref={searchReference}
              // onSubmit={handleSearch}
            >
              <input
                className="w-full h-[58px] rounded-[100px] pl-16"
                type="text"
                name="termo"
                value={searchTerm}
                onChange={(event) => setSearchTerm(event.target.value)}
                placeholder={placeholder}
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

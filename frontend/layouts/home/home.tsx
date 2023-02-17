import React from 'react'

// import Carousel from '~/components/carousel'
import { GlobalState } from '~/contexts/global/types'
import RenderBlocks from '~/helpers/render-blocks'
import Layout from '~/layouts/default'

interface HomeProperties {
  pageData: any
  globalData: GlobalState
}

const Home: React.FC<HomeProperties> = ({ pageData, globalData }) => {
  return (
    <Layout globalData={globalData}>
      <RenderBlocks blocks={pageData.content.blocks} />
      {/* <Carousel /> */}
    </Layout>
  )
}

export default Home

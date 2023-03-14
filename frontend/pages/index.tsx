import dynamic from 'next/dynamic'
import React from 'react'

import PageLoading from '~/components/page-loading'
import type { GlobalState } from '~/contexts/global/types'
import Seo from '~/helpers/seo'
import { getGlobalData } from '~/services/global-data'
import { getPageData } from '~/services/pages'

interface HomeProperties {
  pageData: any
  pageUrl: string
  globalData: GlobalState
}

const HomeLayout = dynamic(() => import('~/layouts/home'), {
  loading: () => <PageLoading />,
})

const HomePage: React.FC<HomeProperties> = ({
  pageData,
  pageUrl,
  globalData,
}) => {
  return (
    <>
      <Seo data={pageData?.seo} url={pageUrl} postType={pageData?.type} />
      <HomeLayout globalData={globalData} pageData={pageData} />
    </>
  )
}

// eslint-disable-next-line unicorn/prevent-abbreviations
export const getStaticProps = async ({ locale }) => {
  try {
    const pageUrl = `${process.env.siteUrl}`
    const response = await getPageData({ slug: 'homepage', lang: locale })
    const globalData = await getGlobalData(locale)
    const pageData = response?.data?.[0] || ''

    if (!pageData) {
      throw new Error('Page Not Found')
    }

    return {
      props: {
        pageData,
        pageUrl,
        globalData,
      },
      revalidate: 30,
    }
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error)
    return {
      revalidate: 30,
    }
  }
}

export default HomePage

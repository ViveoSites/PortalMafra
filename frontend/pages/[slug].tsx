import dynamic from 'next/dynamic'
import { useRouter } from 'next/router'
import React from 'react'

import PageLoading from '~/components/page-loading'
import { GlobalState } from '~/contexts/global/types'
import Seo from '~/helpers/seo'
import NotFound from '~/pages/404'
import { getGlobalData } from '~/services/global-data'
import { getPageData, getPageSlugList } from '~/services/pages'

const PageLayout = dynamic(() => import('~/layouts/page'), {
  loading: () => <PageLoading />,
})

interface Properties {
  notFound: boolean
  notFoundMessage: string
  pageData: any
  pageUrl: string
  globalData: GlobalState
}

const DynamicPage: React.FC<Properties> = ({
  notFound,
  notFoundMessage,
  pageData,
  pageUrl,
  globalData,
}) => {
  const router = useRouter()

  if (router.isFallback) {
    return <PageLoading />
  }

  if (notFound || !pageData) {
    return <NotFound message={notFoundMessage} />
  }

  return (
    <>
      <Seo data={pageData?.seo} url={pageUrl} postType={pageData?.type} />
      <PageLayout globalData={globalData} pageData={pageData} />
    </>
  )
}

// eslint-disable-next-line unicorn/prevent-abbreviations
export const getStaticProps = async ({ params, locale }) => {
  try {
    const slug = params.slug
    const pageUrl = `${process.env.siteUrl}/${slug}`
    const response = await getPageData({ slug, lang: locale })
    const notFound = response.status !== 200 || !response?.data?.length
    const globalData = await getGlobalData(locale)

    return {
      props: {
        notFound,
        pageUrl,
        globalData,
        pageData: response?.data?.[0] || '',
      },
      revalidate: 30,
    }
  } catch (error) {
    return {
      props: {
        notFound: true,
        notFoundMessage: error?.message,
      },
      revalidate: 30,
    }
  }
}

export const getStaticPaths = async () => {
  try {
    const { data: pages } = await getPageSlugList()
    const paths = pages?.map((pageData) => ({
      params: {
        slug: pageData.slug,
      },
    }))

    return {
      paths: paths || [],
      fallback: true,
    }
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error)
    return {
      paths: [],
      fallback: true,
    }
  }
}

export default DynamicPage

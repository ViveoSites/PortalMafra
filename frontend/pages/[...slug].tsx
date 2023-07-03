import dynamic from 'next/dynamic'
import { useRouter } from 'next/router'
import React from 'react'

import PageLoading from '~/components/page-loading'
import { GlobalState } from '~/contexts/global/types'
import Seo from '~/helpers/seo'
import NotFound from '~/pages/404'
import { getGlobalData } from '~/services/global-data'
import { getPageData } from '~/services/pages'
import { getPostData, getPostsData } from '~/services/posts'
import { getPostTypeBySlug } from '~/utils/post-types'

const DynamicPages = dynamic(() => import('~/layouts/dynamic-page'), {
  loading: () => <PageLoading />,
})

interface Properties {
  notFound: boolean
  // notFoundMessage: string
  postType: string
  pageData: any
  pageUrl: string
  posts: any[]
  projects: any[]
  globalData: GlobalState
}

const DynamicDeepPage: React.FC<Properties> = ({
  notFound,
  postType,
  pageData,
  pageUrl,
  posts,
  projects,
  globalData,
}) => {
  const router = useRouter()

  if (router.isFallback) {
    return <PageLoading />
  }

  if (notFound || !pageData) {
    return <NotFound />
  }

  return (
    <>
      <Seo data={pageData?.seo} url={pageUrl} postType={pageData?.type} />
      <DynamicPages
        globalData={globalData}
        pageData={pageData}
        posts={posts}
        projects={projects}
        postType={postType}
      />
    </>
  )
}

// eslint-disable-next-line unicorn/prevent-abbreviations
export const getStaticProps = async ({ params, locale }) => {
  try {
    let response
    let responsePosts

    const pageUrl = `${process.env.siteUrl}/${params.slug.join('/')}`
    const postType = getPostTypeBySlug(params.slug[0])
    const globalData = await getGlobalData(locale)
    const pageParameters = {
      slug: params.slug[params.slug.length - 1],
      lang: locale,
    }

    if (postType === 'post') {
      response = await getPostData(pageParameters)
      responsePosts = await getPostsData({
        page: 1,
        per_page: 3,
      })
    } else {
      response = await getPageData(pageParameters)
    }

    const notFound =
      !response || response.status !== 200 || !response?.data?.length

    return {
      props: {
        notFound,
        postType,
        pageUrl,
        pageData: response?.data?.[0] || '',
        posts: responsePosts?.data || [],
        globalData,
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
  return {
    paths: [],
    fallback: true,
  }
}

export default DynamicDeepPage

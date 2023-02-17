import React from 'react'

import { GlobalState } from '~/contexts/global/types'
import RenderDynamicPages from '~/helpers/render-dynamic-pages'
import Layout from '~/layouts/default'

interface Properties {
  postType: string
  pageData: any
  posts: any[]
  projects: any[]
  globalData: GlobalState
}

const DynamicPage: React.FC<Properties> = ({
  globalData,
  pageData,
  postType,
  posts,
  projects,
}) => {
  return (
    <Layout globalData={globalData} translatedPaths={pageData.translatedPaths}>
      <RenderDynamicPages
        postType={postType}
        pageData={pageData}
        posts={posts}
        projects={projects}
      />
    </Layout>
  )
}

export default DynamicPage

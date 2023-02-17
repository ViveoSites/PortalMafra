import React from 'react'

import DynamicPageDefault from './dynamic-pages/default'
import DynamicPageNewsSingle from './dynamic-pages/news-single'

interface Properties {
  pageData: any
  posts: any[]
  postType: string
  projects: any[]
}

const RenderDynamicPages: React.FC<Properties> = ({
  pageData,
  posts,
  postType,
}) => {
  if (postType === 'post') {
    return <DynamicPageNewsSingle pageData={pageData} posts={posts} />
  }

  return <DynamicPageDefault pageData={pageData} />
}

export default RenderDynamicPages

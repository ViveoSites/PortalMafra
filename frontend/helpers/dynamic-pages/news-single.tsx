import React from 'react'

import RichText from '~/components/rich-text'

interface Properties {
  pageData: any
  posts: any[]
}

const DynamicPageNewsSingle: React.FC<Properties> = ({ pageData }) => {
  return (
    <div className="py-6 md:py-24">
      <RichText
        className="container prose-p:col-span-2 prose-p:md:col-span-8"
        htmlText={pageData.content?.rendered}
      />
    </div>
  )
}

export default DynamicPageNewsSingle

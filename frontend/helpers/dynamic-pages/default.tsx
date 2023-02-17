import React from 'react'

import RenderBlocks from '~/helpers/render-blocks'

const DynamicPageDefault = ({ pageData }) => {
  return <RenderBlocks blocks={pageData.content.blocks} />
}

export default DynamicPageDefault

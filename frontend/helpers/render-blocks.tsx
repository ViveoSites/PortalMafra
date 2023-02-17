import React from 'react'

import { default as Highlights } from '~/components/highlights'
import { camelize } from '~/utils/global'

const Blocks = {
  Highlights,
}

const RenderBlocks = ({ blocks }) => {
  return blocks.map(({ blockName, ...component }, componentIndex) => {
    const blockNameFormatted = camelize(blockName.replace('acf/', ''))

    const componentName =
      blockNameFormatted.charAt(0).toUpperCase() + blockNameFormatted.slice(1)

    const Block = Blocks[componentName]

    if (!Block) {
      // throw new Error(`Block ${componentName} not found`)
      return
    }

    return <Block key={`block-template-${componentIndex}`} {...component} />
  })
}

export default RenderBlocks

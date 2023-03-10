import classNames from 'classnames'
import React from 'react'

import Grid from '~/components/grid'

const RichText = ({ className = '', htmlText = '' }) => {
  // Remove wrapping <p> tags around images
  const filteredHtmlText = htmlText.replace(
    /<p\b[^/<>]*>\s*(<img\b[^<>]*>)\s*<\/p>/g,
    '$1'
  )

  return (
    <div className="w-full overflow-hidden">
      <Grid
        noGap={true}
        className={classNames('md:!grid-cols-1 relative prose', className)}
        dangerouslySetInnerHTML={{ __html: filteredHtmlText }}
      />
    </div>
  )
}

export default RichText

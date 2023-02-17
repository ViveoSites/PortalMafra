import { getServerSideSitemap } from 'next-sitemap'

import { getSitemapData } from '~/services/sitemap'

export const getServerSideProps = async (context) => {
  const response = await getSitemapData()
  const urls =
    response?.data
      ?.filter((item) => item.url !== `${process.env.siteUrl}/`)
      ?.map(({ url, lastmod, priority }) => ({
        loc: url,
        lastmod,
        priority,
      })) ?? []

  return getServerSideSitemap(context, urls)
}

// default export to prevent next.js errors
// don't remove it
export default function SitemapIndex() {}

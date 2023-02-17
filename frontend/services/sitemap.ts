import clientApi from '~/utils/client-api'

export const getSitemapData = async () => {
  return clientApi().get('/wp/v2/sitemap')
}

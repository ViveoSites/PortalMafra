import clientApi from '~/utils/client-api'

export const getPageData = async ({ slug, lang }) => {
  return clientApi().get(
    `/wp/v2/pages?slug=${slug}&lang=${lang}&acf_format=standard`
  )
}

export const getPageSlugList = async () => {
  return clientApi().get<{ slug: string }[]>('/wp/v2/pages', {
    params: {
      acf_format: 'standard',
      _fields: ['slug'],
      per_page: 99,
    },
  })
}

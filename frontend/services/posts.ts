import clientApi from '~/utils/client-api'

export const getPostsData = async ({ lang = '', page = 1, per_page = 6 }) => {
  return clientApi().get(
    `/wp/v2/posts?page=${page}&per_page=${per_page}&lang=${lang}&acf_format=standard`
  )
}

export const getPostData = async ({ slug, lang }) => {
  return clientApi().get(
    `/wp/v2/posts?slug=${slug}&lang=${lang}&acf_format=standard`
  )
}

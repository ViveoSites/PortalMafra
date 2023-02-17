import i18nConfigJSON from '~/config/i18n.json'

// Post Types Slugs
// ATTENTION: This is a list of post types slugs, should be the same as the ones in the backend
// Backend: /backend/futurebrand/utils/wpml.php
export const postTypesSlugs = {
  post: {
    'pt-br': 'noticias',
    en: 'news',
    es: 'noticias',
  },
}

export const getPostTypeBySlug = (slug: string) => {
  return Object.keys(postTypesSlugs).find((key) =>
    i18nConfigJSON.locales.find(
      (locale) => postTypesSlugs[key][locale] === slug
    )
  )
}

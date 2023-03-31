import clientApi from '~/utils/client-api'

export const getProductsData = async ({
  term = '',
  page = 1,
  perpage = 20,
  parentcategory = '',
  categories = '',
  suppliers = '',
}) => {
  return clientApi().get(
    `products/search?page=${page}&perpage=${perpage}&term=${term}&parentcategory=${parentcategory}&categories=${categories}&suppliers=${suppliers}&acf_format=standard`
  )
}

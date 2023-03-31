/* eslint-disable sonarjs/no-identical-functions */
/* eslint-disable unicorn/consistent-function-scoping */
/* eslint-disable no-undef */
/* eslint-disable react-hooks/exhaustive-deps */

import classNames from 'classnames'
// import { m } from 'framer-motion'
import React, { useEffect, useRef, useState } from 'react'

import Checkbox from '~/components/checkbox'
import Grid from '~/components/grid'
// import useScrollAnimation from '~/helpers/use-scroll-animation'
import useGlobal from '~/hooks/use-global'
import AddToCart from '~/icons/add-to-cart.svg'
import AddedToCart from '~/icons/added-to-cart.svg'
import Loader from '~/icons/loader.svg'
import Plus from '~/icons/plus.svg'
import Search from '~/icons/search.svg'
import { getProductsData } from '~/services/products'

import ProductsInfo from './products-info'
import styles from './products-table.module.css'

interface Properties {
  category: any
}

function toTitleCase(string_) {
  const words = string_.split(' ')
  const capitalizedWords = words.map((word) => {
    return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
  })
  return capitalizedWords.join(' ')
}

function getCategoryNameById(id) {
  // remove this function when the data return from the API
  switch (id) {
    case 12: {
      return 'Medicamentos'
    }
    case 14: {
      return 'Materiais'
    }
    case 13: {
      return 'Nutrição'
    }
  }
}

const fetchData = async ({
  page,
  perpage = 20,
  parentcategory,
  categories = '',
  suppliers = '',
  term = '',
}) => {
  try {
    const { data } = await getProductsData({
      term,
      parentcategory,
      page,
      categories,
      suppliers,
      perpage,
    })
    return data
  } catch (error) {
    alert(error)
  }
}

const ProductsTable: React.FC<Properties> = ({ category }) => {
  // const { animationRef, topDownShowAnimation } = useScrollAnimation()

  const perPage = 20
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(0)
  const [pagination, setPagination] = useState([])
  const [productsData, setProductsData] = useState<any>([])
  const [categoriesData, setCategoriesData] = useState<any>([])
  const [suppliersData, setSuppliersData] = useState<any>([])
  const [selectedProduct, setSelectedProduct] = useState(-1)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [loading, setLoading] = useState(true)
  const [filterLoading, setFilterLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState(
    new URLSearchParams(
      typeof window === 'undefined' ? '' : window.location.search
    ).get('termo')
  )

  const [selectedProducts, setSelectedProducts] = useState(category)
  const [selectedCategories, setSelectedCategories] = useState([])
  const [seletectedSuppliers, setSelectedSuppliers] = useState([])

  const [filterSuppliersAll, setFilterSuppliersAll] = useState(false)
  const [filterSuppliersValue, setFilterSuppliersValue] = useState('')
  const [filterCategoriesAll, setFilterCategoriesAll] = useState(false)
  const [filterCategoriesValue, setFilterCategoriesValue] = useState('')

  const { cart } = useGlobal()
  const searchReference = useRef(null)

  const filteredCategories = categoriesData.filter((item) =>
    item.name.toLowerCase().includes(filterCategoriesValue.toLowerCase())
  )

  const filteredSuppliers = suppliersData.filter((item) =>
    item.name.toLowerCase().includes(filterSuppliersValue.toLowerCase())
  )

  useEffect(() => {
    setLoading(true)
    setProductsData([])
    const fetchDataAsync = async () => {
      const fetchedData = await fetchData({
        page: 0,
        perpage: perPage,
        parentcategory: selectedProducts.join(','),
        categories: selectedCategories.join(','),
        suppliers: seletectedSuppliers.join(','),
        term: searchTerm,
      })
      setProductsData(fetchedData.products)
      setTotalPages(Math.ceil(fetchedData.items_total / perPage))
      setLoading(false)
    }
    fetchDataAsync()
    adjustPagination()
  }, [selectedCategories, seletectedSuppliers, selectedProducts])

  useEffect(() => {
    setLoading(true)
    setFilterLoading(true)
    const fetchDataAsync = async () => {
      const fetchedData = await fetchData({
        page: 0,
        perpage: perPage,
        parentcategory: selectedProducts.join(','),
        term: searchTerm,
      })
      setProductsData(fetchedData.products)
      setCategoriesData(fetchedData.categories)
      setSuppliersData(fetchedData.suppliers)
      setTotalPages(Math.ceil(fetchedData.items_total / perPage))
      setLoading(false)
      setFilterLoading(false)
    }
    fetchDataAsync()
  }, [category])

  useEffect(() => {
    adjustPagination()
  }, [totalPages])

  function adjustPagination() {
    const range = 4
    let start = Math.max(1, page - range)
    let end = Math.min(totalPages, page + range)

    let pages = []
    if (start > 1) pages.push(1)
    for (let index = start; index <= end; index++) pages.push(index)
    if (end < totalPages) pages.push(totalPages)

    const showEllipsesStart = start > 2
    const showEllipsesEnd = end < totalPages - 1
    if (showEllipsesStart) pages.splice(1, 0, '...')
    if (showEllipsesEnd) pages.splice(-1, 0, '...')
    setPagination(pages)
  }

  function handleSearch(event) {
    setLoading(true)
    setFilterLoading(true)
    setPage(0)
    setProductsData([])
    setCategoriesData([])
    setSuppliersData([])
    setSelectedCategories([])
    setSelectedSuppliers([])
    const fetchDataAsync = async () => {
      const fetchedData = await fetchData({
        page: 0,
        perpage: perPage,
        parentcategory: selectedProducts.join(','),
        term: searchTerm,
      })
      setProductsData(fetchedData.products)
      setCategoriesData(fetchedData.categories)
      setSuppliersData(fetchedData.suppliers)
      setTotalPages(Math.ceil(fetchedData.items_total / perPage))
      setLoading(false)
      setFilterLoading(false)
    }
    fetchDataAsync()
    event.preventDefault()
  }

  useEffect(() => {
    if (searchReference.current && page != 0) {
      searchReference.current.scrollIntoView({
        block: 'start',
      })
    }
    setLoading(true)
    setProductsData([])
    const fetchDataAsync = async () => {
      const fetchedData = await fetchData({
        page: page,
        perpage: perPage,
        parentcategory: selectedProducts.join(','),
        term: searchTerm,
      })
      setProductsData(fetchedData.products)
      setLoading(false)
    }
    fetchDataAsync()
    adjustPagination()
  }, [page])

  useEffect(() => {
    if (selectedProduct >= 0) setIsModalOpen(true)
  }, [selectedProduct])

  return (
    <section className="mb-[60px]">
      {/* <m.div {...topDownShowAnimation()}> */}
      <Grid className="my-10 container">
        <div className="col-span-3">
          {selectedProducts.length > 1 && (
            <div className="w-full rounded-2xl bg-white p-5 mb-5">
              <span className="text-xl inline-block mb-4">Produtos</span>
              <ul>
                {selectedProducts &&
                  selectedProducts.map((item, index) => (
                    <li className="text-base flex mb-2" key={index}>
                      <Checkbox
                        categoryId={item}
                        selectedCategories={selectedProducts}
                        setSelectedCategories={setSelectedProducts}
                      />
                      <span>{getCategoryNameById(item)}</span>
                    </li>
                  ))}
              </ul>
            </div>
          )}
          <div className="w-full rounded-2xl bg-white p-5 mb-5">
            <span className="text-xl inline-block mb-4">Categoria</span>
            {filterLoading && (
              <span className="w-full py-8 justify-center flex">
                <Loader width="24" className="animate-spin" />
              </span>
            )}
            {categoriesData?.length > 10 && (
              <form>
                <input
                  className="border border-lightness border-solid px-4 py-2 w-full mb-4 rounded-2xl"
                  type="text"
                  placeholder="Buscar categorias"
                  onChange={(event) =>
                    setFilterCategoriesValue(event.target.value)
                  }
                />
              </form>
            )}
            <ul>
              {categoriesData?.length > 0 &&
                categoriesData &&
                filteredCategories
                  .slice(
                    0,
                    filterCategoriesAll && filterCategoriesValue === ''
                      ? 1000
                      : 10
                  )
                  .map((item, index) => (
                    <li className="text-base flex mb-2" key={index}>
                      <Checkbox
                        categoryId={item.id}
                        selectedCategories={selectedCategories}
                        setSelectedCategories={setSelectedCategories}
                      />
                      <span>{item.name}</span>
                    </li>
                  ))}
            </ul>
            {categoriesData?.length > 10 && !filterCategoriesAll && (
              <button
                className="w-full rounded-2xl bg-darkness text-white flex items-center justify-center py-2 mt-4"
                onClick={() => setFilterCategoriesAll(true)}
              >
                Ver todas
              </button>
            )}
          </div>
          <div className="w-full rounded-2xl bg-white p-5 mb-5">
            <span className="text-xl inline-block mb-4">Fornecedores</span>
            {filterLoading && (
              <span className="w-full py-8 justify-center flex">
                <Loader width="24" className="animate-spin" />
              </span>
            )}
            {suppliersData?.length > 10 && (
              <form>
                <input
                  className="border border-lightness border-solid px-4 py-2 w-full mb-4 rounded-2xl"
                  type="text"
                  placeholder="Buscar fornecedores"
                  onChange={(event) =>
                    setFilterSuppliersValue(event.target.value)
                  }
                />
              </form>
            )}
            <ul>
              {suppliersData?.length > 0 &&
                filteredSuppliers
                  .slice(
                    0,
                    filterSuppliersAll && filterSuppliersValue === ''
                      ? 1000
                      : 10
                  )
                  .map((item, index) => (
                    <li className="text-base flex mb-2" key={index}>
                      <Checkbox
                        categoryId={item.id}
                        selectedCategories={seletectedSuppliers}
                        setSelectedCategories={setSelectedSuppliers}
                      />
                      {item.name}
                    </li>
                  ))}
            </ul>
            {suppliersData?.length > 10 && !filterSuppliersAll && (
              <button
                className="w-full rounded-2xl bg-darkness text-white flex items-center justify-center py-2 mt-4"
                onClick={() => setFilterSuppliersAll(true)}
              >
                Ver todas
              </button>
            )}
          </div>
        </div>
        <div className="col-span-9">
          <form
            className="mb-5 w-full relative"
            ref={searchReference}
            onSubmit={handleSearch}
          >
            <input
              className="w-full h-[58px] rounded-[100px] pl-16"
              type="text"
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
              placeholder="O que você procura? Digite o nome ou código do produto."
            />
            <Search className="top-1/2 left-8 -translate-y-1/2 absolute" />
          </form>
          <div className="bg-white w-full rounded-2xl overflow-hidden">
            <div className="hover:bg-[#b5e881]"></div>
            <div className="hover:bg-[#c8dcf9]"></div>
            <div className="hover:bg-[#a5a4f0]"></div>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>Código</th>
                  <th>Categoria</th>
                  <th>Marca</th>
                  <th>Descritivo</th>
                  <th>Apresentação</th>
                  <th>Orçar</th>
                </tr>
              </thead>
              <tbody>
                {productsData?.length > 0 &&
                  productsData.map((item, index) => (
                    <tr
                      key={index}
                      className={classNames('', {
                        [`hover:bg-[${item.color}]`]: item.color,
                      })}
                    >
                      <td className="w-[80px]">{item.code}</td>
                      <td className="w-[140px]">{item.category}</td>
                      <td className="w-[100px]">{item.brand}</td>
                      <td>{toTitleCase(item.title)}</td>
                      <td className="w-[160px]">{item.presentation}</td>
                      <td className="w-[180px]">
                        <div className="flex items-center justify-center text-[14px]">
                          <button
                            onClick={() => setSelectedProduct(index)}
                            className="flex flex-col items-center cursor-pointer"
                          >
                            <Plus />
                            Saiba mais
                          </button>
                          <button
                            className="w-16 ml-3 flex flex-col items-center text-sm-2 cursor-pointer"
                            onClick={() => cart.addToCart(item)}
                          >
                            {cart.isInCart(item.id) === 0 && (
                              <>
                                <AddToCart />
                                <span>Orçamento</span>
                              </>
                            )}
                            {cart.isInCart(item.id) > 0 && (
                              <>
                                <AddedToCart />
                                <span>Adicionado</span>
                              </>
                            )}
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
            {productsData?.products?.length === 0 && (
              <span className="w-full py-8 justify-center flex">
                Nenhum produto encontrado
              </span>
            )}
            {loading && (
              <span className="w-full py-8 justify-center flex">
                <Loader width="24" className="animate-spin" />
              </span>
            )}
            <div className="flex w-full justify-end p-4 gap-3">
              {!loading &&
                pagination.map((item, index) => (
                  <button
                    onClick={() => setPage(item)}
                    key={index}
                    className={classNames(
                      'text-darkness flex items-center justify-center cursor-auto',
                      {
                        'bg-darkness': page == item,
                        'text-white': page == item,
                        'w-4 pointer-events-none': typeof item === 'number',
                        'w-8 h-8 rounded-[32px] border-solid border-2 border-darkness pointer-events-auto !cursor-pointer':
                          typeof item === 'number',
                      }
                    )}
                  >
                    {item}
                  </button>
                ))}
            </div>
          </div>
        </div>
      </Grid>
      {/* </m.div> */}
      {productsData?.length > 0 && (
        <ProductsInfo
          isOpen={isModalOpen}
          onClose={() => {
            setSelectedProduct(-1)
            setIsModalOpen(false)
          }}
          {...productsData[selectedProduct]}
        ></ProductsInfo>
      )}
    </section>
  )
}

export default ProductsTable

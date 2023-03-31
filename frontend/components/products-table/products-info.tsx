/* eslint-disable jsx-a11y/anchor-is-valid */
import classNames from 'classnames'
import React from 'react'

import Modal from '~/components/modal'
import useGlobal from '~/hooks/use-global'
import Cart from '~/icons/cart.svg'

interface Properties {
  isOpen: boolean
  onClose: () => void
  title: string
  category: string
  parentCategory: string
  code: string
  brand: string
  presentation: string
  description: string
  id: number
}

const ProductsInfo: React.FC<Properties> = ({
  title,
  category,
  parentCategory,
  code,
  brand,
  presentation,
  id,
  isOpen,
  onClose,
}) => {
  const { cart } = useGlobal()

  const addToCartHandler = () => {
    cart.addToCart({
      id: id,
      title: title,
      category: category,
      brand: brand,
      code: code,
      parentCategory: parentCategory,
      quantity: 1,
    })

    onClose()
    cart.toggleCart(true)
  }

  return (
    <Modal
      className="flex items-end justify-center md:items-center z-[100]"
      isOpen={isOpen}
      onClose={onClose}
    >
      <div
        className={classNames(
          `relative w-full bg-white px-4 md:px-20 py-20 md:rounded-3xl overflow-y-auto md:max-w-[900px]`
        )}
      >
        <h2 className="text-3xl mb-4">{title}</h2>
        <ul className="text-dark">
          <li>{category}</li>
          <li>Código do produto: {code}</li>
          <li>Marca: {brand}</li>
          <li>Apresentação: {presentation}</li>
        </ul>
        {cart.isInCart(id) === 0 && (
          <button
            onClick={() => addToCartHandler()}
            className={classNames(
              'mt-10 tap-transparent z-20 cursor-pointer h-[58px] rounded-full flex items-center justify-center bg-darkness px-8 ml-auto'
            )}
          >
            <span className="text-white">Solicitar orçamento</span>
            <Cart className="ml-4" />
          </button>
        )}
      </div>
    </Modal>
  )
}

export default ProductsInfo

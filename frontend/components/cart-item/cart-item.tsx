import classNames from 'classnames'
import React, { useEffect, useMemo, useState } from 'react'

import useGlobal from '~/hooks/use-global'
import MinusIcon from '~/icons/minus_icon.svg'
import PlusIcon from '~/icons/plus_icon.svg'
import ThrashIcon from '~/icons/thrash_icon.svg'

interface Properties {
  id: any
  code: string
  title: string
  parentCategory: string
  category: string
  brand: string
  quantity: any
}

const CartItem: React.FC<Properties> = ({
  id,
  title,
  code,
  category,
  parentCategory,
  brand,
  quantity,
}) => {
  const [value, setValue] = useState(quantity)
  const { cart } = useGlobal()

  const cartItem = useMemo(() => cart.getCartItem(id), [cart, id])

  useEffect(() => {
    cartItem.quantity = value
  }, [cartItem, value])

  // Function to increase the value by 1
  const increaseValue = () => {
    setValue((previousValue) => previousValue + 1)
  }

  // Function to decrease the value by 1
  const decreaseValue = () => {
    setValue((previousValue) => (previousValue > 0 ? previousValue - 1 : 0))
  }

  const handleDelete = () => {
    cart.removeFromCart(id)
  }

  return (
    <div className="grid grid-cols-12 gap-x-4">
      <div className={classNames('col-span-7 md:col-span-8 pt-6')}>
        <p className="text-base mb-4">
          {code} | {parentCategory} | {category} | {brand}
        </p>
      </div>
      <div className={classNames('col-span-7 md:col-span-8')}>
        <p className="text-xl">{title}</p>
      </div>
      <div
        className={classNames(
          'col-span-5 md:col-span-4 col-start-8 md:col-start-9 text-2xl flex items-center gap-x-2 xl:gap-x-4 pb-6'
        )}
      >
        <MinusIcon className="cursor-pointer" onClick={decreaseValue} />
        <p className={classNames('text-xl px-3')}>{cartItem.quantity}</p>
        <PlusIcon className="cursor-pointer" onClick={increaseValue} />
        <ThrashIcon className="cursor-pointer ml-auto" onClick={handleDelete} />
      </div>
    </div>
  )
}

export default CartItem

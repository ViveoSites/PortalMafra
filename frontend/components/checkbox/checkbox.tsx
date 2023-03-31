/* eslint-disable no-unused-vars */

import classNames from 'classnames'
import React, { useState } from 'react'

import Check from '~/icons/check.svg'

interface Properties {
  categoryId: string
  selectedCategories: string[]
  setSelectedCategories: React.Dispatch<React.SetStateAction<string[]>>
}

const Checkbox: React.FC<Properties> = ({
  categoryId,
  selectedCategories,
  setSelectedCategories,
}) => {
  const isChecked = selectedCategories.includes(categoryId)

  function handleChange() {
    if (isChecked) {
      setSelectedCategories(
        selectedCategories.filter((id) => id !== categoryId)
      )
    } else {
      setSelectedCategories([...selectedCategories, categoryId])
    }
  }

  return (
    <button
      onClick={handleChange}
      className={classNames(
        'w-6 h-6 rounded border-2 border-solid border-darkness mr-2 flex items-center justify-center flex-none',
        {
          'bg-darkness': isChecked,
        }
      )}
    >
      {isChecked && <Check />}
    </button>
  )
}

export default Checkbox

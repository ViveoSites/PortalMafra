import React from 'react'

import IconCard from '../icon-card/icon-card'

interface Properties {
  columns_number: number
  features: any
}

const IconCardsList: React.FC<Properties> = ({ features, columns_number }) => {
  return (
    <div className="icon-cards-list container my-10">
      <ul className="grid grid-cols-12 gap-x-6 md:gap-x-20 mt-12">
        {features &&
          features.map((item, index) => (
            <IconCard
              key={`icon-card-${index}`}
              extraClasses={`${
                columns_number == 4 ? 'col-span-6' : 'col-span-12'
              } md:col-span-${12 / columns_number}`}
              {...item}
            />
          ))}
      </ul>
    </div>
  )
}

export default IconCardsList

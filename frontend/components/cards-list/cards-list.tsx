import React from 'react'

import Card from '~/components/card'

interface Properties {
  colors: object
  cards_list: object
}

const CardsList: React.FC<Properties> = ({ cards_list, colors }) => {
  return (
    <div className="container my-10">
      <ul className="grid grid-cols-12 gap-x-4 mt-12">
        {cards_list &&
          cards_list.map((item, index) => (
            <Card
              key={`card-${index}`}
              extraClasses={`md:col-span-4 bg-${colors.featured_color} text-${colors.text_color}`}
              {...item}
            />
          ))}
      </ul>
    </div>
  )
}

export default CardsList

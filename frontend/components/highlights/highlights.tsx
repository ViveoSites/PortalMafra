import React from 'react'

interface Properties {
  title: string
}

const Highlights: React.FC<Properties> = ({ title }) => {
  return <div>Highlights - {title}</div>
}

export default Highlights

import React from 'react'

interface Properties {
  title: string
  subtitle: string
  button: string
  background: string
}

const Highlights: React.FC<Properties> = ({
  title,
  subtitle,
  button,
  background,
}) => {
  return (
    <div className="highlights h-screen bg-blue-300">
      Highlights - {title} {subtitle} {button} {background}{' '}
    </div>
  )
}

export default Highlights

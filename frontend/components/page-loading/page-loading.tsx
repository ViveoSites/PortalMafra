import React from 'react'

function PageLoading() {
  return (
    <div className="w-full h-screen flex items-center justify-center">
      <div
        className="relative w-16 h-16 animate-spin border-solid
          border-[transparent] border-t-black rounded-full border-[5px] "
      />
    </div>
  )
}

export default PageLoading

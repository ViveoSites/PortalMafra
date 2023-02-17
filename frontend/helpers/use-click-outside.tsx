import { useEffect, useRef } from 'react'

// How to use
// import useOutsideClick from '~/helpers/use-click-outside'
// const reference = useOutsideClick(() => { // do something })
// <div ref={reference}>...</div>

const useOutsideClick = (callback: Function) => {
  const reference = useRef<HTMLElement>()

  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      if (
        reference.current &&
        !reference.current.contains(event.target as Node)
      ) {
        callback()
      }
    }

    document.addEventListener('click', handleClick, true)

    return () => {
      document.removeEventListener('click', handleClick, true)
    }
  }, [reference]) // eslint-disable-line react-hooks/exhaustive-deps

  return reference
}

export default useOutsideClick
